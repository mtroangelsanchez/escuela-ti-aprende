# 📅 Cronograma de Estudio - 8 Semanas

## Visión General

Este plan de estudio está diseñado para 8 semanas, dedicando **2-3 horas diarias** de lunes a viernes y **4-5 horas** los fines de semana.

```
┌─────────────────────────────────────────────────────────────┐
│              DISTRIBUCIÓN POR SEMANA                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Sem 1-2: Dominio 1 - Arquitecturas Seguras (30%)          │
│  Sem 3-4: Dominio 2 - Arquitecturas Resilientes (26%)      │
│  Sem 5-6: Dominio 3 - Alto Rendimiento (24%)               │
│  Sem 7:   Dominio 4 - Optimización de Costos (20%)         │
│  Sem 8:   Repaso General + Exámenes de Práctica            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Semana 1: Seguridad - Fundamentos

### Lunes - IAM Fundamentals
- [ ] Usuarios, Grupos, Roles y Políticas
- [ ] Principio de menor privilegio
- [ ] Políticas basadas en identidad vs basadas en recurso
- [ ] Práctica: Crear políticas IAM en la consola

### Martes - IAM Avanzado
- [ ] AWS Organizations y SCPs
- [ ] IAM Identity Center (SSO)
- [ ] Federación de identidades (SAML 2.0, Web Identity)
- [ ] Cross-account access con roles

### Miércoles - Redes y VPC
- [ ] Diseño de VPC (subnets públicas/privadas)
- [ ] Internet Gateway, NAT Gateway
- [ ] Route Tables
- [ ] Práctica: Crear VPC con subnets multi-AZ

### Jueves - Seguridad de Red
- [ ] Security Groups (stateful)
- [ ] Network ACLs (stateless)
- [ ] VPC Flow Logs
- [ ] Bastion Hosts / Session Manager

### Viernes - Conectividad
- [ ] VPC Peering
- [ ] Transit Gateway
- [ ] VPN Site-to-Site
- [ ] AWS PrivateLink y VPC Endpoints

### Fin de Semana
- [ ] Repaso de la semana
- [ ] Labs prácticos en AWS Free Tier
- [ ] 10 preguntas de práctica de Dominio 1
- [ ] Crear flashcards de conceptos clave

---

## Semana 2: Seguridad - Avanzado

### Lunes - Cifrado
- [ ] KMS (CMK, AWS Managed, Custom Key Stores)
- [ ] Envelope Encryption
- [ ] CloudHSM
- [ ] Cifrado en reposo vs en tránsito

### Martes - Gestión de Secretos
- [ ] Secrets Manager (rotación automática)
- [ ] Parameter Store (Standard vs Advanced)
- [ ] Certificate Manager (ACM)
- [ ] Comparación de servicios

### Miércoles - Protección de Aplicaciones
- [ ] AWS WAF (reglas, Web ACLs)
- [ ] AWS Shield (Standard vs Advanced)
- [ ] Amazon Cognito (User Pools, Identity Pools)
- [ ] API Gateway (autorización, throttling)

### Jueves - Monitoreo y Auditoría
- [ ] CloudTrail (Management vs Data Events)
- [ ] AWS Config (reglas, remediación)
- [ ] GuardDuty (detección de amenazas)
- [ ] Security Hub (vista centralizada)

### Viernes - Cumplimiento
- [ ] Amazon Inspector
- [ ] AWS Artifact
- [ ] Macie (datos sensibles en S3)
- [ ] Detective (investigación de seguridad)

### Fin de Semana
- [ ] Examen de práctica Dominio 1 (20 preguntas)
- [ ] Revisar respuestas incorrectas
- [ ] Labs: Configurar WAF, crear KMS keys
- [ ] Documentar áreas débiles

---

## Semana 3: Resiliencia - Fundamentos

### Lunes - Elastic Load Balancing
- [ ] ALB (routing basado en contenido, target groups)
- [ ] NLB (TCP/UDP, IPs estáticas)
- [ ] GWLB (appliances de red)
- [ ] Health checks y cross-zone load balancing

### Martes - Auto Scaling
- [ ] Launch Templates
- [ ] Políticas de escalamiento (Target Tracking, Step, Scheduled)
- [ ] Predictive Scaling
- [ ] Lifecycle Hooks

### Miércoles - Desacoplamiento
- [ ] Amazon SQS (Standard vs FIFO)
- [ ] Dead Letter Queues
- [ ] Amazon SNS (topics, subscriptions)
- [ ] Fan-out pattern (SNS + SQS)

### Jueves - Event-Driven Architecture
- [ ] Amazon EventBridge
- [ ] AWS Step Functions
- [ ] Patrones de integración
- [ ] Saga pattern para transacciones distribuidas

### Viernes - Streaming
- [ ] Kinesis Data Streams
- [ ] Kinesis Data Firehose
- [ ] Kinesis vs SQS (cuándo usar cada uno)
- [ ] Amazon MSK (Kafka)

### Fin de Semana
- [ ] Labs: Crear ALB + ASG + SQS pipeline
- [ ] Practicar arquitecturas desacopladas
- [ ] 10 preguntas de práctica
- [ ] Diagramar arquitecturas en papel

---

## Semana 4: Resiliencia - Alta Disponibilidad y DR

### Lunes - RDS Alta Disponibilidad
- [ ] Multi-AZ deployments
- [ ] Read Replicas (same region, cross-region)
- [ ] Aurora (cluster, Global Database)
- [ ] Aurora Serverless

### Martes - Almacenamiento Resiliente
- [ ] S3 (durabilidad, versionado, replicación)
- [ ] S3 Cross-Region Replication
- [ ] EBS Snapshots (cross-region copy)
- [ ] EFS (Multi-AZ)

### Miércoles - Route 53
- [ ] Políticas de routing (Failover, Weighted, Latency)
- [ ] Health Checks
- [ ] DNS Failover
- [ ] Alias records vs CNAME

### Jueves - Disaster Recovery
- [ ] Estrategias: Backup/Restore, Pilot Light, Warm Standby, Multi-Site
- [ ] RPO vs RTO
- [ ] AWS Elastic Disaster Recovery
- [ ] Runbooks y playbooks

### Viernes - Backup y Recuperación
- [ ] AWS Backup (políticas centralizadas)
- [ ] S3 Lifecycle Policies
- [ ] Vault Lock (WORM)
- [ ] Cross-account backup

### Fin de Semana
- [ ] Examen de práctica Dominio 2 (20 preguntas)
- [ ] Lab: Configurar RDS Multi-AZ + Read Replica
- [ ] Lab: Configurar S3 CRR
- [ ] Revisar y documentar áreas débiles

---

## Semana 5: Alto Rendimiento - Cómputo y Almacenamiento

### Lunes - EC2 Avanzado
- [ ] Familias de instancias (C, M, R, P, I, Hpc)
- [ ] Placement Groups (Cluster, Spread, Partition)
- [ ] Enhanced Networking (ENA, EFA)
- [ ] Instancias Graviton (ARM)

### Martes - Contenedores
- [ ] ECS (Tasks, Services, Clusters)
- [ ] EKS (Kubernetes en AWS)
- [ ] Fargate (serverless containers)
- [ ] ECR (Container Registry)

### Miércoles - Serverless
- [ ] Lambda (configuración, layers, concurrencia)
- [ ] API Gateway (REST, HTTP, WebSocket)
- [ ] Step Functions (orquestación)
- [ ] AppSync (GraphQL)

### Jueves - Almacenamiento de Alto Rendimiento
- [ ] EBS (gp3, io2 Block Express)
- [ ] Instance Store (efímero, alto IOPS)
- [ ] EFS (modos de rendimiento)
- [ ] FSx (Lustre para HPC, Windows)

### Viernes - S3 Performance
- [ ] Multipart Upload
- [ ] S3 Transfer Acceleration
- [ ] Byte-Range Fetches
- [ ] S3 Select y Glacier Select

### Fin de Semana
- [ ] Labs: Desplegar aplicación en ECS Fargate
- [ ] Labs: Crear Lambda con API Gateway
- [ ] Comparar rendimiento de volúmenes EBS
- [ ] 10 preguntas de práctica

---

## Semana 6: Alto Rendimiento - Bases de Datos y Red

### Lunes - Bases de Datos Relacionales
- [ ] Aurora (rendimiento, escalamiento)
- [ ] RDS Proxy (connection pooling)
- [ ] Performance Insights
- [ ] Redshift (data warehouse, Spectrum)

### Martes - Bases de Datos NoSQL
- [ ] DynamoDB (particiones, índices, DAX)
- [ ] DynamoDB Global Tables
- [ ] ElastiCache (Redis vs Memcached)
- [ ] DocumentDB, Neptune, Timestream

### Miércoles - Caching
- [ ] CloudFront (distribuciones, behaviors)
- [ ] ElastiCache (estrategias: lazy loading, write-through)
- [ ] DAX (DynamoDB Accelerator)
- [ ] API Gateway caching

### Jueves - Redes de Alto Rendimiento
- [ ] CloudFront (Lambda@Edge, Functions)
- [ ] Global Accelerator
- [ ] Direct Connect (dedicado, hosted)
- [ ] VPC Endpoints (Gateway vs Interface)

### Viernes - Transferencia de Datos
- [ ] AWS DataSync
- [ ] AWS Transfer Family (SFTP, FTPS)
- [ ] Snow Family (Snowcone, Snowball, Snowmobile)
- [ ] Migration Hub

### Fin de Semana
- [ ] Examen de práctica Dominio 3 (20 preguntas)
- [ ] Lab: Configurar CloudFront + S3
- [ ] Lab: Crear tabla DynamoDB con DAX
- [ ] Revisar áreas débiles

---

## Semana 7: Optimización de Costos

### Lunes - Cómputo Cost-Effective
- [ ] Modelos de precios EC2 (On-Demand, RI, Spot, Savings Plans)
- [ ] Spot Instances (estrategias, Spot Fleet)
- [ ] Auto Scaling para optimización de costos
- [ ] Graviton instances (20% más baratas)

### Martes - Almacenamiento Cost-Effective
- [ ] S3 Storage Classes y Lifecycle Policies
- [ ] S3 Intelligent-Tiering
- [ ] EBS optimization (gp3 vs gp2, eliminar huérfanos)
- [ ] S3 Storage Lens

### Miércoles - Base de Datos y Red
- [ ] RDS Reserved Instances
- [ ] Aurora Serverless (escala a cero)
- [ ] DynamoDB (On-Demand vs Provisioned)
- [ ] Costos de transferencia de datos

### Jueves - Herramientas de Gestión
- [ ] AWS Cost Explorer
- [ ] AWS Budgets (alertas y acciones)
- [ ] Compute Optimizer
- [ ] Trusted Advisor (cost optimization checks)

### Viernes - Estrategias Organizacionales
- [ ] Consolidated Billing
- [ ] Cost Allocation Tags
- [ ] AWS Organizations (RI sharing)
- [ ] Well-Architected Framework (pilar de costos)

### Fin de Semana
- [ ] Examen de práctica Dominio 4 (20 preguntas)
- [ ] Calcular costos de arquitecturas ejemplo
- [ ] Usar AWS Pricing Calculator
- [ ] Identificar oportunidades de ahorro en labs anteriores

---

## Semana 8: Repaso Final y Exámenes

### Lunes - Repaso Dominio 1 y 2
- [ ] Revisar notas y flashcards
- [ ] Repasar preguntas fallidas
- [ ] Enfocarse en áreas débiles identificadas
- [ ] 20 preguntas mixtas

### Martes - Repaso Dominio 3 y 4
- [ ] Revisar notas y flashcards
- [ ] Repasar preguntas fallidas
- [ ] Enfocarse en áreas débiles identificadas
- [ ] 20 preguntas mixtas

### Miércoles - Examen de Práctica Completo #1
- [ ] Simular condiciones de examen (130 min, 65 preguntas)
- [ ] Sin interrupciones ni consultas
- [ ] Registrar tiempo por pregunta
- [ ] Revisar todas las respuestas

### Jueves - Análisis y Repaso
- [ ] Analizar resultados del examen de práctica
- [ ] Identificar patrones de error
- [ ] Estudiar temas donde fallaste
- [ ] Crear resumen de "últimos minutos"

### Viernes - Examen de Práctica Completo #2
- [ ] Segundo examen de práctica completo
- [ ] Enfocarse en velocidad y precisión
- [ ] Objetivo: >80% de aciertos
- [ ] Revisar respuestas

### Fin de Semana - Día Antes del Examen
- [ ] Repaso ligero (no estudiar intensamente)
- [ ] Revisar resumen de "últimos minutos"
- [ ] Preparar documentos de identificación
- [ ] Descansar bien la noche anterior
- [ ] Verificar hora y lugar del examen

---

## 📊 Métricas de Progreso

### Objetivos Semanales

| Semana | Dominio | Meta de Preguntas | Puntaje Objetivo |
|--------|---------|-------------------|------------------|
| 1 | Seguridad (Básico) | 20 preguntas | >60% |
| 2 | Seguridad (Avanzado) | 30 preguntas | >70% |
| 3 | Resiliencia (Básico) | 20 preguntas | >60% |
| 4 | Resiliencia (Avanzado) | 30 preguntas | >70% |
| 5 | Alto Rendimiento (Básico) | 20 preguntas | >60% |
| 6 | Alto Rendimiento (Avanzado) | 30 preguntas | >70% |
| 7 | Costos | 30 preguntas | >70% |
| 8 | Todos | 130 preguntas (2 exámenes) | >80% |

### Registro de Estudio

```
Semana: ___
Horas estudiadas: ___/20
Preguntas respondidas: ___
Porcentaje de aciertos: ___%
Áreas débiles identificadas:
1. _______________
2. _______________
3. _______________
```

---

## 💡 Consejos para el Examen

1. **Lee toda la pregunta** antes de ver las opciones
2. **Identifica palabras clave**: "más económico", "menor latencia", "alta disponibilidad"
3. **Elimina opciones incorrectas** primero
4. **Cuidado con distractores**: respuestas que son correctas técnicamente pero no responden la pregunta
5. **Gestiona tu tiempo**: ~2 minutos por pregunta, marca las difíciles para revisar
6. **Busca la respuesta "más correcta"**: a veces hay múltiples opciones válidas
7. **AWS prefiere sus servicios managed** sobre soluciones manuales
8. **Serverless y managed** suelen ser la respuesta para "menor overhead operacional"
9. **Multi-AZ** es la respuesta para alta disponibilidad
10. **El examen no penaliza** respuestas incorrectas - nunca dejes una en blanco
