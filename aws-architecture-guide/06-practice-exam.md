# 📝 Examen de Práctica - AWS Solutions Architect Associate

## Instrucciones

- **Total de preguntas**: 30
- **Tiempo sugerido**: 60 minutos
- **Puntaje para aprobar**: 72% (22/30)
- **Formato**: Opción múltiple (una o varias respuestas correctas)

---

## Preguntas

### Pregunta 1 - Dominio 1 (Seguridad)
**Una empresa necesita que una aplicación en EC2 acceda a objetos en un bucket S3 sin usar access keys de largo plazo. ¿Cuál es la mejor práctica?**

A) Almacenar access keys en variables de entorno  
B) Asignar un IAM Role a la instancia EC2  
C) Almacenar access keys en Secrets Manager  
D) Usar la cuenta root para acceder a S3  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

Los IAM Roles para EC2 proporcionan credenciales temporales automáticamente mediante el Instance Metadata Service. No se necesitan access keys de largo plazo, lo que es más seguro y más fácil de gestionar.
</details>

---

### Pregunta 2 - Dominio 1 (Seguridad)
**Una aplicación web necesita protección contra ataques SQL injection y XSS. El tráfico llega a través de un Application Load Balancer. ¿Qué servicio proporciona esta protección?**

A) AWS Shield Standard  
B) Security Groups  
C) AWS WAF asociado al ALB  
D) Network ACLs  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: C**

AWS WAF se puede asociar directamente a un ALB y proporciona reglas para detectar y bloquear SQL injection y XSS. Shield (A) protege contra DDoS. Security Groups (B) y NACLs (D) operan a nivel de red, no inspeccionan contenido HTTP.
</details>

---

### Pregunta 3 - Dominio 1 (Seguridad)
**Una empresa requiere que todos los datos en S3 estén cifrados y que las claves de cifrado se roten cada 90 días. También necesitan auditar quién usó las claves. ¿Qué solución cumple todos los requisitos?**

A) SSE-S3 con rotación automática  
B) SSE-KMS con Customer Managed Key, rotación habilitada, y CloudTrail  
C) SSE-C con rotación manual  
D) Cifrado del lado del cliente con OpenSSL  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

SSE-KMS con CMK permite rotación automática configurable y CloudTrail registra cada uso de la clave (quién, cuándo, para qué recurso). SSE-S3 no permite control de rotación. SSE-C requiere gestión manual. Cifrado del cliente no proporciona auditoría de AWS.
</details>

---

### Pregunta 4 - Dominio 1 (Seguridad)
**Una organización con 50 cuentas AWS necesita prevenir que cualquier cuenta lance instancias EC2 en regiones fuera de us-east-1 y eu-west-1. ¿Qué mecanismo es más apropiado?**

A) IAM Policies en cada cuenta  
B) Service Control Policy (SCP) en AWS Organizations  
C) Security Groups restrictivos  
D) AWS Config rules  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

Las SCPs en AWS Organizations establecen límites de permisos para todas las cuentas de la organización. Una SCP puede denegar ec2:RunInstances con una condición que restrinja las regiones permitidas. Se aplica centralmente sin necesidad de configurar cada cuenta individualmente.
</details>

---

### Pregunta 5 - Dominio 2 (Resiliencia)
**Una aplicación de procesamiento de pedidos no puede perder ningún mensaje. El sistema de procesamiento puede estar temporalmente no disponible. ¿Qué arquitectura garantiza que no se pierdan pedidos?**

A) Enviar pedidos directamente al microservicio de procesamiento  
B) Usar SNS para notificar al procesador  
C) Usar SQS con Dead Letter Queue y alarmas de CloudWatch  
D) Almacenar pedidos en una cookie del navegador  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: C**

SQS retiene mensajes hasta 14 días. Si el procesador falla repetidamente, la DLQ captura los mensajes problemáticos. CloudWatch alarma cuando hay mensajes en la DLQ para investigación. SNS (B) no retiene mensajes si el suscriptor no está disponible.
</details>

---
### Pregunta 6 - Dominio 2 (Resiliencia)
**Una base de datos RDS PostgreSQL necesita alta disponibilidad con failover automático y también soportar consultas de reporting sin afectar el rendimiento de producción. ¿Qué configuración es óptima?**

