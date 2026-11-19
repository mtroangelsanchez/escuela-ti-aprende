# Dominio 1: Desarrollo con Servicios AWS (32%)

## Descripción General

Este dominio evalúa tu capacidad para desarrollar aplicaciones utilizando los servicios de AWS, incluyendo APIs, SDKs, CLI y servicios de cómputo serverless.

---

## 1.1 AWS SDKs y CLI

### AWS SDK

- **Lenguajes soportados**: Python (Boto3), JavaScript, Java, .NET, Go, Ruby, PHP
- **Credenciales**: Cadena de resolución → Variables de entorno → Archivo credentials → IAM Role
- **Regiones**: Siempre especificar región; default region se configura en `~/.aws/config`
- **Reintentos**: SDK implementa exponential backoff automáticamente
- **Paginación**: Usar paginators para resultados grandes

```python
# Ejemplo Boto3 - Python
import boto3

# El SDK busca credenciales automáticamente
s3 = boto3.client('s3', region_name='us-east-1')

# Paginación
paginator = s3.get_paginator('list_objects_v2')
for page in paginator.paginate(Bucket='my-bucket'):
    for obj in page.get('Contents', []):
        print(obj['Key'])
```

### AWS CLI

- **Configuración**: `aws configure` → access key, secret key, region, output format
- **Perfiles**: `aws configure --profile dev` → múltiples cuentas
- **Dry-run**: `--dry-run` para verificar permisos sin ejecutar
- **Filtros**: `--query` (JMESPath), `--filter`, `--output` (json/table/text)

```bash
# Listar instancias EC2 con filtro
aws ec2 describe-instances \
  --filters "Name=instance-state-name,Values=running" \
  --query "Reservations[].Instances[].{ID:InstanceId,Type:InstanceType}" \
  --output table

# Dry-run para verificar permisos
aws ec2 run-instances --dry-run --image-id ami-12345 --instance-type t3.micro
```

---

## 1.2 AWS Lambda

### Conceptos Fundamentales

| Concepto | Detalle |
|----------|---------|
| Runtime | Python, Node.js, Java, .NET, Go, Ruby, Custom Runtime |
| Memoria | 128 MB - 10,240 MB (10 GB) |
| Timeout | Máximo 15 minutos |
| Paquete | 50 MB (zip), 250 MB (descomprimido), 10 GB (container image) |
| Concurrencia | 1000 por defecto (soft limit) |
| Ephemeral Storage | /tmp hasta 10 GB |

### Modelo de Ejecución

```
┌─────────────────────────────────────────────────────┐
│  COLD START                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │ Download │→ │ Init     │→ │ Handler Execution│  │
│  │ Code     │  │ Runtime  │  │                  │  │
│  └──────────┘  └──────────┘  └──────────────────┘  │
│                                                     │
│  WARM START (reutiliza contexto)                    │
│  ┌──────────────────┐                               │
│  │ Handler Execution│                               │
│  └──────────────────┘                               │
└─────────────────────────────────────────────────────┘
```

### Optimización de Cold Starts

- **Provisioned Concurrency**: Mantiene instancias pre-calentadas
- **Código fuera del handler**: Inicializar SDK clients fuera del handler
- **Paquetes pequeños**: Minimizar dependencias
- **SnapStart** (Java): Snapshot del estado inicializado

```python
import boto3
import json

# FUERA del handler - se ejecuta solo en cold start
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Users')

def lambda_handler(event, context):
    # DENTRO del handler - se ejecuta en cada invocación
    user_id = event['pathParameters']['id']
    
    response = table.get_item(Key={'userId': user_id})
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps(response.get('Item', {}))
    }
```

### Event Sources (Triggers)

| Tipo | Servicio | Modelo |
|------|----------|--------|
| Síncrono | API Gateway, ALB, Cognito | Request-Response |
| Asíncrono | S3, SNS, EventBridge, SES | Event queued |
| Poll-based | SQS, Kinesis, DynamoDB Streams | Lambda polls |

### Variables de Entorno y Configuración

- **Variables de entorno**: Cifradas con KMS en reposo
- **Lambda Layers**: Compartir código/dependencias entre funciones (hasta 5 layers)
- **Versiones**: Inmutables, cada deploy crea nueva versión
- **Aliases**: Punteros a versiones (dev, staging, prod)
- **Weighted Aliases**: Canary deployments (90% v1, 10% v2)

### Destinos y Manejo de Errores

- **On Success/On Failure Destinations**: Enviar resultado a SQS, SNS, Lambda, EventBridge
- **Dead Letter Queue (DLQ)**: SQS o SNS para invocaciones asíncronas fallidas
- **Retry**: 2 reintentos automáticos para invocaciones asíncronas

---

## 1.3 Amazon API Gateway

### Tipos de API

| Tipo | Protocolo | Uso |
|------|-----------|-----|
| REST API | HTTP | Full-featured, caching, WAF |
| HTTP API | HTTP | Más barato, más rápido, menos features |
| WebSocket API | WebSocket | Comunicación bidireccional en tiempo real |

### Stages y Deployment

