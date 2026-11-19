# Dominio 3: Deployment (24%)

## Descripción General

Este dominio evalúa tu capacidad para desplegar aplicaciones usando CI/CD, infraestructura como código, y estrategias de deployment en AWS.

---

## 3.1 AWS Elastic Beanstalk

### Conceptos

- **Platform as a Service (PaaS)**: Deploy automático de aplicaciones
- **Componentes**: Application → Environment → Version
- **Plataformas**: Docker, Java, .NET, Node.js, Python, Ruby, Go, PHP

### Deployment Policies

| Política | Downtime | Velocidad | Rollback | Costo |
|----------|----------|-----------|----------|-------|
| All at once | ✅ Sí | Más rápida | Manual redeploy | Sin costo extra |
| Rolling | ❌ No | Media | Manual redeploy | Sin costo extra |
| Rolling with batch | ❌ No | Media | Manual redeploy | Costo extra temporal |
| Immutable | ❌ No | Lenta | Terminar nuevas | Costo extra temporal |
| Blue/Green | ❌ No | Rápida | Swap URL | Doble costo temporal |
| Traffic Splitting | ❌ No | Rápida | Reroute tráfico | Costo extra temporal |

### Configuración

```
.ebextensions/
├── 01-packages.config      # Instalar paquetes
├── 02-environment.config   # Variables de entorno
└── 03-resources.config     # Recursos AWS adicionales
```

```yaml
# .ebextensions/01-packages.config
packages:
  yum:
    git: []
    
option_settings:
  aws:elasticbeanstalk:application:environment:
    DB_HOST: "mydb.cluster-xxx.us-east-1.rds.amazonaws.com"
    
container_commands:
  01_migrate:
    command: "python manage.py migrate"
    leader_only: true
```

### Lifecycle Policy

- Máximo 1000 versiones por aplicación
- Configurar eliminación por tiempo o cantidad
- Opción de no eliminar el source bundle de S3

---

## 3.2 AWS CodeCommit, CodeBuild, CodeDeploy, CodePipeline

### CodeCommit (Repositorio Git)

- Git repositorio privado en AWS
- Cifrado en reposo (KMS) y en tránsito (HTTPS/SSH)
- Integración con IAM para acceso
- Triggers: SNS, Lambda en push events
- **Nota**: AWS anunció el cierre de CodeCommit para nuevos clientes

### CodeBuild (Build)

- **Servicio managed** de compilación y testing
- **buildspec.yml**: Define las fases del build
- **Fases**: install → pre_build → build → post_build
- **Entorno**: Docker containers (managed o custom)
- **Caché**: S3 para dependencias (acelera builds)

```yaml
# buildspec.yml
version: 0.2

env:
  variables:
    NODE_ENV: "production"
  parameter-store:
    DB_PASSWORD: "/prod/db/password"
  secrets-manager:
    API_KEY: "prod/api:key"

phases:
  install:
    runtime-versions:
      nodejs: 18
    commands:
      - npm ci
  pre_build:
    commands:
      - echo "Running tests..."
      - npm test
  build:
    commands:
      - echo "Building..."
      - npm run build
  post_build:
    commands:
      - echo "Build completed on $(date)"

artifacts:
  files:
    - '**/*'
  base-directory: dist

cache:
  paths:
    - node_modules/**/*
```

### CodeDeploy (Deployment)

#### Plataformas

| Plataforma | Estrategias | Archivo Config |
|-----------|-------------|----------------|
| EC2/On-Premises | In-place, Blue/Green | appspec.yml |
| Lambda | Canary, Linear, All-at-once | appspec.yml |
| ECS | Canary, Linear, All-at-once | appspec.yml |

#### AppSpec para Lambda

```yaml
version: 0.0
Resources:
  - MyFunction:
      Type: AWS::Lambda::Function
      Properties:
        Name: "my-function"
        Alias: "prod"
        CurrentVersion: "1"
        TargetVersion: "2"
Hooks:
  - BeforeAllowTraffic: "CodeDeployHook_preTrafficHook"
  - AfterAllowTraffic: "CodeDeployHook_postTrafficHook"
```