A) RDS Single-AZ con backups automáticos  
B) RDS Multi-AZ con Read Replicas  
C) DynamoDB con Global Tables  
D) RDS con snapshots cada hora  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

Multi-AZ proporciona failover automático (HA). Read Replicas permiten dirigir consultas de reporting sin impactar la instancia primaria. Es la combinación que cumple ambos requisitos.
</details>

---

### Pregunta 7 - Dominio 2 (Resiliencia)
**Una empresa necesita una estrategia de DR con RTO < 1 hora y RPO < 5 minutos para su aplicación crítica en us-east-1. El presupuesto permite mantener infraestructura reducida en la región secundaria. ¿Qué estrategia es más apropiada?**

A) Backup & Restore  
B) Pilot Light  
C) Warm Standby  
D) Multi-Site Active/Active  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: C**

Warm Standby mantiene una versión reducida del entorno siempre activa. Con replicación continua (RPO < 5 min) y capacidad de escalar rápidamente (RTO < 1 hora), cumple los requisitos con un presupuesto moderado. Pilot Light (B) podría no cumplir el RTO. Multi-Site (D) es más costoso de lo necesario.
</details>

---

### Pregunta 8 - Dominio 2 (Resiliencia)
**Una aplicación web experimenta picos de tráfico cada lunes a las 9 AM cuando los empleados inician sesión. El Auto Scaling actual tarda 5 minutos en agregar instancias, causando degradación. ¿Cómo resolver esto?**

A) Aumentar el máximo de instancias  
B) Usar Scheduled Scaling para agregar instancias antes de las 9 AM  
C) Cambiar a instancias más grandes  
D) Deshabilitar health checks  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

Scheduled Scaling permite pre-escalar antes del pico conocido. Se configura para agregar instancias a las 8:50 AM los lunes, eliminando el tiempo de espera. También se podría usar Predictive Scaling que usa ML para anticipar patrones.
</details>

---

### Pregunta 9 - Dominio 2 (Resiliencia)
**Una aplicación usa un patrón fan-out donde un evento debe ser procesado por múltiples servicios independientes. Si un servicio falla, no debe afectar a los demás. ¿Qué arquitectura implementa esto?**

A) Un solo SQS queue con múltiples consumidores  
B) SNS topic con múltiples SQS queues suscritas  
C) EventBridge con un solo target  
D) Kinesis Data Stream con un solo consumidor  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

El patrón SNS + SQS (fan-out) permite que cada servicio tenga su propia cola SQS suscrita al topic SNS. Si un servicio falla, su cola retiene los mensajes sin afectar a los demás. Cada servicio procesa independientemente a su propio ritmo.
</details>

---

### Pregunta 10 - Dominio 3 (Alto Rendimiento)
**Una aplicación de machine learning necesita almacenamiento con latencia de sub-milisegundos y alto throughput para datasets de entrenamiento de 500 GB. Los datos son temporales y se regeneran fácilmente. ¿Qué almacenamiento es más apropiado?**

A) Amazon EBS gp3  
B) Amazon S3 Standard  
C) EC2 Instance Store  
D) Amazon EFS  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: C**

Instance Store proporciona almacenamiento NVMe directamente conectado al host con la menor latencia posible y alto throughput. Como los datos son temporales y regenerables, la naturaleza efímera del Instance Store no es un problema. Es ideal para caches, buffers y datos temporales de ML.
</details>

---
### Pregunta 11 - Dominio 3 (Alto Rendimiento)
**Una aplicación global necesita servir imágenes y videos a usuarios en 50 países con la menor latencia posible. El contenido se actualiza diariamente. ¿Qué solución es más efectiva?**

A) Replicar el contenido en S3 en todas las regiones  
B) Amazon CloudFront con origen en S3 y TTL de 24 horas  
C) AWS Global Accelerator  
D) Route 53 con routing de latencia  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

CloudFront cachea contenido en 450+ edge locations globales. Con TTL de 24 horas, el contenido se sirve desde el edge más cercano al usuario. Cuando se actualiza, el cache expira y se obtiene la nueva versión. Es más económico y simple que replicar en todas las regiones.
</details>

---

