# Dominio 2: Seguridad (26%)

## Descripción General

Este dominio evalúa tu capacidad para implementar autenticación, autorización, cifrado y manejo seguro de credenciales en aplicaciones AWS.

---

## 2.1 Autenticación y Autorización

### IAM para Desarrolladores

#### Cadena de Resolución de Credenciales (SDK)

```
1. Parámetros explícitos en código (NO recomendado)
2. Variables de entorno (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
3. Archivo ~/.aws/credentials (perfiles)
4. Container credentials (ECS Task Role)
5. Instance Profile (EC2 IAM Role)
6. SSO credentials
```

#### Políticas IAM - Estructura

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowS3Read",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::my-bucket",
        "arn:aws:s3:::my-bucket/*"
      ],
      "Condition": {
        "StringEquals": {
          "s3:prefix": ["home/${aws:username}/"]
        }
      }
    }
  ]
}
```

#### STS (Security Token Service)

- **AssumeRole**: Obtener credenciales temporales de otro rol
- **AssumeRoleWithWebIdentity**: Para identity providers (Google, Facebook)
- **AssumeRoleWithSAML**: Para SAML 2.0 federation
- **GetSessionToken**: MFA-protected API access
- **Duración**: 15 min - 12 horas (default 1 hora)

```python
import boto3

# Assume Role cross-account
sts = boto3.client('sts')
response = sts.assume_role(
    RoleArn='arn:aws:iam::TARGET_ACCOUNT:role/CrossAccountRole',
    RoleSessionName='my-session',
    DurationSeconds=3600
)

credentials = response['Credentials']
# Usar credenciales temporales
s3 = boto3.client('s3',
    aws_access_key_id=credentials['AccessKeyId'],
    aws_secret_access_key=credentials['SecretAccessKey'],
    aws_session_token=credentials['SessionToken']
)
```

### Amazon Cognito

#### User Pools (Autenticación)

- **Función**: Directorio de usuarios, sign-up/sign-in
- **Features**: MFA, email/phone verification, password policies
- **Tokens**: ID Token (identidad), Access Token (autorización), Refresh Token
- **Triggers Lambda**: Pre/Post authentication, Custom message, Pre Token Generation
- **Federation**: Google, Facebook, SAML, OIDC

#### Identity Pools (Autorización)

- **Función**: Proporcionar credenciales AWS temporales
- **Flujo**: User Pool Token → Identity Pool → STS → Credenciales AWS
- **Roles**: Authenticated role, Unauthenticated (guest) role
- **Fine-grained access**: Políticas con `${cognito-identity.amazonaws.com:sub}`

```
┌──────────────────────────────────────────────────────────┐
│                    FLUJO COGNITO                           │
│                                                          │
│  App → User Pool (login) → Tokens JWT                    │
│                                ↓                         │
│  App → Identity Pool (exchange token) → AWS Credentials  │
│                                ↓                         │
│  App → AWS Services (S3, DynamoDB, etc.)                 │
└──────────────────────────────────────────────────────────┘
```

### API Gateway Authorization

| Método | Caso de Uso | Token |
|--------|-------------|-------|
| IAM | Service-to-service, CLI | Sig V4 |
| Cognito | Apps móviles/web | JWT |
| Lambda Authorizer | Custom logic, third-party tokens | Custom |
| API Keys | Rate limiting (NO seguridad) | API Key header |

---

## 2.2 Cifrado

### Cifrado en Reposo

#### AWS KMS (Key Management Service)

- **CMK (Customer Master Key)**: Clave maestra que genera data keys
- **Tipos**: AWS Managed, Customer Managed, AWS Owned
- **Envelope Encryption**: CMK cifra Data Key → Data Key cifra datos
- **Rotación**: Automática anual para Customer Managed Keys

```python
import boto3

kms = boto3.client('kms')

# Generar Data Key para envelope encryption
response = kms.generate_data_key(
    KeyId='alias/my-key',
    KeySpec='AES_256'
)
plaintext_key = response['Plaintext']      # Usar para cifrar datos
encrypted_key = response['CiphertextBlob']  # Almacenar junto a datos cifrados

