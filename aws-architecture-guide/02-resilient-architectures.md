# Dominio 2: Diseño de Arquitecturas Resilientes (26%)

## Índice
1. [Arquitecturas Escalables y Desacopladas](#1-arquitecturas-escalables-y-desacopladas)
2. [Arquitecturas de Alta Disponibilidad](#2-arquitecturas-de-alta-disponibilidad)
3. [Estrategias de Backup y Recuperación](#3-estrategias-de-backup-y-recuperación)
4. [Preguntas de Práctica](#preguntas-de-práctica)

---

## 1. Arquitecturas Escalables y Desacopladas

### Elastic Load Balancing (ELB)

#### Tipos de Load Balancers

| Tipo | Capa | Caso de Uso |
|------|------|-------------|
| Application LB (ALB) | 7 (HTTP/HTTPS) | Aplicaciones web, microservicios, routing basado en contenido |
| Network LB (NLB) | 4 (TCP/UDP) | Alto rendimiento, baja latencia, IPs estáticas |
| Gateway LB (GWLB) | 3 (IP) | Appliances de red (firewalls, IDS/IPS) |

#### Arquitectura con ALB

```
┌─────────────────────────────────────────────────────────────┐
│                    Internet                                   │
│                       │                                      │
│              ┌────────┴────────┐                            │
│              │       ALB       │                            │
│              │  (Multi-AZ)     │                            │
│              └────────┬────────┘                            │
│                       │                                      │
│         ┌─────────────┼─────────────┐                       │
│         │             │             │                       │
│    ┌────┴────┐   ┌────┴────┐   ┌────┴────┐                │
│    │ Target  │   │ Target  │   │ Target  │                │
│    │ Group 1 │   │ Group 2 │   │ Group 3 │                │
│    │ /api/*  │   │ /web/*  │   │ /admin/*│                │
│    └────┬────┘   └────┬────┘   └────┬────┘                │
│         │             │             │                       │
│    [EC2/ECS]     [EC2/ECS]     [EC2/ECS]                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Auto Scaling

#### Políticas de Escalamiento

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| Target Tracking | Mantiene una métrica en un valor objetivo | CPU al 70% |
| Step Scaling | Escala en pasos según umbrales | +2 si CPU > 80%, +4 si CPU > 90% |
| Simple Scaling | Una acción por alarma | +1 instancia si CPU > 75% |
| Scheduled | Escalamiento programado | 10 instancias a las 9:00 AM |
| Predictive | Usa ML para predecir demanda | Basado en patrones históricos |

#### Configuración de Auto Scaling Group

```
┌─────────────────────────────────────────────┐
│         Auto Scaling Group                   │
├─────────────────────────────────────────────┤
│                                             │
│  Launch Template:                           │
│  ├── AMI: ami-0123456789abcdef0            │
│  ├── Instance Type: t3.medium              │
│  ├── Security Group: sg-web                │
│  ├── User Data: bootstrap script           │
│  └── IAM Role: EC2-WebApp-Role             │
│                                             │
│  Scaling Configuration:                     │
│  ├── Min: 2                                │
│  ├── Desired: 4                            │
│  ├── Max: 10                               │
│  └── Cooldown: 300 segundos                │
│                                             │
│  Health Checks:                             │
│  ├── EC2 (default)                         │
│  └── ELB (recomendado con ALB)             │
│                                             │
└─────────────────────────────────────────────┘
```

### Desacoplamiento con Mensajería

#### Amazon SQS (Simple Queue Service)

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│ Productor│────▶│   SQS    │────▶│Consumidor│
│          │     │  Queue   │     │          │
└──────────┘     └──────────┘     └──────────┘

Tipos de Cola:
├── Standard: Entrega al menos una vez, orden no garantizado
│   └── Throughput: Ilimitado
└── FIFO: Exactamente una vez, orden garantizado
    └── Throughput: 3,000 msg/s con batching
```

**Configuraciones importantes:**
- **Visibility Timeout**: Tiempo que un mensaje es invisible después de ser leído (default: 30s)
- **Message Retention**: Tiempo máximo en cola (default: 4 días, max: 14 días)
- **Dead Letter Queue (DLQ)**: Cola para mensajes que fallan repetidamente
- **Long Polling**: Reduce costos esperando mensajes (WaitTimeSeconds: 1-20s)

#### Amazon SNS (Simple Notification Service)

```
                    ┌──────────┐
                    │   SNS    │
                    │  Topic   │
                    └────┬─────┘
                         │
          ┌──────────────┼──────────────┐
          │              │              │
     ┌────┴────┐    ┌───┴────┐    ┌───┴────┐
     │  SQS    │    │ Lambda │    │ Email  │
     │  Queue  │    │Function│    │  Sub   │
     └─────────┘    └────────┘    └────────┘
```

#### Amazon EventBridge

- Bus de eventos serverless
- Reglas basadas en patrones de eventos
- Integración con servicios AWS y SaaS
- Ideal para arquitecturas event-driven

```
┌──────────────────────────────────────────────────┐
│              Amazon EventBridge                    │
├──────────────────────────────────────────────────┤
│                                                  │
│  Fuentes de Eventos:                             │
│  ├── Servicios AWS (EC2, S3, etc.)              │
│  ├── Aplicaciones SaaS (Zendesk, Datadog)       │
│  └── Aplicaciones propias                        │
│                                                  │
│  Reglas → Targets:                               │
│  ├── Lambda Functions                            │
│  ├── Step Functions                              │
│  ├── SQS Queues                                  │
│  ├── SNS Topics                                  │
│  └── API Destinations                            │
│                                                  │
└──────────────────────────────────────────────────┘
```

### Amazon Kinesis

Para procesamiento de datos en streaming en tiempo real:

| Servicio | Caso de Uso |
|----------|-------------|
| Kinesis Data Streams | Ingesta de datos en tiempo real, procesamiento personalizado |
| Kinesis Data Firehose | Entrega de datos a destinos (S3, Redshift, OpenSearch) |
| Kinesis Data Analytics | Análisis SQL/Apache Flink en tiempo real |
| Kinesis Video Streams | Streaming de video para análisis |

---

## 2. Arquitecturas de Alta Disponibilidad

### Multi-AZ vs Multi-Region

```
┌─────────────────────────────────────────────────────────────┐
│                    Multi-AZ (HA)                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Region: us-east-1                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │    AZ-1a     │  │    AZ-1b     │  │    AZ-1c     │     │
│  │  [EC2][RDS]  │  │  [EC2][RDS]  │  │  [EC2]       │     │
│  │  Primary     │  │  Standby     │  │  Read Replica │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                             │
│  RPO: ~0 (replicación síncrona)                            │
│  RTO: Minutos (failover automático)                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    Multi-Region (DR)                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐         ┌─────────────────┐          │
│  │  us-east-1      │         │  eu-west-1      │          │
│  │  (Primary)      │ ──────▶ │  (Secondary)    │          │
│  │  [Full Stack]   │  Replic │  [Full Stack]   │          │
│  └─────────────────┘         └─────────────────┘          │
│                                                             │
│  RPO: Segundos-Minutos (replicación asíncrona)             │
│  RTO: Minutos-Horas (según estrategia DR)                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Amazon RDS - Alta Disponibilidad

#### Multi-AZ Deployment

- Replicación síncrona a standby en otra AZ
- Failover automático (DNS update ~60-120 segundos)
- No se usa para lectura (solo standby)

#### Read Replicas

- Replicación asíncrona
- Hasta 15 réplicas (Aurora) o 5 (otros motores)
- Pueden estar en otra región (Cross-Region)
- Se pueden promover a instancia independiente

```
┌─────────────────────────────────────────────┐
│           RDS Multi-AZ + Read Replicas       │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────┐    Síncrona    ┌─────────┐   │
│  │ Primary │───────────────▶│ Standby │   │
│  │  (AZ-a) │               │  (AZ-b) │   │
│  └────┬────┘               └─────────┘   │
│       │                                    │
│       │ Asíncrona                          │
│       │                                    │
│  ┌────┴────┐    ┌─────────┐              │
│  │ Replica │    │ Replica │              │
│  │  (AZ-c) │    │(Region2)│              │
│  └─────────┘    └─────────┘              │
│                                             │
└─────────────────────────────────────────────┘
```

### Amazon Aurora

- Compatible con MySQL y PostgreSQL
- 6 copias de datos en 3 AZs
- Failover automático en < 30 segundos
- Aurora Global Database: replicación cross-region < 1 segundo
- Aurora Serverless: escalamiento automático de capacidad

### Amazon S3 - Durabilidad y Disponibilidad

| Clase | Durabilidad | Disponibilidad | Caso de Uso |
|-------|-------------|----------------|-------------|
| S3 Standard | 99.999999999% | 99.99% | Datos de acceso frecuente |
| S3 IA | 99.999999999% | 99.9% | Acceso infrecuente |
| S3 One Zone-IA | 99.999999999% | 99.5% | Datos recreables |
| S3 Glacier Instant | 99.999999999% | 99.9% | Archivo con acceso inmediato |
| S3 Glacier Flexible | 99.999999999% | 99.99% | Archivo (minutos a horas) |
| S3 Glacier Deep Archive | 99.999999999% | 99.99% | Archivo largo plazo (12h) |

### Route 53 - Políticas de Routing

| Política | Descripción | Caso de Uso |
|----------|-------------|-------------|
| Simple | Un registro, un valor | Sitio web simple |
| Weighted | Distribución por peso | Blue/Green deployment |
| Latency | Menor latencia | Aplicaciones globales |
| Failover | Active-Passive | Disaster Recovery |
| Geolocation | Por ubicación del usuario | Contenido localizado |
| Geoproximity | Por proximidad geográfica | Distribución de tráfico |
| Multivalue | Múltiples valores con health checks | Simple load balancing |

---

## 3. Estrategias de Backup y Recuperación

### Estrategias de Disaster Recovery

```
┌─────────────────────────────────────────────────────────────┐
│          Estrategias de DR (Costo vs Velocidad)              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Costo ↑                                    Velocidad ↑    │
│                                                             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐     │
│  │ Backup  │  │  Pilot  │  │  Warm   │  │  Multi  │     │
│  │    &    │  │  Light  │  │ Standby │  │  Site   │     │
│  │ Restore │  │         │  │         │  │ Active  │     │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘     │
│                                                             │
│  RTO: Horas   RTO: 10min   RTO: Minutos  RTO: ~0          │
│  RPO: Horas   RPO: Minutos RPO: Segundos RPO: ~0          │
│  $             $$           $$$           $$$$              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Backup & Restore
- Backups regulares a S3/Glacier
- Restauración manual en caso de desastre
- Más económico pero más lento

#### Pilot Light
- Componentes core siempre activos (DB replicada)
- Infraestructura mínima lista para escalar
- Se "enciende" la infraestructura completa en DR

#### Warm Standby
- Versión reducida del entorno completo siempre activa
- Se escala a capacidad completa en DR
- Balance entre costo y velocidad

#### Multi-Site Active/Active
- Entorno completo en múltiples regiones
- Tráfico distribuido entre regiones
- Failover instantáneo
- Más costoso

### AWS Backup

Servicio centralizado para gestionar backups:

- Políticas de backup centralizadas
- Backup cross-region y cross-account
- Soporte para: EC2, EBS, RDS, DynamoDB, EFS, FSx, S3
- Vault Lock para cumplimiento (WORM - Write Once Read Many)

### Lifecycle Policies

```
┌─────────────────────────────────────────────────────────────┐
│              S3 Lifecycle Policy Ejemplo                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Día 0:    S3 Standard (acceso frecuente)                   │
│     │                                                       │
│  Día 30:   → S3 Standard-IA (acceso infrecuente)           │
│     │                                                       │
│  Día 90:   → S3 Glacier Instant Retrieval                  │
│     │                                                       │
│  Día 180:  → S3 Glacier Flexible Retrieval                 │
│     │                                                       │
│  Día 365:  → S3 Glacier Deep Archive                       │
│     │                                                       │
│  Día 730:  → Eliminación                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Preguntas de Práctica

### Pregunta 1
**Una aplicación web experimenta picos de tráfico impredecibles. La arquitectura actual usa EC2 detrás de un ALB. Durante los picos, los usuarios experimentan tiempos de respuesta lentos. ¿Qué solución mejora la resiliencia?**

A) Aumentar el tamaño de las instancias EC2  
B) Configurar Auto Scaling con Target Tracking basado en CPU al 70%  
C) Agregar más instancias EC2 manualmente  
D) Cambiar a un NLB  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

Auto Scaling con Target Tracking:
- Escala automáticamente según la demanda
- Mantiene la CPU en el objetivo (70%)
- Agrega instancias durante picos
- Reduce instancias cuando baja la demanda
- No requiere intervención manual

La opción A no resuelve picos impredecibles. La opción C requiere intervención manual. La opción D (NLB) no resuelve el problema de capacidad.
</details>

### Pregunta 2
**Una empresa tiene una aplicación que procesa pedidos. Si el servicio de procesamiento falla, los pedidos no deben perderse. ¿Qué arquitectura garantiza esto?**

A) Enviar pedidos directamente al servicio de procesamiento  
B) Usar Amazon SQS entre el frontend y el servicio de procesamiento  
C) Almacenar pedidos en una variable de sesión  
D) Usar Amazon SNS para notificar al servicio  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

Amazon SQS proporciona:
- Desacoplamiento entre productor y consumidor
- Retención de mensajes hasta 14 días
- Dead Letter Queue para mensajes fallidos
- El servicio puede procesar mensajes cuando se recupere
- Garantía de entrega (at-least-once para Standard, exactly-once para FIFO)

La opción A crea acoplamiento fuerte. La opción C pierde datos si el servidor falla. SNS (D) no retiene mensajes si el suscriptor no está disponible.
</details>

### Pregunta 3
**Una base de datos RDS MySQL necesita alta disponibilidad con failover automático y también necesita manejar un alto volumen de consultas de lectura. ¿Qué configuración es óptima?**

A) RDS Multi-AZ solamente  
B) RDS con Read Replicas solamente  
C) RDS Multi-AZ con Read Replicas  
D) Migrar a DynamoDB  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: C**

La combinación de Multi-AZ + Read Replicas proporciona:
- **Multi-AZ**: Failover automático para alta disponibilidad (standby síncrono)
- **Read Replicas**: Distribución de carga de lectura (réplicas asíncronas)
- Cada componente resuelve un problema diferente

Multi-AZ solo (A) no ayuda con la carga de lectura. Read Replicas solo (B) no proporciona failover automático. DynamoDB (D) requiere rediseño de la aplicación y no es compatible con SQL.
</details>

### Pregunta 4
**Una empresa necesita una estrategia de DR con RTO de 15 minutos y RPO de 1 minuto para su aplicación crítica. El presupuesto es moderado. ¿Qué estrategia es más apropiada?**

A) Backup & Restore  
B) Pilot Light  
C) Warm Standby  
D) Multi-Site Active/Active  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: C**

Warm Standby es la mejor opción porque:
- RTO de minutos (cumple los 15 minutos requeridos)
- RPO de segundos (cumple el 1 minuto requerido)
- Costo moderado (entorno reducido siempre activo)
- Se escala rápidamente a capacidad completa

Backup & Restore (A) tiene RTO de horas. Pilot Light (B) tiene RTO de ~10 minutos pero RPO puede ser mayor. Multi-Site (D) es más costoso de lo necesario para estos requisitos.
</details>

### Pregunta 5
**Una aplicación usa Amazon S3 para almacenar logs. Los logs se consultan frecuentemente durante los primeros 7 días, ocasionalmente durante 30 días, y deben retenerse por 5 años por cumplimiento. ¿Qué configuración de lifecycle es más eficiente?**

A) Mantener todo en S3 Standard por 5 años  
B) S3 Standard (7 días) → S3 Standard-IA (30 días) → S3 Glacier Deep Archive (5 años)  
C) S3 Standard (7 días) → S3 Glacier Instant Retrieval (30 días) → S3 Glacier Deep Archive (5 años)  
D) Eliminar logs después de 30 días  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

La política de lifecycle óptima:
- **Días 0-7**: S3 Standard para acceso frecuente
- **Días 7-30**: S3 Standard-IA para acceso ocasional (más económico que Standard)
- **Después de 30 días**: S3 Glacier Deep Archive para retención a largo plazo (más económico)

La opción A es muy costosa. La opción C usa Glacier Instant que es más caro que Standard-IA para acceso ocasional. La opción D no cumple el requisito de retención de 5 años.
</details>

---

## Resumen de Servicios Clave - Dominio 2

| Categoría | Servicios |
|-----------|-----------|
| Balanceo de Carga | ALB, NLB, GWLB |
| Escalamiento | Auto Scaling, Aurora Serverless |
| Mensajería | SQS, SNS, EventBridge, Kinesis |
| Base de Datos HA | RDS Multi-AZ, Aurora, DynamoDB Global Tables |
| Almacenamiento | S3 (clases), EBS snapshots, EFS |
| DNS y Routing | Route 53 |
| Backup | AWS Backup, S3 Lifecycle |
| DR | CloudFormation, Elastic Disaster Recovery |