### Pregunta 12 - Dominio 3 (Alto Rendimiento)
**Una aplicación de e-commerce tiene una tabla DynamoDB con millones de productos. Las consultas de búsqueda por categoría son lentas porque requieren un Scan completo. ¿Cómo mejorar el rendimiento?**

A) Aumentar las Read Capacity Units  
B) Crear un Global Secondary Index (GSI) con categoría como partition key  
C) Cambiar a RDS MySQL  
D) Usar S3 Select  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

Un GSI con categoría como partition key permite hacer Query en lugar de Scan, reduciendo dramáticamente la latencia y el consumo de RCUs. Los Scans leen toda la tabla, mientras que Query accede directamente a la partición correcta.
</details>

---

### Pregunta 13 - Dominio 3 (Alto Rendimiento)
**Un cluster de procesamiento HPC necesita comunicación de ultra-baja latencia entre 200 instancias para simulaciones de dinámica de fluidos. ¿Qué configuración maximiza el rendimiento de red?**

A) Instancias en un Spread Placement Group con ENA  
B) Instancias en un Cluster Placement Group con EFA  
C) Instancias en diferentes AZs con Enhanced Networking  
D) Instancias con múltiples ENIs  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

Cluster Placement Group coloca todas las instancias en el mismo rack para mínima latencia. EFA (Elastic Fabric Adapter) proporciona bypass del kernel OS para comunicación MPI directa, esencial para HPC. La combinación ofrece la menor latencia posible entre instancias.
</details>

---

### Pregunta 14 - Dominio 3 (Alto Rendimiento)
**Una aplicación necesita una base de datos que soporte consultas complejas SQL, escalamiento automático de lecturas, y failover en menos de 30 segundos. ¿Qué servicio es más apropiado?**

A) Amazon RDS MySQL Multi-AZ  
B) Amazon Aurora MySQL  
C) Amazon DynamoDB  
D) Amazon Redshift  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

Amazon Aurora ofrece compatibilidad MySQL/PostgreSQL con failover < 30 segundos, hasta 15 Read Replicas con Auto Scaling, y 5x el rendimiento de MySQL estándar. RDS Multi-AZ (A) tiene failover de 60-120 segundos. DynamoDB (C) no soporta SQL. Redshift (D) es para analytics, no transaccional.
</details>

---

### Pregunta 15 - Dominio 3 (Alto Rendimiento)
**Una API REST recibe 10,000 solicitudes por segundo. El 80% de las solicitudes son GET para los mismos 100 productos populares. ¿Cómo reducir la carga en el backend?**

A) Agregar más instancias EC2  
B) Implementar ElastiCache Redis entre la API y la base de datos  
C) Usar un NLB en lugar de ALB  
D) Aumentar el tamaño de la base de datos  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

ElastiCache Redis como capa de cache absorbe el 80% de lecturas repetitivas con latencia de sub-milisegundos. Reduce dramáticamente la carga en la base de datos. El patrón cache-aside (lazy loading) es ideal para este escenario de lecturas frecuentes de datos populares.
</details>

---

### Pregunta 16 - Dominio 4 (Costos)
**Una empresa ejecuta 50 instancias EC2 m5.large 24/7 para una aplicación de producción con carga estable. El contrato es por 3 años. ¿Qué modelo de precios ofrece el mayor ahorro?**

A) On-Demand  
B) Spot Instances  
C) EC2 Instance Savings Plan de 3 años con pago total anticipado  
D) Standard Reserved Instances de 1 año  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: C**

Savings Plan de 3 años con pago total anticipado ofrece el máximo descuento (hasta 72%). La carga es estable y el compromiso de 3 años está alineado con el contrato. Spot (B) no es apropiado para producción 24/7. RI de 1 año (D) ofrece menos descuento que 3 años.
</details>

---
### Pregunta 17 - Dominio 4 (Costos)
**Una empresa tiene 200 TB de datos en S3 Standard que no se han accedido en 6 meses pero deben estar disponibles en caso de auditoría (acceso en minutos). ¿Qué clase de almacenamiento reduce más los costos?**

A) S3 Glacier Deep Archive  
B) S3 Glacier Instant Retrieval  
C) S3 One Zone-IA  
D) S3 Intelligent-Tiering  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