#### AppSpec para EC2

```yaml
version: 0.0
os: linux
files:
  - source: /
    destination: /var/www/html
hooks:
  BeforeInstall:
    - location: scripts/install_dependencies.sh
      timeout: 300
  AfterInstall:
    - location: scripts/configure_server.sh
  ApplicationStart:
    - location: scripts/start_server.sh
  ValidateService:
    - location: scripts/validate.sh
      timeout: 60
```

#### Deployment Strategies para Lambda/ECS

| Estrategia | Descripción | Ejemplo |
|-----------|-------------|---------|
| Canary10Percent5Minutes | 10% por 5 min, luego 100% | Validación rápida |
| Canary10Percent30Minutes | 10% por 30 min, luego 100% | Validación extendida |
| Linear10PercentEvery1Minute | +10% cada minuto | Gradual rápido |
| Linear10PercentEvery10Minutes | +10% cada 10 min | Gradual lento |
| AllAtOnce | 100% inmediato | Sin validación gradual |

### CodePipeline (Orquestación CI/CD)

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Source   │ →  │  Build   │ →  │  Test    │ →  │  Deploy  │
│           │    │          │    │          │    │          │
│ CodeCommit│    │CodeBuild │    │CodeBuild │    │CodeDeploy│
│ GitHub    │    │          │    │          │    │ ECS      │
│ S3       │    │          │    │          │    │ Beanstalk│
└──────────┘    └──────────┘    └──────────┘    └──────────┘
```

- **Stages**: Source → Build → Test → Deploy (customizable)
- **Actions**: Cada stage tiene una o más actions
- **Artifacts**: Outputs de un stage son inputs del siguiente (S3)
- **Manual Approval**: Stage de aprobación manual
- **Cross-region**: Deploy a múltiples regiones
- **Triggers**: Push, Schedule, Manual

---

## 3.3 AWS SAM (Serverless Application Model)

### Estructura

```yaml
# template.yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: My Serverless App

Globals:
  Function:
    Timeout: 30
    Runtime: python3.11
    MemorySize: 256
    Environment:
      Variables:
        TABLE_NAME: !Ref UsersTable

Resources:
  GetUserFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: app.get_user
      CodeUri: src/
      Policies:
        - DynamoDBReadPolicy:
            TableName: !Ref UsersTable
      Events:
        GetUser:
          Type: Api
          Properties:
            Path: /users/{id}
            Method: get

  CreateUserFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: app.create_user
      CodeUri: src/
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref UsersTable
      Events:
        CreateUser:
          Type: Api
          Properties:
            Path: /users
            Method: post

  UsersTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: users
      AttributeDefinitions:
        - AttributeName: userId
          AttributeType: S
      KeySchema:
        - AttributeName: userId
          KeyType: HASH
      BillingMode: PAY_PER_REQUEST

Outputs:
  ApiUrl:
    Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/"
```

### Comandos SAM CLI

```bash
# Inicializar proyecto
sam init --runtime python3.11 --name my-app

# Build (instala dependencias, prepara artifacts)
sam build

# Test local
sam local invoke GetUserFunction --event events/get-user.json
sam local start-api  # API Gateway local en puerto 3000

# Deploy
sam deploy --guided  # Primera vez (interactivo)
sam deploy           # Subsecuentes (usa samconfig.toml)

# Logs
sam logs -n GetUserFunction --tail
```

### SAM Policy Templates

```yaml
# Políticas predefinidas simplificadas
Policies:
  - DynamoDBReadPolicy:
      TableName: !Ref MyTable
  - S3ReadPolicy:
      BucketName: !Ref MyBucket
  - SQSPollerPolicy:
      QueueName: !GetAtt MyQueue.QueueName
  - LambdaInvokePolicy:
      FunctionName: !Ref OtherFunction
