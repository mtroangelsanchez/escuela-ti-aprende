# Dominio 1: Diseño de Arquitecturas Seguras (30%)

## Índice
1. [Diseño de Acceso Seguro a Recursos AWS](#1-diseño-de-acceso-seguro-a-recursos-aws)
2. [Diseño de Cargas de Trabajo y Aplicaciones Seguras](#2-diseño-de-cargas-de-trabajo-y-aplicaciones-seguras)
3. [Controles de Seguridad Apropiados](#3-controles-de-seguridad-apropiados)
4. [Preguntas de Práctica](#preguntas-de-práctica)

---

## 1. Diseño de Acceso Seguro a Recursos AWS

### AWS Identity and Access Management (IAM)

IAM es el servicio fundamental para controlar el acceso a los recursos de AWS.

#### Conceptos Clave

- **Usuarios**: Representan personas o aplicaciones que interactúan con AWS
- **Grupos**: Colecciones de usuarios con permisos comunes
- **Roles**: Identidades con permisos que pueden ser asumidas temporalmente
- **Políticas**: Documentos JSON que definen permisos

#### Ejemplo de Política IAM

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::mi-bucket-produccion/*",
      "Condition": {
        "IpAddress": {
          "aws:SourceIp": "192.168.1.0/24"
        }
      }
    }
  ]
}
```

#### Principio de Menor Privilegio

Siempre otorga solo los permisos mínimos necesarios para realizar una tarea.

```
┌─────────────────────────────────────────────┐
│           PRINCIPIO DE MENOR PRIVILEGIO      │
├─────────────────────────────────────────────┤
│                                             │
│  ❌ Incorrecto:                             │
│     Action: "*"                             │
│     Resource: "*"                           │
│                                             │
│  ✅ Correcto:                               │
│     Action: "s3:GetObject"                  │
│     Resource: "arn:aws:s3:::bucket/prefix/*"│
│                                             │
└─────────────────────────────────────────────┘
```

### AWS Organizations

Permite gestionar múltiples cuentas AWS de forma centralizada.

#### Service Control Policies (SCPs)

Las SCPs establecen límites de permisos para las cuentas de la organización.

```
┌─────────────────────────────────────────┐
│          AWS Organizations              │
├─────────────────────────────────────────┤
│                                         │
│  Root (Cuenta de Gestión)               │
│  ├── OU: Producción                     │
│  │   ├── Cuenta: App-Prod              │
│  │   └── Cuenta: DB-Prod              │
│  ├── OU: Desarrollo                    │
│  │   ├── Cuenta: App-Dev              │
│  │   └── Cuenta: DB-Dev              │
│  └── OU: Seguridad                     │
│      ├── Cuenta: Logging              │
│      └── Cuenta: Auditoría            │
│                                         │
└─────────────────────────────────────────┘
```

### AWS Single Sign-On (IAM Identity Center)

- Acceso centralizado a múltiples cuentas AWS
- Integración con proveedores de identidad externos (SAML 2.0)
- Asignación de permisos basada en grupos

### Federación de Identidades

| Método | Caso de Uso |
|--------|-------------|
| SAML 2.0 | Integración con Active Directory corporativo |
| Web Identity | Usuarios de apps móviles (Cognito) |
| Custom Identity Broker | Sistemas legacy de autenticación |
| IAM Identity Center | Acceso centralizado multi-cuenta |

---

## 2. Diseño de Cargas de Trabajo y Aplicaciones Seguras

### Amazon VPC (Virtual Private Cloud)

#### Arquitectura de Red Segura

```
┌─────────────────────────────────────────────────────────┐
│                        VPC (10.0.0.0/16)                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────┐    ┌─────────────────┐           │
│  │ Subnet Pública  │    │ Subnet Pública  │           │
│  │ 10.0.1.0/24     │    │ 10.0.2.0/24     │           │
│  │ (AZ-a)          │    │ (AZ-b)          │           │
│  │ [ALB, NAT GW]   │    │ [ALB, NAT GW]   │           │
│  └────────┬────────┘    └────────┬────────┘           │
│           │                       │                     │
│  ┌────────┴────────┐    ┌────────┴────────┐           │
│  │ Subnet Privada  │    │ Subnet Privada  │           │
│  │ 10.0.3.0/24     │    │ 10.0.4.0/24     │           │
│  │ (AZ-a)          │    │ (AZ-b)          │           │
│  │ [EC2, ECS]      │    │ [EC2, ECS]      │           │
│  └────────┬────────┘    └────────┬────────┘           │
│           │                       │                     │
│  ┌────────┴────────┐    ┌────────┴────────┐           │
│  │ Subnet DB       │    │ Subnet DB       │           │
│  │ 10.0.5.0/24     │    │ 10.0.6.0/24     │           │
│  │ (AZ-a)          │    │ (AZ-b)          │           │
│  │ [RDS, ElastiC.] │    │ [RDS, ElastiC.] │           │
│  └─────────────────┘    └─────────────────┘           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Security Groups vs NACLs

| Característica | Security Groups | NACLs |
|---------------|----------------|-------|
| Nivel | Instancia (ENI) | Subnet |
| Estado | Stateful | Stateless |
| Reglas | Solo Allow | Allow y Deny |
| Evaluación | Todas las reglas | Orden numérico |
| Default | Deny todo inbound | Allow todo |

### AWS WAF (Web Application Firewall)

Protege aplicaciones web contra ataques comunes:

- **SQL Injection**: Bloquea consultas SQL maliciosas
- **Cross-Site Scripting (XSS)**: Previene inyección de scripts
- **Rate Limiting**: Limita solicitudes por IP
- **Geo-blocking**: Bloquea tráfico por país
- **IP Reputation**: Bloquea IPs maliciosas conocidas

### AWS Shield

- **Shield Standard**: Protección DDoS gratuita (capa 3 y 4)
- **Shield Advanced**: Protección DDoS avanzada ($3,000/mes), incluye:
  - Protección contra ataques sofisticados
  - Equipo de respuesta DDoS (DRT)
  - Protección de costos por escalamiento

### Amazon Cognito

```
┌──────────────────────────────────────────────┐
│              Amazon Cognito                    │
├──────────────────────────────────────────────┤
│                                              │
│  User Pools (Autenticación)                  │
│  ├── Registro/Login de usuarios              │
│  ├── MFA (Multi-Factor Authentication)       │
│  ├── Verificación de email/teléfono          │
│  └── Integración con IdP sociales           │
│                                              │
│  Identity Pools (Autorización)               │
│  ├── Credenciales temporales AWS             │
│  ├── Acceso a servicios AWS                  │
│  └── Roles IAM para usuarios autenticados   │
│                                              │
└──────────────────────────────────────────────┘
```

---

## 3. Controles de Seguridad Apropiados

### Cifrado de Datos

#### En Reposo (At Rest)

| Servicio | Método de Cifrado |
|----------|-------------------|
| S3 | SSE-S3, SSE-KMS, SSE-C |
| EBS | AES-256 con KMS |
| RDS | TDE o cifrado de volumen |
| DynamoDB | Cifrado por defecto con KMS |
| EFS | Cifrado con KMS |

#### En Tránsito (In Transit)

- **TLS 1.2+** para todas las comunicaciones
- **VPN Site-to-Site** para conexiones on-premises
- **AWS PrivateLink** para acceso privado a servicios
- **Certificate Manager (ACM)** para gestión de certificados SSL/TLS

### AWS Key Management Service (KMS)

```
┌─────────────────────────────────────────────┐
│              AWS KMS                          │
├─────────────────────────────────────────────┤
│                                             │
│  Tipos de Claves:                           │
│  ├── AWS Managed Keys (aws/service)         │
│  │   └── Rotación automática cada año       │
│  ├── Customer Managed Keys (CMK)            │
│  │   └── Control total, rotación configurable│
│  └── Custom Key Stores (CloudHSM)          │
│      └── HSM dedicado, FIPS 140-2 Level 3  │
│                                             │
│  Envelope Encryption:                       │
│  ├── Data Key cifra los datos              │
│  └── CMK cifra el Data Key                 │
│                                             │
└─────────────────────────────────────────────┘
```

### AWS Secrets Manager vs Systems Manager Parameter Store

| Característica | Secrets Manager | Parameter Store |
|---------------|----------------|-----------------|
| Rotación automática | ✅ Sí | ❌ No nativo |
| Costo | $0.40/secreto/mes | Gratis (estándar) |
| Tamaño máximo | 64 KB | 8 KB (estándar) / 8 KB (avanzado) |
| Cross-account | ✅ Sí | ❌ Limitado |
| Caso de uso | Credenciales DB, API keys | Configuración, feature flags |

### Servicios de Auditoría y Monitoreo

#### AWS CloudTrail

- Registra todas las llamadas API en la cuenta
- Almacena logs en S3
- Integración con CloudWatch para alertas
- **Management Events**: Operaciones de control (crear/eliminar recursos)
- **Data Events**: Operaciones en datos (GetObject en S3, Invoke en Lambda)

#### Amazon GuardDuty

Detección inteligente de amenazas:
- Análisis de VPC Flow Logs
- Análisis de DNS Logs
- Análisis de CloudTrail Events
- Machine Learning para detectar anomalías

#### AWS Config

- Evalúa configuraciones de recursos contra reglas
- Historial de cambios de configuración
- Remediación automática con SSM Automation

#### Amazon Inspector

- Escaneo de vulnerabilidades en EC2 y ECR
- Evaluación de seguridad de red
- Reportes de cumplimiento

### AWS Certificate Manager (ACM)

- Provisión gratuita de certificados SSL/TLS
- Renovación automática
- Integración con ALB, CloudFront, API Gateway

---

## Preguntas de Práctica

### Pregunta 1
**Una empresa necesita que sus desarrolladores accedan a recursos AWS desde sus estaciones de trabajo corporativas que usan Active Directory. ¿Cuál es la solución más apropiada?**

A) Crear usuarios IAM individuales para cada desarrollador  
B) Usar IAM Identity Center con integración SAML 2.0 a Active Directory  
C) Compartir credenciales de una cuenta de servicio  
D) Usar access keys de largo plazo en las estaciones de trabajo  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

IAM Identity Center (antes AWS SSO) permite la federación con Active Directory corporativo mediante SAML 2.0. Esto proporciona:
- Single Sign-On para los desarrolladores
- No se necesitan credenciales de largo plazo
- Gestión centralizada de permisos
- Auditoría completa de accesos

Las opciones A y D crean credenciales de largo plazo que son un riesgo de seguridad. La opción C viola el principio de menor privilegio y no permite auditoría individual.
</details>

### Pregunta 2
**Una aplicación web almacena datos sensibles de clientes en Amazon S3. La empresa requiere que los datos estén cifrados con claves que ellos controlen y que se roten automáticamente cada 90 días. ¿Qué solución cumple estos requisitos?**

A) SSE-S3 con rotación automática  
B) SSE-KMS con una Customer Managed Key y rotación automática configurada  
C) SSE-C con rotación manual de claves  
D) Cifrado del lado del cliente sin KMS  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

SSE-KMS con Customer Managed Keys (CMK) permite:
- Control total sobre las claves de cifrado
- Configuración de rotación automática
- Auditoría de uso de claves via CloudTrail
- Políticas de acceso granulares

SSE-S3 (A) usa claves gestionadas por AWS sin control del cliente. SSE-C (C) requiere que el cliente gestione las claves manualmente. El cifrado del lado del cliente (D) no aprovecha la gestión de claves de AWS.
</details>

### Pregunta 3
**Una empresa tiene una aplicación multi-tier en AWS. El equipo de seguridad requiere que las instancias EC2 en la subnet privada puedan acceder a DynamoDB sin que el tráfico pase por internet. ¿Cuál es la mejor solución?**

A) Configurar un NAT Gateway en la subnet pública  
B) Crear un VPC Gateway Endpoint para DynamoDB  
C) Usar un Internet Gateway con rutas específicas  
D) Configurar AWS Direct Connect  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

Un VPC Gateway Endpoint para DynamoDB permite:
- Acceso privado a DynamoDB sin pasar por internet
- Sin costo adicional
- Tráfico permanece dentro de la red de AWS
- Se configura mediante route tables

El NAT Gateway (A) envía tráfico por internet. El Internet Gateway (C) requiere IP pública. Direct Connect (D) es para conexiones on-premises y es excesivo para este caso.
</details>

### Pregunta 4
**Una organización necesita detectar automáticamente cuando un bucket S3 se hace público accidentalmente y remediarlo. ¿Qué combinación de servicios logra esto?**

A) CloudWatch + Lambda  
B) AWS Config con regla s3-bucket-public-read-prohibited + remediación automática SSM  
C) GuardDuty + SNS  
D) Trusted Advisor + CloudWatch Events  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

AWS Config con la regla administrada `s3-bucket-public-read-prohibited`:
- Evalúa continuamente la configuración de buckets S3
- Detecta cuando un bucket se hace público
- La remediación automática con SSM puede revertir el cambio
- Proporciona historial de cumplimiento

GuardDuty (C) detecta amenazas pero no evalúa configuraciones. CloudWatch (A) requiere configuración manual. Trusted Advisor (D) no tiene remediación automática.
</details>

### Pregunta 5
**Una aplicación necesita almacenar credenciales de base de datos que se roten automáticamente cada 30 días. Las credenciales deben ser accesibles desde múltiples cuentas AWS. ¿Qué servicio es más apropiado?**

A) AWS Systems Manager Parameter Store  
B) AWS Secrets Manager  
C) AWS KMS  
D) Amazon S3 con cifrado  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

AWS Secrets Manager es la solución ideal porque:
- Soporta rotación automática de credenciales (integración nativa con RDS, Redshift, DocumentDB)
- Permite acceso cross-account mediante resource policies
- Cifra secretos con KMS
- Proporciona versionado de secretos

Parameter Store (A) no tiene rotación automática nativa. KMS (C) gestiona claves, no secretos. S3 (D) no está diseñado para gestión de credenciales.
</details>

---

## Resumen de Servicios Clave - Dominio 1

| Categoría | Servicios |
|-----------|-----------|
| Identidad y Acceso | IAM, IAM Identity Center, Cognito, STS |
| Red | VPC, Security Groups, NACLs, PrivateLink, VPN |
| Cifrado | KMS, CloudHSM, ACM, Secrets Manager |
| Protección | WAF, Shield, GuardDuty, Inspector |
| Auditoría | CloudTrail, Config, Security Hub |
| Cumplimiento | Artifact, Audit Manager |