# Cifrar directamente (< 4 KB)
response = kms.encrypt(
    KeyId='alias/my-key',
    Plaintext=b'my secret data'
)
```

#### Cifrado por Servicio

| Servicio | Cifrado en Reposo | Cifrado en Tránsito |
|----------|-------------------|---------------------|
| S3 | SSE-S3, SSE-KMS, SSE-C | HTTPS (TLS) |
| DynamoDB | AWS Owned o Customer Managed KMS | TLS |
| EBS | KMS | N/A (dentro de AZ) |
| RDS | KMS | SSL/TLS |
| Lambda (env vars) | KMS | HTTPS |
| SQS | SSE-KMS o SSE-SQS | HTTPS |

#### S3 Encryption Options

```
SSE-S3:  S3 gestiona las claves (AES-256)
         Header: "x-amz-server-side-encryption": "AES256"

SSE-KMS: KMS gestiona las claves (auditoría en CloudTrail)
         Header: "x-amz-server-side-encryption": "aws:kms"
         
SSE-C:   Cliente proporciona la clave (S3 no almacena la clave)
         Header: "x-amz-server-side-encryption-customer-algorithm"
         REQUIERE HTTPS

Client-Side: Cifrado antes de enviar a S3
```

### Cifrado en Tránsito

- **TLS/SSL**: Todos los endpoints AWS soportan HTTPS
- **Certificate Manager (ACM)**: Certificados SSL gratuitos para ALB, CloudFront, API Gateway
- **Enforce HTTPS**: Bucket policy con `aws:SecureTransport: false` → Deny

---

## 2.3 Gestión de Secretos

### AWS Secrets Manager

- **Rotación automática**: Lambda function para rotar secretos
- **Cross-account**: Resource-based policy para compartir
- **Versionado**: AWSCURRENT, AWSPREVIOUS
- **Integración**: RDS, Redshift, DocumentDB (rotación nativa)
- **Costo**: $0.40/secreto/mes + $0.05/10,000 llamadas API

```python
import boto3
import json

def get_secret():
    client = boto3.client('secretsmanager')
    response = client.get_secret_value(SecretId='prod/db/credentials')
    secret = json.loads(response['SecretString'])
    return secret['username'], secret['password']
```

### AWS Systems Manager Parameter Store

| Feature | Standard | Advanced |
|---------|----------|----------|
| Parámetros | 10,000 | 100,000 |
| Tamaño máximo | 4 KB | 8 KB |
| Políticas | No | Sí (expiración, notificación) |
| Costo | Gratis | $0.05/parámetro/mes |
| Throughput | 40 TPS | 1,000 TPS |

```python
import boto3

ssm = boto3.client('ssm')

# Obtener parámetro (con descifrado si es SecureString)
response = ssm.get_parameter(
    Name='/prod/db/connection-string',
    WithDecryption=True
)
value = response['Parameter']['Value']

# Obtener múltiples por path
response = ssm.get_parameters_by_path(
    Path='/prod/app/',
    WithDecryption=True,
    Recursive=True
)
```

### Comparación: Secrets Manager vs Parameter Store

| Aspecto | Secrets Manager | Parameter Store |
|---------|----------------|-----------------|
| Rotación automática | ✅ Nativa | ❌ Manual |
| Costo | $0.40/secreto/mes | Gratis (Standard) |
| Cross-account | ✅ | ❌ |
| Tamaño | 64 KB | 4-8 KB |
| Mejor para | DB credentials, API keys | Config, feature flags |

---

## 2.4 Seguridad en Lambda

### Permisos Lambda

```
┌─────────────────────────────────────────────────────┐
│  EXECUTION ROLE (lo que Lambda PUEDE hacer)          │
│  → Permisos para acceder a otros servicios AWS       │
│  → Ejemplo: leer de S3, escribir en DynamoDB         │
│                                                     │
│  RESOURCE-BASED POLICY (quién puede INVOCAR Lambda) │
│  → Permisos para que otros servicios invoquen Lambda│
│  → Ejemplo: S3 puede invocar esta función            │
└─────────────────────────────────────────────────────┘
```

### Variables de Entorno Seguras

- Cifradas automáticamente en reposo con KMS
- **Encryption helpers**: Cifrar en tránsito con CMK personalizada
- **Nunca** hardcodear secretos en el código

### VPC Access

- Lambda en VPC necesita: Subnet IDs + Security Group
- Para acceso a internet: NAT Gateway en subnet pública
- Para servicios AWS: VPC Endpoints (recomendado)
- **ENI**: Lambda crea ENIs en las subnets especificadas

---

## 2.5 Seguridad en API Gateway

### Throttling y Protección

- **Rate limiting**: Requests por segundo por API Key
- **Burst**: Capacidad de ráfaga
- **WAF**: Protección contra ataques comunes
- **Resource Policies**: Restringir acceso por IP, VPC, cuenta

### CORS (Cross-Origin Resource Sharing)

```
# Headers necesarios en la respuesta:
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization

# En Lambda Proxy Integration, Lambda debe retornar estos headers
# En non-proxy, API Gateway los configura
```

### Mutual TLS (mTLS)

- Cliente y servidor se autentican mutuamente
- Requiere truststore en S3 con certificados CA
- Disponible en REST API y HTTP API

---

## Preguntas de Práctica - Dominio 2

### Pregunta 1
**Una aplicación Lambda necesita acceder a una base de datos RDS en una VPC privada. ¿Qué se necesita?**

A) Asignar una IP pública a Lambda  
B) Configurar Lambda con VPC, subnets privadas y security group  
C) Usar un Internet Gateway  
D) Crear un peering entre Lambda VPC y RDS VPC  

**Respuesta: B**  
Lambda se configura con subnets privadas de la VPC donde está RDS. El security group de Lambda debe permitir tráfico al security group de RDS.

### Pregunta 2
**Una aplicación necesita rotar automáticamente las credenciales de una base de datos RDS cada 30 días. ¿Qué servicio usar?**

A) Parameter Store con política de expiración  
B) AWS Secrets Manager con rotación automática  
C) KMS con rotación de claves  
D) IAM con políticas de contraseña  

**Respuesta: B**  
Secrets Manager tiene integración nativa con RDS para rotación automática. Usa una Lambda function para actualizar las credenciales en RDS y en el secreto.

### Pregunta 3
**Un desarrollador necesita cifrar datos de más de 4 KB antes de almacenarlos en DynamoDB. ¿Qué patrón usar?**

A) Llamar a KMS Encrypt directamente  
B) Usar Envelope Encryption con GenerateDataKey  
C) Usar SSE-KMS de DynamoDB  
D) Cifrar con una clave hardcodeada  

**Respuesta: B**  
KMS Encrypt solo soporta hasta 4 KB. Envelope Encryption genera una Data Key con KMS, cifra los datos localmente con esa key, y almacena la key cifrada junto a los datos.

### Pregunta 4
**Una aplicación móvil necesita que usuarios autenticados con Google accedan a su propio folder en S3. ¿Qué arquitectura usar?**

A) IAM Users por cada usuario móvil  
B) Cognito User Pool + Identity Pool con política basada en identity  
C) API Gateway con API Keys  
D) S3 bucket policy con IPs  

**Respuesta: B**  
Cognito User Pool federa con Google. Identity Pool proporciona credenciales AWS con una política que usa `${cognito-identity.amazonaws.com:sub}` como prefijo en S3.

### Pregunta 5
**¿Cuál es la diferencia principal entre un Cognito User Pool y un Identity Pool?**

A) User Pool proporciona credenciales AWS, Identity Pool maneja login  
B) User Pool maneja autenticación (quién eres), Identity Pool maneja autorización (qué puedes hacer en AWS)  
C) Son lo mismo con diferente nombre  
D) User Pool es para web, Identity Pool es para móvil  

**Respuesta: B**  
User Pool = autenticación (sign-up, sign-in, tokens JWT). Identity Pool = autorización (intercambia tokens por credenciales AWS temporales con roles IAM).