```

---

## 3.4 AWS CloudFormation

### Conceptos Clave para Desarrolladores

- **Template**: JSON/YAML que define recursos
- **Stack**: Instancia de un template (recursos creados)
- **Change Set**: Preview de cambios antes de aplicar
- **Drift Detection**: Detectar cambios manuales

### Secciones del Template

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Mi stack

Parameters:          # Inputs del usuario
  Environment:
    Type: String
    AllowedValues: [dev, staging, prod]

Mappings:            # Lookup tables estáticas
  RegionMap:
    us-east-1:
      AMI: ami-12345

Conditions:          # Lógica condicional
  IsProd: !Equals [!Ref Environment, prod]

Resources:           # OBLIGATORIO - Recursos AWS
  MyBucket:
    Type: AWS::S3::Bucket
    Condition: IsProd

Outputs:             # Valores exportados
  BucketArn:
    Value: !GetAtt MyBucket.Arn
    Export:
      Name: !Sub "${AWS::StackName}-BucketArn"
```

### Funciones Intrínsecas Importantes

| Función | Uso |
|---------|-----|
| `!Ref` | Referencia a parámetro o recurso (ID) |
| `!GetAtt` | Obtener atributo de recurso |
| `!Sub` | Sustitución de variables en string |
| `!Join` | Concatenar strings |
| `!Select` | Seleccionar de lista |
| `!Split` | Dividir string |
| `!ImportValue` | Importar output de otro stack |
| `!FindInMap` | Buscar en Mappings |
| `!If` | Condicional |

### Rollback y Protección

- **Rollback on failure**: Automático por defecto
- **Stack Policy**: Proteger recursos de updates/deletes
- **DeletionPolicy**: Retain, Snapshot, Delete
- **UpdateReplacePolicy**: Retain, Snapshot, Delete

---

## 3.5 AWS CDK (Cloud Development Kit)

### Conceptos

- **Infraestructura como código** usando lenguajes de programación
- **Lenguajes**: TypeScript, Python, Java, C#, Go
- **Constructs**: Componentes reutilizables (L1, L2, L3)
  - **L1**: CloudFormation resources directos (Cfn*)
  - **L2**: Abstracciones con defaults inteligentes
  - **L3**: Patterns (múltiples recursos preconfigurados)

```typescript
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class MyApiStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string) {
    super(scope, id);

    // DynamoDB Table (L2 Construct)
    const table = new dynamodb.Table(this, 'UsersTable', {
      partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Lambda Function
    const handler = new lambda.Function(this, 'GetUserHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'index.handler',
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    // Grant permissions (CDK genera la política automáticamente)
    table.grantReadData(handler);

    // API Gateway
    new apigateway.LambdaRestApi(this, 'UsersApi', {
      handler: handler,
    });
  }
}
```

### Comandos CDK

```bash
cdk init app --language typescript  # Inicializar
cdk synth                           # Generar CloudFormation template
cdk diff                            # Ver cambios pendientes
cdk deploy                          # Desplegar
cdk destroy                         # Eliminar stack
cdk bootstrap                       # Preparar cuenta/región (primera vez)
```

---

## 3.6 Estrategias de Deployment

### Comparación General

```
┌─────────────────────────────────────────────────────────────┐
│  ALL AT ONCE          │  ROLLING              │  BLUE/GREEN │
│  ████████ → ████████  │  ██░░░░ → ████░░ →   │  ████ (old) │
│  (downtime)           │  ██████ (gradual)     │  ████ (new) │
│                       │                       │  swap →     │
├───────────────────────┼───────────────────────┼─────────────┤
│  CANARY               │  LINEAR               │  IMMUTABLE  │
│  █░░░░░░░ (10%)       │  ██░░░░ → ████░░ →   │  ████ (old) │
│  ████████ (100%)      │  ██████ (+10%/min)    │  ████ (new) │
│  (validate then full) │                       │  kill old → │
└─────────────────────────────────────────────────────────────┘
```