S3 Glacier Instant Retrieval ofrece acceso en milisegundos (cumple "minutos") con un costo de almacenamiento 68% menor que S3 Standard. Deep Archive (A) requiere 12 horas para recuperar. One Zone-IA (C) tiene riesgo de pérdida de AZ. Intelligent-Tiering (D) tiene costo de monitoreo por objeto en 200 TB.
</details>

---

### Pregunta 18 - Dominio 4 (Costos)
**Un equipo de desarrollo usa 10 instancias RDS db.r5.large para testing. Las instancias solo se necesitan de lunes a viernes, 9 AM a 6 PM. ¿Cómo optimizar costos sin cambiar la arquitectura?**

A) Comprar Reserved Instances  
B) Detener las instancias fuera de horario con Lambda + EventBridge  
C) Cambiar a instancias más pequeñas  
D) Migrar a DynamoDB  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

Detener instancias RDS fuera de horario ahorra ~62% (solo se paga almacenamiento cuando están detenidas). Lambda + EventBridge Schedule automatiza el inicio/parada. No requiere cambios en la aplicación ni migración.
</details>

---

### Pregunta 19 - Dominio 4 (Costos)
**Una aplicación transfiere 10 TB mensuales de datos desde instancias EC2 a S3 en la misma región. También transfiere 5 TB a internet para clientes. ¿Cómo reducir costos de transferencia?**

A) Usar S3 Transfer Acceleration  
B) Usar CloudFront para servir datos a clientes y VPC Gateway Endpoint para EC2→S3  
C) Mover todo a una sola AZ  
D) Comprimir datos antes de transferir a internet  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

VPC Gateway Endpoint para S3 es GRATIS (elimina costo de NAT Gateway para EC2→S3). CloudFront tiene costos de egress menores que transferencia directa desde EC2 ($0.085/GB vs $0.09/GB) y además cachea contenido reduciendo transferencias repetidas.
</details>

---

### Pregunta 20 - Dominio 4 (Costos)
**Una empresa procesa trabajos de renderizado de video que tardan 1-2 horas cada uno. Los trabajos pueden reiniciarse si se interrumpen. Actualmente usan instancias On-Demand c5.4xlarge. ¿Cómo reducir costos significativamente?**

A) Cambiar a instancias c5.2xlarge  
B) Usar Spot Instances con diversificación de tipos y checkpointing  
C) Comprar Reserved Instances  
D) Migrar a Lambda  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

Spot Instances ofrecen hasta 90% de ahorro. Los trabajos de renderizado son tolerantes a interrupciones (pueden reiniciarse). Diversificar tipos de instancia (c5.4xlarge, c5a.4xlarge, c4.4xlarge) reduce el riesgo de interrupción. Checkpointing permite reanudar desde el último punto guardado.
</details>

---

### Pregunta 21 - Dominio 1 (Seguridad)
**Una aplicación móvil necesita que los usuarios se autentiquen con Google/Facebook y luego accedan a recursos AWS (S3, DynamoDB) con permisos específicos según su rol. ¿Qué servicio implementa esto?**

A) IAM Users para cada usuario móvil  
B) Amazon Cognito (User Pool + Identity Pool)  
C) IAM Identity Center  
D) AWS STS directamente  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

Cognito User Pool maneja la autenticación (login con Google/Facebook). Cognito Identity Pool proporciona credenciales AWS temporales con roles IAM específicos. Es la solución diseñada para aplicaciones móviles y web con millones de usuarios.
</details>

---

### Pregunta 22 - Dominio 2 (Resiliencia)
**Una aplicación stateless en EC2 detrás de un ALB necesita mantener las sesiones de usuario. Si una instancia falla, el usuario no debe perder su sesión. ¿Cuál es la mejor solución?**

A) Sticky sessions en el ALB  
B) Almacenar sesiones en ElastiCache Redis  
C) Almacenar sesiones en el disco local de EC2  
D) Usar cookies del navegador para todo el estado  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

ElastiCache Redis como almacén de sesiones externo permite que cualquier instancia acceda a la sesión del usuario. Si una instancia falla, otra puede continuar sirviendo al usuario sin pérdida de sesión. Sticky sessions (A) no protegen contra fallo de instancia.
</details>

