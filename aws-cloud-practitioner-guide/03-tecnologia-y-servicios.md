# Dominio 3: Tecnología y servicios de la nube (34 %)

Cerca de 22 preguntas. Es el dominio más grande: aprende **para qué sirve cada servicio** en una frase.

## 3.1 Métodos de implementación y operación
- **Consola de administración** (web), **AWS CLI** (línea de comandos), **SDKs** (código), **APIs**.
- **Infraestructura como código**: **CloudFormation** (plantillas), **CDK** (código).
- **Elastic Beanstalk**: sube tu código y AWS aprovisiona el entorno.
- **Systems Manager**: operación y administración de flotas de instancias.

## 3.2 Infraestructura global (repaso)
Regiones, AZ, edge locations; **CloudFront**, **Global Accelerator** (ruta de red optimizada), **Route 53**.

## 3.3 Cómputo
| Servicio | Resumen |
|---|---|
| **EC2** | Servidores virtuales. Tipos: propósito general, optimizadas para cómputo/memoria/almacenamiento, aceleradas |
| **Auto Scaling** | Ajusta cantidad de instancias EC2 automáticamente |
| **Elastic Load Balancing** | Reparte tráfico entre destinos y AZ |
| **Lambda** | Código sin servidores, por eventos, pago por ejecución |
| **ECS / EKS** | Orquestación de contenedores (EKS = Kubernetes) |
| **Fargate** | Contenedores sin administrar servidores |
| **Lightsail** | VPS sencillo, precio predecible |
| **Elastic Beanstalk** | PaaS para aplicaciones web |
| **Batch** | Trabajos por lotes |

**Opciones de compra de EC2**: On-Demand, Savings Plans, Reserved, Spot, Dedicated Hosts/Instances, Capacity Reservations (ver Dominio 4).

## 3.4 Almacenamiento
| Servicio | Tipo | Cuándo |
|---|---|---|
| **S3** | Objetos | Archivos, respaldos, sitios estáticos, data lakes |
| **EBS** | Bloques | Disco de una instancia EC2 |
| **EFS** | Archivos (NFS) | Sistema compartido entre muchas instancias Linux |
| **FSx** | Archivos administrados | Windows File Server, Lustre |
| **S3 Glacier** | Archivo | Datos fríos, bajo costo |
| **Storage Gateway** | Híbrido | Conectar on-premises con almacenamiento en AWS |
| **AWS Backup** | Respaldo centralizado | Políticas de respaldo entre servicios |

### Clases de S3 (de más a menos acceso)
Standard → Intelligent-Tiering → Standard-IA → One Zone-IA → Glacier Instant Retrieval → Glacier Flexible Retrieval → **Glacier Deep Archive** (más barata).

### Transferencia de datos
- **Snow Family** (Snowcone, Snowball): mover grandes volúmenes físicamente.
- **DataSync**: transferencia en línea automatizada. **Transfer Family**: SFTP/FTPS hacia S3 o EFS.

## 3.5 Bases de datos
| Servicio | Tipo |
|---|---|
| **RDS** | Relacional administrado (MySQL, PostgreSQL, MariaDB, Oracle, SQL Server) |
| **Aurora** | Relacional compatible con MySQL/PostgreSQL, alto rendimiento |
| **DynamoDB** | NoSQL clave-valor/documento, serverless, milisegundos |
| **ElastiCache** | Caché en memoria (Redis / Memcached) |
| **Redshift** | Data warehouse analítico |
| **DocumentDB** | Compatible con MongoDB |
| **Neptune** | Grafos |
| **QLDB** | Libro mayor inmutable |
| **DMS** | Migrar bases de datos |

## 3.6 Redes y entrega de contenido
- **VPC**: red virtual aislada. **Subredes** públicas/privadas, **Internet Gateway**, **NAT Gateway**, tablas de rutas.
- **Security groups / NACL**: control de tráfico.
- **VPN Site-to-Site**: túnel cifrado por Internet. **Direct Connect**: enlace dedicado privado.
- **Route 53**: DNS y enrutamiento (latencia, geolocalización, conmutación por error).
- **CloudFront**: CDN. **API Gateway**: crear y publicar APIs. **Transit Gateway**: unir muchas VPC y redes.

## 3.7 Integración de aplicaciones
- **SQS**: cola de mensajes (desacoplar). **SNS**: notificaciones pub/sub. **EventBridge**: bus de eventos. **Step Functions**: orquestar flujos.

## 3.8 Analítica
- **Athena**: consultas SQL sobre S3. **Glue**: ETL. **Kinesis**: datos en streaming. **QuickSight**: BI y dashboards. **EMR**: big data (Hadoop/Spark). **OpenSearch**: búsqueda y logs.

## 3.9 Inteligencia artificial y machine learning
- **SageMaker**: construir, entrenar y desplegar modelos de ML.
- **Bedrock**: modelos de base (IA generativa) vía API.
- **Rekognition**: imágenes y video. **Comprehend**: procesamiento de lenguaje natural. **Lex**: chatbots. **Polly**: texto a voz. **Transcribe**: voz a texto. **Translate**: traducción. **Textract**: extraer texto de documentos. **Kendra**: búsqueda empresarial. **Amazon Q**: asistente generativo.

## 3.10 Gestión y gobierno
- **CloudWatch**, **CloudTrail**, **Config**, **Trusted Advisor**, **Systems Manager**, **Organizations**, **Control Tower**, **Service Catalog**, **Health Dashboard** (estado de servicios y eventos que afectan tu cuenta).

## 3.11 Mapa de memoria rápido
| Necesito... | Servicio |
|---|---|
| Servidor virtual | EC2 |
| Código sin servidor | Lambda |
| Guardar archivos como objetos | S3 |
| Disco para EC2 | EBS |
| Archivos compartidos Linux | EFS |
| BD relacional administrada | RDS / Aurora |
| BD NoSQL serverless | DynamoDB |
| Data warehouse | Redshift |
| Red aislada | VPC |
| DNS | Route 53 |
| CDN | CloudFront |
| Repartir tráfico | ELB |
| Escalar automáticamente | Auto Scaling |
| Cola de mensajes | SQS |
| Notificaciones | SNS |
| Plantillas de infraestructura | CloudFormation |
| Métricas y alarmas | CloudWatch |
| Registro de llamadas API | CloudTrail |
| Conexión dedicada | Direct Connect |

## Checklist del dominio
- [ ] Puedo explicar en una frase cada servicio de la tabla
- [ ] Elijo el tipo de almacenamiento correcto (objeto/bloque/archivo)
- [ ] Distingo RDS, Aurora, DynamoDB, Redshift y ElastiCache
- [ ] Conozco SQS vs SNS vs EventBridge
- [ ] Sé cuándo usar Bedrock vs SageMaker vs servicios de IA preentrenados