### Rollback Strategies

| Servicio | Rollback |
|----------|----------|
| Elastic Beanstalk | Redeploy versión anterior |
| CodeDeploy (EC2) | Redeploy o manual |
| CodeDeploy (Lambda) | Automatic rollback on alarm |
| CloudFormation | Automatic rollback on failure |
| SAM | CloudFormation rollback |

---

## 3.7 Containers en AWS

### Amazon ECS (Elastic Container Service)

- **Task Definition**: Blueprint del container (imagen, CPU, memoria, ports)
- **Service**: Mantiene N tasks running
- **Launch Types**: EC2 (tú gestionas) o Fargate (serverless)

### Amazon ECR (Elastic Container Registry)

```bash
# Login
aws ecr get-login-password | docker login --username AWS --password-stdin ACCOUNT.dkr.ecr.REGION.amazonaws.com

# Build, tag, push
docker build -t my-app .
docker tag my-app:latest ACCOUNT.dkr.ecr.REGION.amazonaws.com/my-app:latest
docker push ACCOUNT.dkr.ecr.REGION.amazonaws.com/my-app:latest
```

### Fargate vs EC2 Launch Type

| Aspecto | Fargate | EC2 |
|---------|---------|-----|
| Gestión | Serverless | Tú gestionas instancias |
| Pricing | Por vCPU + memoria | Por instancia EC2 |
| Scaling | Automático | Auto Scaling Group |
| Mejor para | Microservicios, batch | GPU, control total |

---

## Preguntas de Práctica - Dominio 3

### Pregunta 1
**Un equipo quiere hacer deployment de una Lambda sin downtime, validando con un pequeño porcentaje de tráfico primero. ¿Qué usar?**

A) Elastic Beanstalk Blue/Green  
B) CodeDeploy con estrategia Canary10Percent5Minutes  
C) Actualizar el código directamente con UpdateFunctionCode  
D) Crear una nueva función Lambda  

**Respuesta: B**  
CodeDeploy con Canary envía 10% del tráfico a la nueva versión por 5 minutos. Si no hay errores, migra el 100%. Permite rollback automático con CloudWatch Alarms.

### Pregunta 2
**¿Qué archivo define las fases de build en CodeBuild?**

A) Dockerfile  
B) appspec.yml  
C) buildspec.yml  
D) template.yaml  

**Respuesta: C**  
`buildspec.yml` define las fases (install, pre_build, build, post_build), variables de entorno, artifacts y caché para CodeBuild.

### Pregunta 3
**Un desarrollador usa SAM y necesita probar su función Lambda localmente antes de deployar. ¿Qué comando usar?**

A) `sam deploy --local`  
B) `sam local invoke FunctionName --event event.json`  
C) `aws lambda invoke --local`  
D) `cdk synth --local`  

**Respuesta: B**  
`sam local invoke` ejecuta la función Lambda en un container Docker local, simulando el entorno de ejecución de Lambda.

### Pregunta 4
**En CloudFormation, ¿cómo se referencia el output de otro stack?**

A) `!Ref OtherStack.Output`  
B) `!ImportValue StackName-OutputKey`  
C) `!GetAtt OtherStack.Output`  
D) `!Cross-Stack-Ref`  

**Respuesta: B**  
`!ImportValue` importa valores exportados por otros stacks. El stack exportador usa `Export: Name:` en sus Outputs.

### Pregunta 5
**Una aplicación en Elastic Beanstalk necesita ejecutar migraciones de base de datos solo en una instancia durante el deployment. ¿Cómo?**

A) Usar un script en UserData  
B) Usar `container_commands` con `leader_only: true` en .ebextensions  
C) Ejecutar manualmente después del deploy  
D) Usar un Lambda trigger  

**Respuesta: B**  
`container_commands` con `leader_only: true` en `.ebextensions` asegura que el comando se ejecute solo en una instancia (el leader) durante el deployment.