---

### Pregunta 23 - Dominio 3 (Alto Rendimiento)
**Una aplicación necesita procesar 1 millón de eventos por segundo de dispositivos IoT y almacenarlos para análisis posterior. ¿Qué arquitectura soporta este throughput?**

A) API Gateway → Lambda → RDS  
B) Kinesis Data Streams → Kinesis Data Firehose → S3  
C) SQS Standard → EC2 → S3  
D) SNS → Lambda → DynamoDB  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

Kinesis Data Streams puede ingerir millones de eventos por segundo con múltiples shards. Firehose entrega automáticamente a S3 con buffering y compresión. Es la arquitectura diseñada para streaming de alto volumen. SQS (C) tiene menor throughput. API Gateway (A) tiene límites de throttling.
</details>

---
### Pregunta 24 - Dominio 4 (Costos)
**Una empresa tiene múltiples cuentas AWS. Algunas cuentas tienen Reserved Instances sin usar mientras otras pagan On-Demand por el mismo tipo de instancia. ¿Cómo optimizar?**

A) Cancelar las Reserved Instances  
B) Habilitar RI Sharing en AWS Organizations con Consolidated Billing  
C) Crear nuevas RIs en cada cuenta  
D) Migrar todas las cargas a una sola cuenta  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

Con Consolidated Billing en AWS Organizations, las Reserved Instances se comparten automáticamente entre todas las cuentas de la organización. Las RIs sin usar en una cuenta se aplican a instancias On-Demand del mismo tipo en otras cuentas, maximizando el ahorro.
</details>

---

### Pregunta 25 - Dominio 1 (Seguridad)
**Una empresa necesita que las instancias EC2 en subnets privadas accedan a internet para descargar actualizaciones, pero no deben ser accesibles desde internet. ¿Qué componente permite esto?**

A) Internet Gateway  
B) NAT Gateway en la subnet pública  
C) VPC Peering  
D) AWS PrivateLink  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

NAT Gateway permite tráfico saliente (outbound) desde subnets privadas a internet, pero no permite conexiones entrantes (inbound) desde internet. Se coloca en la subnet pública y las route tables de las subnets privadas dirigen el tráfico 0.0.0.0/0 al NAT Gateway.
</details>

---

### Pregunta 26 - Dominio 2 (Resiliencia)
**Una aplicación usa Route 53 con un registro que apunta a un ALB en us-east-1. Se necesita failover automático a eu-west-1 si us-east-1 falla. ¿Qué configuración de Route 53 implementa esto?**

A) Simple routing con múltiples valores  
B) Failover routing con health checks  
C) Weighted routing 50/50  
D) Geolocation routing  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

Failover routing con health checks configura un registro primario (us-east-1) y uno secundario (eu-west-1). Route 53 monitorea la salud del primario y automáticamente dirige tráfico al secundario cuando el health check falla. Es el patrón estándar para DR active-passive.
</details>

---

### Pregunta 27 - Dominio 3 (Alto Rendimiento)
**Una aplicación serverless usa API Gateway + Lambda + DynamoDB. Durante picos, Lambda experimenta throttling por alcanzar el límite de concurrencia. ¿Cómo resolver esto sin cambiar la arquitectura?**

A) Aumentar la memoria de Lambda  
B) Solicitar aumento del límite de concurrencia y usar Reserved Concurrency  
C) Cambiar a EC2  
D) Usar Provisioned Concurrency para todas las funciones  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

Solicitar un aumento del límite de concurrencia regional (Service Quotas) y configurar Reserved Concurrency para funciones críticas garantiza capacidad. Provisioned Concurrency (D) elimina cold starts pero tiene costo adicional y no es necesario para todas las funciones.
</details>

---

### Pregunta 28 - Dominio 4 (Costos)
**Una startup tiene tráfico web muy variable: 100 usuarios/hora normalmente pero 10,000 usuarios/hora durante campañas de marketing (2-3 veces al mes, impredecible). ¿Qué arquitectura es más costo-efectiva?**

A) EC2 Auto Scaling con instancias On-Demand  
B) Arquitectura serverless: CloudFront + API Gateway + Lambda + DynamoDB  
C) EC2 con Reserved Instances para capacidad máxima  
D) ECS con Fargate y capacidad fija  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

