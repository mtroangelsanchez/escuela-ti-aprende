# Dominio 3: Diseño de Arquitecturas de Alto Rendimiento (24%)

## Índice
1. [Soluciones de Almacenamiento de Alto Rendimiento](#1-soluciones-de-almacenamiento-de-alto-rendimiento)
2. [Soluciones de Cómputo de Alto Rendimiento](#2-soluciones-de-cómputo-de-alto-rendimiento)
3. [Soluciones de Base de Datos de Alto Rendimiento](#3-soluciones-de-base-de-datos-de-alto-rendimiento)
4. [Arquitecturas de Red de Alto Rendimiento](#4-arquitecturas-de-red-de-alto-rendimiento)
5. [Preguntas de Práctica](#preguntas-de-práctica)

---

## 1. Soluciones de Almacenamiento de Alto Rendimiento

### Amazon EBS (Elastic Block Store)

#### Tipos de Volúmenes

| Tipo | IOPS Max | Throughput Max | Caso de Uso |
|------|----------|----------------|-------------|
| gp3 | 16,000 | 1,000 MB/s | Propósito general, boot volumes |
| gp2 | 16,000 | 250 MB/s | Legacy general purpose |
| io2 Block Express | 256,000 | 4,000 MB/s | Bases de datos críticas |
| io1 | 64,000 | 1,000 MB/s | Bases de datos de alto rendimiento |
| st1 | 500 | 500 MB/s | Big data, data warehouses |
| sc1 | 250 | 250 MB/s | Archivos de acceso infrecuente |

```
┌─────────────────────────────────────────────────────────────┐
│           Selección de Volumen EBS                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ¿Necesitas alto IOPS?                                      │
│  ├── Sí (>16,000 IOPS) → io2 Block Express                │
│  ├── Sí (hasta 16,000) → gp3 (más económico que io1)      │
│  └── No                                                     │
│      ├── ¿Alto throughput secuencial? → st1                │
│      ├── ¿Acceso infrecuente? → sc1                        │
│      └── ¿Propósito general? → gp3                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Amazon EFS (Elastic File System)

- Sistema de archivos NFS compartido
- Escalamiento automático (petabytes)
- Multi-AZ por defecto
- Modos de rendimiento:
  - **General Purpose**: Baja latencia (default)
  - **Max I/O**: Alto throughput, mayor latencia
- Modos de throughput:
  - **Bursting**: Escala con el tamaño del filesystem
  - **Provisioned**: Throughput fijo independiente del tamaño
  - **Elastic**: Escala automáticamente según demanda

### Amazon FSx

| Servicio | Sistema de Archivos | Caso de Uso |
|----------|--------------------|----|
| FSx for Windows | NTFS, SMB | Aplicaciones Windows, Active Directory |
| FSx for Lustre | Lustre | HPC, Machine Learning, procesamiento de video |
| FSx for NetApp ONTAP | NFS, SMB, iSCSI | Migración de NAS on-premises |
| FSx for OpenZFS | NFS | Migración de ZFS, Linux workloads |

### Amazon S3 - Rendimiento

#### Optimización de Rendimiento

- **Prefijos**: 3,500 PUT/COPY/POST/DELETE y 5,500 GET/HEAD por segundo por prefijo
- **Multipart Upload**: Obligatorio para archivos > 5 GB, recomendado > 100 MB
- **S3 Transfer Acceleration**: Usa CloudFront edge locations para uploads rápidos
- **Byte-Range Fetches**: Descargas paralelas de partes del archivo

```
┌─────────────────────────────────────────────────────────────┐
│           S3 Performance Optimization                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Uploads Grandes:                                           │
│  ├── Multipart Upload (paralelo)                           │
│  ├── S3 Transfer Acceleration (global)                     │
│  └── AWS Snow Family (offline, petabytes)                  │
│                                                             │
│  Downloads Rápidos:                                         │
│  ├── Byte-Range Fetches (paralelo)                         │
│  ├── CloudFront (caching global)                           │
│  └── S3 Select (filtrar datos en S3)                       │
│                                                             │
│  Distribución de Prefijos:                                  │
│  ├── bucket/images/2024/01/file.jpg                        │
│  ├── bucket/images/2024/02/file.jpg                        │
│  └── Cada prefijo = 5,500 GET/s                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Soluciones de Cómputo de Alto Rendimiento

### Amazon EC2 - Optimización

#### Familias de Instancias

| Familia | Optimizada para | Ejemplos |
|---------|----------------|----------|
| C (Compute) | CPU intensivo | c6i, c7g | Procesamiento batch, ML inference |
| M (General) | Balanceado | m6i, m7g | Aplicaciones web, bases de datos |
| R (Memory) | Memoria | r6i, r7g | Caches, bases de datos in-memory |
| P/G (Accelerated) | GPU | p4d, g5 | ML training, rendering |
| I (Storage) | I/O | i3, i4i | Bases de datos NoSQL, data warehouses |
| Hpc | HPC | hpc6a, hpc7g | Simulaciones, modelado |

#### Placement Groups

| Tipo | Descripción | Caso de Uso |
|------|-------------|-------------|
| Cluster | Instancias juntas en un rack | HPC, baja latencia entre nodos |
| Spread | Instancias en hardware separado | Alta disponibilidad, máx 7/AZ |
| Partition | Grupos en particiones separadas | Hadoop, Cassandra, Kafka |

### AWS Lambda - Rendimiento

```
┌─────────────────────────────────────────────────────────────┐
│              Lambda Performance Tuning                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Memoria: 128 MB - 10,240 MB                               │
│  ├── Más memoria = más CPU proporcionalmente               │
│  └── Optimizar: encontrar el punto de costo/rendimiento    │
│                                                             │
│  Concurrencia:                                              │
│  ├── Reserved Concurrency: garantiza capacidad             │
│  ├── Provisioned Concurrency: elimina cold starts          │
│  └── Default: 1,000 concurrent executions por región       │
│                                                             │
│  Optimizaciones:                                            │
│  ├── Reutilizar conexiones (fuera del handler)             │
│  ├── Minimizar tamaño del paquete                          │
│  ├── Usar Lambda Layers para dependencias                  │
│  └── SnapStart (Java) para reducir cold starts             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Contenedores en AWS

#### Amazon ECS vs EKS

| Característica | ECS | EKS |
|---------------|-----|-----|
| Orquestador | AWS propietario | Kubernetes |
| Complejidad | Menor | Mayor |
| Portabilidad | AWS only | Multi-cloud |
| Integración AWS | Nativa profunda | Buena |
| Costo control plane | Gratis | $0.10/hora |

#### AWS Fargate

- Serverless para contenedores
- Sin gestión de infraestructura
- Pago por vCPU y memoria usada
- Compatible con ECS y EKS

```
┌─────────────────────────────────────────────────────────────┐
│         Decisión: EC2 vs Fargate vs Lambda                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Lambda:                                                    │
│  ├── Ejecuciones cortas (< 15 min)                         │
│  ├── Event-driven                                          │
│  └── Sin estado                                            │
│                                                             │
│  Fargate:                                                   │
│  ├── Contenedores sin gestionar servidores                 │
│  ├── Ejecuciones largas                                    │
│  └── Microservicios                                        │
│                                                             │
│  EC2:                                                       │
│  ├── Control total del OS                                  │
│  ├── GPU/hardware específico                               │
│  └── Licencias por socket/core                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Soluciones de Base de Datos de Alto Rendimiento

### Selección de Base de Datos

```
┌─────────────────────────────────────────────────────────────┐
│           Árbol de Decisión de Base de Datos                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ¿Tipo de datos?                                            │
│  │                                                          │
│  ├── Relacional (SQL)                                       │
│  │   ├── ¿Necesitas compatibilidad MySQL/PostgreSQL?       │
│  │   │   └── Amazon Aurora                                 │
│  │   ├── ¿Necesitas Oracle/SQL Server?                     │
│  │   │   └── Amazon RDS                                    │
│  │   └── ¿Data warehouse?                                  │
│  │       └── Amazon Redshift                               │
│  │                                                          │
│  ├── Key-Value / Documento                                  │
│  │   ├── ¿Baja latencia, alta escala?                      │
│  │   │   └── Amazon DynamoDB                               │
│  │   └── ¿Compatible con MongoDB?                          │
│  │       └── Amazon DocumentDB                             │
│  │                                                          │
│  ├── In-Memory Cache                                        │
│  │   ├── ¿Redis features (pub/sub, sorted sets)?           │
│  │   │   └── ElastiCache Redis                             │
│  │   └── ¿Simple caching?                                  │
│  │       └── ElastiCache Memcached                         │
│  │                                                          │
│  ├── Grafos                                                 │
│  │   └── Amazon Neptune                                    │
│  │                                                          │
│  ├── Time Series                                            │
│  │   └── Amazon Timestream                                 │
│  │                                                          │
│  └── Ledger (inmutable)                                     │
│      └── Amazon QLDB                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Amazon DynamoDB - Rendimiento

#### Modos de Capacidad

| Modo | Descripción | Caso de Uso |
|------|-------------|-------------|
| On-Demand | Pago por solicitud | Tráfico impredecible |
| Provisioned | Capacidad reservada | Tráfico predecible, más económico |

#### DynamoDB Accelerator (DAX)

- Cache in-memory para DynamoDB
- Latencia de microsegundos (vs milisegundos)
- Compatible con API de DynamoDB
- Ideal para lecturas repetitivas

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│   App    │────▶│   DAX    │────▶│ DynamoDB │
│          │     │  Cache   │     │  Table   │
└──────────┘     └──────────┘     └──────────┘
                  (μs latency)    (ms latency)
```

#### Global Tables

- Replicación multi-region activa-activa
- Escrituras en cualquier región
- Latencia local para usuarios globales
- Resolución de conflictos: last writer wins

### Amazon ElastiCache

#### Redis vs Memcached

| Característica | Redis | Memcached |
|---------------|-------|-----------|
| Persistencia | Sí | No |
| Replicación | Sí (cluster mode) | No |
| Pub/Sub | Sí | No |
| Sorted Sets | Sí | No |
| Multi-thread | No (single-thread) | Sí |
| Backup | Sí | No |
| Caso de uso | Sesiones, leaderboards, queues | Simple caching |

### Amazon Redshift

- Data warehouse columnar
- Procesamiento masivamente paralelo (MPP)
- Redshift Spectrum: consulta datos en S3 directamente
- Concurrency Scaling: escala automáticamente para picos de consultas
- AQUA: aceleración de queries con hardware especializado

---

## 4. Arquitecturas de Red de Alto Rendimiento

### Amazon CloudFront

```
┌─────────────────────────────────────────────────────────────┐
│              CloudFront CDN Architecture                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Usuarios Globales                                          │
│       │                                                     │
│  ┌────┴────┐                                               │
│  │  Edge   │  450+ Points of Presence                      │
│  │Location │                                               │
│  └────┬────┘                                               │
│       │ Cache Hit? → Respuesta inmediata                   │
│       │ Cache Miss ↓                                       │
│  ┌────┴────┐                                               │
│  │Regional │  13 Regional Edge Caches                      │
│  │  Edge   │                                               │
│  └────┬────┘                                               │
│       │ Cache Miss ↓                                       │
│  ┌────┴────┐                                               │
│  │ Origin  │  S3, ALB, EC2, Custom Origin                  │
│  │         │                                               │
│  └─────────┘                                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Funcionalidades Clave

- **Origin Access Control (OAC)**: Acceso seguro a S3
- **Lambda@Edge**: Código en edge locations (Node.js, Python)
- **CloudFront Functions**: Funciones ligeras para headers/redirects
- **Field-Level Encryption**: Cifrado de campos específicos
- **Real-time Logs**: Logs en tiempo real a Kinesis

### AWS Global Accelerator

- IPs anycast estáticas
- Routing por la red global de AWS
- Failover automático entre regiones
- Mejora latencia hasta 60%

```
Diferencia con CloudFront:
┌─────────────────────────────────────────────┐
│  CloudFront: Cachea contenido en edge       │
│  Global Accelerator: Optimiza ruta de red   │
│                                             │
│  CloudFront → Contenido estático/dinámico   │
│  Global Accelerator → TCP/UDP, gaming, IoT  │
└─────────────────────────────────────────────┘
```

### VPC Networking Avanzado

#### Enhanced Networking

- **ENA (Elastic Network Adapter)**: Hasta 100 Gbps
- **EFA (Elastic Fabric Adapter)**: Para HPC, bypass del kernel OS
- **Placement Groups (Cluster)**: Mínima latencia entre instancias

#### VPC Endpoints

| Tipo | Servicios | Costo |
|------|-----------|-------|
| Gateway Endpoint | S3, DynamoDB | Gratis |
| Interface Endpoint | 100+ servicios AWS | $0.01/hora + datos |

### AWS Direct Connect

- Conexión dedicada a AWS (1 Gbps o 10 Gbps)
- Latencia consistente
- No pasa por internet público
- Direct Connect Gateway: acceso a múltiples VPCs/regiones

---

## Preguntas de Práctica

### Pregunta 1
**Una aplicación de análisis necesita procesar archivos de 50 GB almacenados en S3. El procesamiento es secuencial y requiere alto throughput de lectura. ¿Qué optimización de S3 mejora el rendimiento?**

A) Usar S3 Transfer Acceleration  
B) Usar Byte-Range Fetches para descargas paralelas  
C) Cambiar a S3 Glacier  
D) Usar S3 Select  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

Byte-Range Fetches permite:
- Descargar partes del archivo en paralelo
- Aprovechar múltiples conexiones simultáneas
- Reintentar solo las partes que fallen
- Significativamente más rápido que descarga secuencial

Transfer Acceleration (A) es para uploads, no downloads. Glacier (C) es para archivado. S3 Select (D) es para filtrar datos CSV/JSON, no para archivos grandes arbitrarios.
</details>

### Pregunta 2
**Una aplicación de e-commerce necesita latencia de lectura de sub-milisegundos para su catálogo de productos almacenado en DynamoDB. ¿Qué solución proporciona esto?**

A) Agregar Read Replicas a DynamoDB  
B) Implementar DynamoDB Accelerator (DAX)  
C) Cambiar a modo On-Demand  
D) Aumentar las Read Capacity Units  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

DAX (DynamoDB Accelerator):
- Cache in-memory compatible con DynamoDB API
- Latencia de microsegundos para lecturas
- Sin cambios en el código de la aplicación
- Ideal para lecturas repetitivas del catálogo

DynamoDB no tiene Read Replicas (A). On-Demand (C) no mejora latencia. Más RCUs (D) no reducen latencia por debajo de milisegundos.
</details>

### Pregunta 3
**Una empresa global necesita servir contenido estático y dinámico a usuarios en todo el mundo con la menor latencia posible. El origen está en us-east-1. ¿Qué solución es más efectiva?**

A) Desplegar la aplicación en todas las regiones  
B) Usar Amazon CloudFront con el origen en us-east-1  
C) Usar Route 53 con routing de latencia  
D) Usar AWS Global Accelerator  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

Amazon CloudFront:
- Cachea contenido en 450+ edge locations globales
- Reduce latencia para contenido estático (cache hit)
- Mejora rendimiento de contenido dinámico (conexiones optimizadas al origen)
- Más económico que desplegar en múltiples regiones

Desplegar en todas las regiones (A) es costoso y complejo. Route 53 (C) solo dirige tráfico, no cachea. Global Accelerator (D) optimiza la ruta pero no cachea contenido.
</details>

### Pregunta 4
**Un cluster HPC necesita comunicación de baja latencia entre 100 instancias EC2 para simulaciones científicas. ¿Qué configuración maximiza el rendimiento de red?**

A) Instancias en diferentes AZs con Enhanced Networking  
B) Instancias en un Cluster Placement Group con EFA  
C) Instancias con ENA en un Spread Placement Group  
D) Instancias Spot en un Partition Placement Group  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

Cluster Placement Group + EFA:
- Cluster PG: todas las instancias en el mismo rack, mínima latencia
- EFA (Elastic Fabric Adapter): bypass del kernel para comunicación directa
- Ideal para MPI y aplicaciones HPC
- Latencia de microsegundos entre nodos

Diferentes AZs (A) aumenta latencia. Spread PG (C) separa instancias intencionalmente. Partition PG (D) es para big data, no HPC.
</details>

### Pregunta 5
**Una aplicación necesita una base de datos que soporte millones de solicitudes por segundo con latencia de milisegundos, esquema flexible, y escalamiento horizontal automático. ¿Qué servicio es más apropiado?**

A) Amazon RDS Aurora  
B) Amazon DynamoDB  
C) Amazon ElastiCache Redis  
D) Amazon Redshift  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

Amazon DynamoDB:
- Escalamiento horizontal automático (particiones)
- Latencia de milisegundos de un dígito
- Millones de solicitudes por segundo
- Esquema flexible (key-value y documento)
- Fully managed, sin mantenimiento

Aurora (A) es relacional con esquema fijo. ElastiCache (C) es cache, no base de datos primaria. Redshift (D) es para analytics, no transaccional.
</details>

---

## Resumen de Servicios Clave - Dominio 3

| Categoría | Servicios |
|-----------|-----------|
| Almacenamiento | EBS (gp3, io2), EFS, FSx, S3 |
| Cómputo | EC2 (familias), Lambda, Fargate, ECS/EKS |
| Base de Datos | Aurora, DynamoDB+DAX, ElastiCache, Redshift |
| Red | CloudFront, Global Accelerator, Direct Connect |
| Transferencia | Transfer Family, DataSync, Snow Family |