- **Stages**: dev, staging, prod → cada uno con su URL
- **Stage Variables**: Variables por stage (como env vars)
- **Canary Deployments**: Porcentaje de tráfico al nuevo deployment

### Integración con Lambda

```
Cliente → API Gateway → Lambda → DynamoDB
                ↓
         Authorizer (Lambda/Cognito)
```

### Tipos de Integración

- **Lambda Proxy**: API Gateway pasa todo el request a Lambda (más común)
- **Lambda Custom**: Mapping templates para transformar request/response
- **HTTP Proxy**: Proxy directo a endpoint HTTP
- **AWS Service**: Integración directa con servicios AWS (sin Lambda)
- **Mock**: Respuestas sin backend

### Caching

- **TTL**: 300 segundos por defecto (0-3600)
- **Capacidad**: 0.5 GB - 237 GB
- **Invalidación**: Header `Cache-Control: max-age=0`
- **Per-key**: Cache por parámetros de query/headers

### Throttling

- **Account level**: 10,000 requests/segundo (soft limit)
- **Stage level**: Configurable por stage
- **Method level**: Configurable por método
- **Usage Plans + API Keys**: Throttling por cliente

### Autenticación y Autorización

- **IAM**: Sig V4, para servicios AWS y usuarios IAM
- **Cognito User Pools**: Token JWT, para apps móviles/web
- **Lambda Authorizer**: Custom logic (Token-based o Request-based)

---

## 1.4 Amazon DynamoDB (para Desarrolladores)

### Modelo de Datos

- **Table**: Colección de items
- **Item**: Colección de atributos (máx 400 KB)
- **Primary Key**: Partition Key (PK) o PK + Sort Key (SK)

### Operaciones CRUD

```python
import boto3
from boto3.dynamodb.conditions import Key, Attr

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Orders')

# PutItem - Crear/Reemplazar
table.put_item(Item={
    'orderId': '123',
    'userId': 'user-1',
    'amount': 99.99,
    'status': 'pending'
})

# GetItem - Lectura por PK
response = table.get_item(Key={'orderId': '123'})

# Query - Buscar por PK + condición en SK
response = table.query(
    KeyConditionExpression=Key('userId').eq('user-1') & Key('orderId').begins_with('2024')
)

# UpdateItem - Actualización parcial
table.update_item(
    Key={'orderId': '123'},
    UpdateExpression='SET #s = :status, updatedAt = :now',
    ExpressionAttributeNames={'#s': 'status'},
    ExpressionAttributeValues={':status': 'shipped', ':now': '2024-01-15'}
)

# Scan con filtro (evitar en producción - lee toda la tabla)
response = table.scan(
    FilterExpression=Attr('amount').gt(50)
)
```

### Índices Secundarios

| Tipo | GSI | LSI |
|------|-----|-----|
| Partition Key | Diferente a la tabla | Igual a la tabla |
| Sort Key | Cualquier atributo | Diferente a la tabla |
| Creación | En cualquier momento | Solo al crear tabla |
| Límite | 20 por tabla | 5 por tabla |
| Consistencia | Eventually Consistent | Eventually o Strong |
| RCU/WCU | Propios | Comparte con tabla |

### Consistencia de Lectura

- **Eventually Consistent** (default): Puede no reflejar escritura reciente
- **Strongly Consistent**: Siempre la última versión (2x costo RCU)

### DynamoDB Streams

- Captura cambios en la tabla (INSERT, MODIFY, REMOVE)
- Retención: 24 horas
- Trigger para Lambda → procesamiento en tiempo real
- Uso: Replicación, analytics, notificaciones

### Conditional Writes y Optimistic Locking

```python
# Conditional Write - solo si no existe
table.put_item(
    Item={'orderId': '123', 'status': 'new'},
    ConditionExpression='attribute_not_exists(orderId)'
)

# Optimistic Locking con version number
table.update_item(
    Key={'orderId': '123'},
    UpdateExpression='SET #s = :new_status, version = :new_v',
    ConditionExpression='version = :current_v',
    ExpressionAttributeValues={
        ':new_status': 'shipped',
        ':new_v': 2,
        ':current_v': 1
    }
)
```

### Batch Operations

- **BatchWriteItem**: Hasta 25 items, 16 MB
- **BatchGetItem**: Hasta 100 items, 16 MB
- **TransactWriteItems**: ACID transactions (hasta 100 items)
- **TransactGetItems**: Lecturas transaccionales

---

## 1.5 Amazon S3 (para Desarrolladores)

### Operaciones con SDK

```python
import boto3

s3 = boto3.client('s3')

# Upload con metadata
s3.put_object(
    Bucket='my-bucket',
    Key='data/file.json',
    Body=json.dumps(data),
    ContentType='application/json',
    Metadata={'processed': 'true'}
)

# Presigned URL (acceso temporal)
url = s3.generate_presigned_url(
    'get_object',
    Params={'Bucket': 'my-bucket', 'Key': 'private/doc.pdf'},
    ExpiresIn=3600  # 1 hora
)

# Multipart Upload (archivos > 100 MB)
# SDK lo maneja automáticamente con transfer config
from boto3.s3.transfer import TransferConfig
config = TransferConfig(multipart_threshold=100 * 1024 * 1024)
s3.upload_file('large-file.zip', 'my-bucket', 'uploads/large.zip', Config=config)
```