La arquitectura serverless escala automáticamente de 0 a miles de solicitudes y cobra solo por uso. Con tráfico variable e impredecible, pagar solo cuando hay tráfico es óptimo. RIs (C) desperdician capacidad el 90% del tiempo. EC2 ASG (A) tiene costo base mínimo. Fargate fijo (D) no escala a cero.
</details>

---

### Pregunta 29 - Dominio 1 (Seguridad)
**Una empresa necesita almacenar datos de tarjetas de crédito cumpliendo PCI-DSS. Los datos deben estar cifrados en reposo y en tránsito, con acceso auditado. ¿Qué combinación de servicios es apropiada? (Selecciona DOS)**

A) S3 con SSE-KMS + Bucket Policy restrictiva  
B) DynamoDB con cifrado por defecto  
C) CloudTrail para auditar acceso a KMS  
D) Almacenar en texto plano en EBS  
E) RDS con TDE y conexiones SSL  

<details>
<summary>Ver Respuesta</summary>

**Respuestas: A y C** (o E y C)

Para PCI-DSS se necesita:
- Cifrado en reposo: SSE-KMS (A) o RDS con TDE (E)
- Cifrado en tránsito: HTTPS/SSL
- Auditoría de acceso: CloudTrail (C) registra cada uso de claves KMS
- Control de acceso: Bucket Policies o IAM restrictivas

DynamoDB (B) tiene cifrado pero no el nivel de control requerido. Texto plano (D) viola PCI-DSS.
</details>

---

### Pregunta 30 - Dominio 2 (Resiliencia)
**Una aplicación crítica necesita una base de datos con RPO de 0 (sin pérdida de datos) y RTO menor a 1 minuto. La base de datos debe soportar lecturas globales con baja latencia. ¿Qué solución cumple todos los requisitos?**

A) RDS Multi-AZ con Read Replicas cross-region  
B) Aurora Global Database con write forwarding  
C) DynamoDB Global Tables  
D) RDS con backups cada 5 minutos  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: C**

DynamoDB Global Tables proporciona:
- RPO ~0: replicación activa-activa entre regiones
- RTO < 1 minuto: no hay failover, todas las regiones son activas
- Lecturas locales en cada región con baja latencia
- Escrituras en cualquier región

Aurora Global Database (B) tiene RPO de ~1 segundo y RTO de ~1 minuto, pero no es activa-activa para escrituras. RDS Multi-AZ (A) no proporciona lecturas globales con baja latencia.
</details>

---

## 📊 Tabla de Respuestas

| # | Respuesta | Dominio |
|---|-----------|---------|
| 1 | B | Seguridad |
| 2 | C | Seguridad |
| 3 | B | Seguridad |
| 4 | B | Seguridad |
| 5 | C | Resiliencia |
| 6 | B | Resiliencia |
| 7 | C | Resiliencia |
| 8 | B | Resiliencia |
| 9 | B | Resiliencia |
| 10 | C | Alto Rendimiento |
| 11 | B | Alto Rendimiento |
| 12 | B | Alto Rendimiento |
| 13 | B | Alto Rendimiento |
| 14 | B | Alto Rendimiento |
| 15 | B | Alto Rendimiento |
| 16 | C | Costos |
| 17 | B | Costos |
| 18 | B | Costos |
| 19 | B | Costos |
| 20 | B | Costos |
| 21 | B | Seguridad |
| 22 | B | Resiliencia |
| 23 | B | Alto Rendimiento |
| 24 | B | Costos |
| 25 | B | Seguridad |
| 26 | B | Resiliencia |
| 27 | B | Alto Rendimiento |
| 28 | B | Costos |
| 29 | A,C | Seguridad |
| 30 | C | Resiliencia |

---

## Evaluación

- **27-30 correctas (90-100%)**: Excelente, estás listo para el examen
- **22-26 correctas (73-87%)**: Bien, repasa las áreas donde fallaste
- **18-21 correctas (60-70%)**: Necesitas más estudio, enfócate en dominios débiles
- **< 18 correctas (<60%)**: Requiere estudio adicional significativo