### Event Notifications

- **Destinos**: Lambda, SQS, SNS, EventBridge
- **Eventos**: s3:ObjectCreated:*, s3:ObjectRemoved:*, s3:ObjectRestore:*
- **Filtros**: Por prefijo y sufijo del key

### S3 Select / Glacier Select

- Query SQL sobre objetos S3 (CSV, JSON, Parquet)
- Reduce transferencia de datos hasta 400%
- Reduce costo hasta 80%

---

## 1.6 Amazon SQS, SNS y Step Functions

### SQS (Simple Queue Service)

| Feature | Standard | FIFO |
|---------|----------|------|
| Throughput | Ilimitado | 3,000 msg/s (batch), 300 msg/s (individual) |
| Orden | Best-effort | Garantizado |
| Duplicados | Posibles | Exactamente una vez |
| Nombre | Cualquiera | Debe terminar en .fifo |

**Conceptos clave:**
- **Visibility Timeout**: Tiempo que mensaje es invisible después de ser leído (default 30s)
- **Long Polling**: `WaitTimeSeconds` > 0 (reduce costos, hasta 20s)
- **Dead Letter Queue**: Mensajes que fallan N veces van a DLQ
- **Delay Queue**: Retraso antes de que mensaje sea visible (0-15 min)

### SNS (Simple Notification Service)

- **Pub/Sub**: Un mensaje → múltiples suscriptores
- **Fan-out pattern**: SNS → múltiples SQS queues
- **Filtros**: Message filtering por atributos
- **Suscriptores**: SQS, Lambda, HTTP, Email, SMS, Kinesis Firehose

### Step Functions

- **Orquestación** de workflows serverless
- **Standard**: Hasta 1 año de ejecución, exactly-once
- **Express**: Hasta 5 minutos, at-least-once, alto volumen
- **Estados**: Task, Choice, Parallel, Wait, Map, Pass, Succeed, Fail

```json
{
  "StartAt": "ProcessOrder",
  "States": {
    "ProcessOrder": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123:function:process",
      "Next": "CheckInventory"
    },
    "CheckInventory": {
      "Type": "Choice",
      "Choices": [
        {
          "Variable": "$.inStock",
          "BooleanEquals": true,
          "Next": "ShipOrder"
        }
      ],
      "Default": "OutOfStock"
    }
  }
}
```

---

## Preguntas de Práctica - Dominio 1

### Pregunta 1
**Una función Lambda necesita acceder a un secreto almacenado en Secrets Manager. ¿Cuál es la forma más segura?**

A) Hardcodear el secreto en el código  
B) Almacenar el secreto en una variable de entorno sin cifrar  
C) Usar el SDK para obtener el secreto en runtime con un IAM Role  
D) Pasar el secreto como parámetro del evento  

**Respuesta: C**  
El IAM Role de la función Lambda debe tener permiso `secretsmanager:GetSecretValue`. El SDK obtiene el secreto en runtime, y el Role proporciona credenciales temporales automáticamente.

### Pregunta 2
**Una API Gateway REST API tiene un Lambda Authorizer que valida tokens JWT. El authorizer se ejecuta en cada request causando latencia. ¿Cómo optimizar?**

A) Cambiar a IAM authorization  
B) Habilitar caching del authorizer con TTL apropiado  
C) Mover la validación dentro de la función Lambda backend  
D) Usar API Keys en lugar del authorizer  

**Respuesta: B**  
El caching del Lambda Authorizer almacena la política resultante por el TTL configurado, evitando ejecutar el authorizer en cada request para el mismo token.

### Pregunta 3
**Una función Lambda procesa mensajes de SQS. Algunos mensajes fallan consistentemente y bloquean el procesamiento. ¿Qué configurar?**

A) Aumentar el timeout de Lambda  
B) Configurar una Dead Letter Queue con maxReceiveCount  
C) Aumentar la memoria de Lambda  
D) Cambiar a SQS FIFO  

**Respuesta: B**  
La DLQ con `maxReceiveCount` mueve mensajes que fallan N veces a una cola separada, desbloqueando el procesamiento de mensajes válidos.

### Pregunta 4
**Necesitas hacer un deployment gradual de una nueva versión de Lambda. ¿Qué usar?**

A) Crear una nueva función Lambda  
B) Usar Lambda Aliases con weighted routing  
C) Usar API Gateway canary deployment  
D) Actualizar el código directamente  

**Respuesta: B**  
Los Aliases con weighted routing permiten enviar un porcentaje del tráfico a la nueva versión (ej: 10% v2, 90% v1) para validar antes del rollout completo.

### Pregunta 5
**Una aplicación necesita leer 100 items de DynamoDB en una sola operación. ¿Qué API usar?**

A) Scan con FilterExpression  
B) BatchGetItem  
C) Query  
D) GetItem en un loop  

**Respuesta: B**  
`BatchGetItem` permite leer hasta 100 items por sus primary keys en una sola llamada API, reduciendo latencia y costos vs múltiples GetItem.
