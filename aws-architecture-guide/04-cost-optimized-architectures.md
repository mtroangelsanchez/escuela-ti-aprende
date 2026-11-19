# Dominio 4: Diseño de Arquitecturas Optimizadas en Costos (20%)

## Índice
1. [Soluciones de Almacenamiento Costo-Efectivas](#1-soluciones-de-almacenamiento-costo-efectivas)
2. [Soluciones de Cómputo Costo-Efectivas](#2-soluciones-de-cómputo-costo-efectivas)
3. [Soluciones de Base de Datos Costo-Efectivas](#3-soluciones-de-base-de-datos-costo-efectivas)
4. [Diseño de Arquitecturas de Red Costo-Efectivas](#4-diseño-de-arquitecturas-de-red-costo-efectivas)
5. [Preguntas de Práctica](#preguntas-de-práctica)

---

## 1. Soluciones de Almacenamiento Costo-Efectivas

### Clases de Almacenamiento S3 - Comparación de Costos

```
┌─────────────────────────────────────────────────────────────┐
│        Costo de Almacenamiento S3 (us-east-1)                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  S3 Standard:           $0.023/GB/mes                       │
│  S3 Standard-IA:        $0.0125/GB/mes + $0.01/1000 GET    │
│  S3 One Zone-IA:        $0.01/GB/mes                        │
│  S3 Glacier Instant:    $0.004/GB/mes                       │
│  S3 Glacier Flexible:   $0.0036/GB/mes                      │
│  S3 Glacier Deep:       $0.00099/GB/mes                     │
│                                                             │
│  Ahorro potencial: hasta 95% con Deep Archive vs Standard  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### S3 Intelligent-Tiering

Mueve automáticamente objetos entre tiers según patrones de acceso:

```
┌─────────────────────────────────────────────────────────────┐
│           S3 Intelligent-Tiering                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Acceso Frecuente (automático)                              │
│       │ 30 días sin acceso                                  │
│       ▼                                                     │
│  Acceso Infrecuente (automático)                            │
│       │ 90 días sin acceso                                  │
│       ▼                                                     │
│  Archive Instant Access (opt-in)                            │
│       │ 90 días sin acceso                                  │
│       ▼                                                     │
│  Archive Access (opt-in, 90-730 días)                       │
│       │ 180 días sin acceso                                 │
│       ▼                                                     │
│  Deep Archive Access (opt-in, 180-730 días)                 │
│                                                             │
│  Costo: $0.0025/1000 objetos monitoreados                  │
│  Sin cargos por retrieval ni transición                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### EBS - Optimización de Costos

| Estrategia | Ahorro | Descripción |
|-----------|--------|-------------|
| gp3 vs gp2 | 20% | gp3 es más barato con mejor rendimiento base |
| Eliminar volúmenes no usados | 100% | Volúmenes huérfanos después de terminar EC2 |
| Snapshots a S3 | Variable | Eliminar snapshots antiguos innecesarios |
| EBS Snapshots Archive | 75% | Para snapshots de acceso infrecuente |

### Comparación de Costos de Almacenamiento

```
┌─────────────────────────────────────────────────────────────┐
│     Decisión de Almacenamiento por Costo                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Datos compartidos entre instancias:                        │
│  ├── EFS: $0.30/GB/mes (Standard)                          │
│  ├── EFS IA: $0.025/GB/mes (Infrequent Access)            │
│  └── FSx Lustre: $0.14/GB/mes (alto rendimiento)          │
│                                                             │
│  Datos de una sola instancia:                               │
│  ├── EBS gp3: $0.08/GB/mes                                │
│  ├── Instance Store: $0 (incluido, efímero)                │
│  └── EBS sc1: $0.015/GB/mes (cold storage)                 │
│                                                             │
│  Datos de objetos:                                          │
│  ├── S3 Standard: $0.023/GB/mes                            │
│  └── S3 Glacier Deep: $0.00099/GB/mes                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Soluciones de Cómputo Costo-Efectivas

### Modelos de Precios EC2

```
┌─────────────────────────────────────────────────────────────┐
│           Modelos de Precios EC2                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  On-Demand ($$$)                                            │
│  ├── Sin compromiso                                        │
│  ├── Pago por segundo (Linux) o por hora (Windows)         │
│  └── Ideal: cargas impredecibles, desarrollo, testing      │
│                                                             │
│  Reserved Instances ($$) - Ahorro hasta 72%                │
│  ├── Standard RI: 1 o 3 años, tipo fijo                   │
│  ├── Convertible RI: cambiar familia/OS/tenancy            │
│  └── Ideal: cargas estables y predecibles                  │
│                                                             │
│  Savings Plans ($$) - Ahorro hasta 72%                     │
│  ├── Compute SP: cualquier instancia, región, OS           │
│  ├── EC2 Instance SP: familia específica en una región     │
│  └── Ideal: flexibilidad con compromiso de gasto           │
│                                                             │
│  Spot Instances ($) - Ahorro hasta 90%                     │
│  ├── Capacidad no utilizada de AWS                         │
│  ├── Puede ser interrumpida con 2 min de aviso            │
│  └── Ideal: batch, CI/CD, big data, stateless             │
│                                                             │
│  Dedicated Hosts ($$$$)                                     │
│  ├── Servidor físico dedicado                              │
│  ├── Licencias por socket/core (BYOL)                      │
│  └── Ideal: cumplimiento, licencias específicas            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Spot Instances - Estrategias

#### Spot Fleet

Combina múltiples tipos de instancias y AZs para maximizar disponibilidad:

```json
{
  "SpotFleetRequestConfig": {
    "AllocationStrategy": "capacityOptimized",
    "LaunchSpecifications": [
      {"InstanceType": "c5.large", "WeightedCapacity": 1},
      {"InstanceType": "c5.xlarge", "WeightedCapacity": 2},
      {"InstanceType": "c4.large", "WeightedCapacity": 1},
      {"InstanceType": "m5.large", "WeightedCapacity": 1}
    ],
    "TargetCapacity": 10,
    "OnDemandTargetCapacity": 2
  }
}
```

#### Estrategias de Asignación

| Estrategia | Descripción |
|-----------|-------------|
| capacityOptimized | Elige pools con más capacidad disponible |
| lowestPrice | Elige el pool más barato |
| diversified | Distribuye entre todos los pools |
| priceCapacityOptimized | Balance entre precio y capacidad |

### AWS Lambda - Optimización de Costos

```
┌─────────────────────────────────────────────────────────────┐
│           Lambda Pricing                                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Costo = Solicitudes + Duración × Memoria                  │
│                                                             │
│  Solicitudes: $0.20 por millón                              │
│  Duración: $0.0000166667 por GB-segundo                    │
│                                                             │
│  Free Tier (siempre):                                       │
│  ├── 1 millón de solicitudes/mes                           │
│  └── 400,000 GB-segundos/mes                               │
│                                                             │
│  Optimización:                                              │
│  ├── Right-size memoria (Power Tuning)                     │
│  ├── Minimizar duración de ejecución                       │
│  ├── Usar ARM (Graviton2) = 20% más barato                │
│  └── Provisioned Concurrency solo si necesario             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Comparación: EC2 vs Lambda vs Fargate

| Factor | EC2 | Lambda | Fargate |
|--------|-----|--------|---------|
| Costo mínimo | ~$3.50/mes (t4g.nano) | $0 (free tier) | ~$10/mes |
| Escala a cero | No | Sí | Sí (con ECS) |
| Duración máx | Ilimitada | 15 minutos | Ilimitada |
| Mejor para | Cargas constantes | Eventos esporádicos | Contenedores |

### AWS Compute Optimizer

- Analiza métricas de CloudWatch
- Recomienda tipos de instancia óptimos
- Identifica instancias sobre-provisionadas
- Soporta: EC2, Auto Scaling, EBS, Lambda

---

## 3. Soluciones de Base de Datos Costo-Efectivas

### Selección por Costo

```
┌─────────────────────────────────────────────────────────────┐
│        Optimización de Costos de Base de Datos                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  RDS:                                                       │
│  ├── Reserved Instances (1-3 años): hasta 69% ahorro      │
│  ├── Aurora Serverless v2: escala a cero                   │
│  ├── Detener instancias dev/test (máx 7 días)             │
│  └── Right-sizing con Performance Insights                 │
│                                                             │
│  DynamoDB:                                                  │
│  ├── On-Demand: tráfico impredecible                       │
│  ├── Provisioned + Auto Scaling: tráfico predecible        │
│  ├── Reserved Capacity: hasta 77% ahorro                   │
│  └── TTL: eliminar datos expirados automáticamente         │
│                                                             │
│  ElastiCache:                                               │
│  ├── Reserved Nodes: hasta 55% ahorro                      │
│  └── Serverless: pago por uso                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Aurora Serverless v2

- Escala automáticamente de 0.5 a 128 ACUs
- Pago por ACU-hora consumida
- Ideal para:
  - Cargas de trabajo variables
  - Entornos de desarrollo/testing
  - Aplicaciones con tráfico intermitente

### DynamoDB - Estrategias de Ahorro

| Estrategia | Ahorro | Descripción |
|-----------|--------|-------------|
| Reserved Capacity | 77% | Compromiso de 1-3 años |
| On-Demand vs Provisioned | Variable | Elegir según patrón de tráfico |
| TTL | 100% datos expirados | Eliminar datos automáticamente |
| Global Secondary Index | Reducir scans | Evitar operaciones Scan costosas |
| DAX | Reducir RCUs | Cache reduce lecturas a DynamoDB |

---

## 4. Diseño de Arquitecturas de Red Costo-Efectivas

### Costos de Transferencia de Datos

```
┌─────────────────────────────────────────────────────────────┐
│           Costos de Transferencia de Datos                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  GRATIS:                                                    │
│  ├── Datos entrantes (ingress) a AWS                       │
│  ├── Datos entre servicios en la misma AZ                  │
│  ├── S3 → CloudFront                                       │
│  └── VPC Endpoint → S3/DynamoDB (Gateway)                  │
│                                                             │
│  COSTO BAJO:                                                │
│  ├── Entre AZs en la misma región: $0.01/GB               │
│  ├── Datos salientes (primeros 10 TB): $0.09/GB           │
│  └── CloudFront → Internet: $0.085/GB                      │
│                                                             │
│  COSTO ALTO:                                                │
│  ├── Entre regiones: $0.02/GB                              │
│  ├── NAT Gateway procesamiento: $0.045/GB                  │
│  └── VPN/Direct Connect: variable                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Estrategias para Reducir Costos de Red

1. **Usar VPC Endpoints** (Gateway) para S3 y DynamoDB - GRATIS
2. **Minimizar tráfico cross-AZ** cuando sea posible
3. **CloudFront** para reducir egress costs
4. **Compresión** de datos antes de transferir
5. **S3 Transfer Acceleration** solo cuando el beneficio justifica el costo
6. **Direct Connect** para grandes volúmenes constantes (vs VPN)

### NAT Gateway vs NAT Instance

| Característica | NAT Gateway | NAT Instance |
|---------------|-------------|--------------|
| Costo fijo | $0.045/hora | Costo de EC2 (t3.nano: ~$0.005/hora) |
| Costo por GB | $0.045/GB | Sin costo adicional |
| Disponibilidad | Alta (managed) | Manual (scripts) |
| Ancho de banda | Hasta 100 Gbps | Depende del tipo de instancia |
| Mantenimiento | AWS | Tú |
| Recomendación | Producción | Dev/Test con bajo tráfico |

### AWS Cost Management Tools

```
┌─────────────────────────────────────────────────────────────┐
│           Herramientas de Gestión de Costos                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  AWS Cost Explorer:                                         │
│  ├── Visualización de gastos históricos y proyectados      │
│  ├── Recomendaciones de Reserved Instances                 │
│  └── Filtros por servicio, cuenta, tag                     │
│                                                             │
│  AWS Budgets:                                               │
│  ├── Alertas cuando se acerca al presupuesto              │
│  ├── Acciones automáticas (detener EC2, aplicar SCPs)     │
│  └── Presupuestos por servicio, cuenta, tag               │
│                                                             │
│  AWS Cost Anomaly Detection:                                │
│  ├── ML para detectar gastos inusuales                    │
│  └── Alertas automáticas                                   │
│                                                             │
│  AWS Pricing Calculator:                                    │
│  └── Estimar costos antes de desplegar                    │
│                                                             │
│  Resource Tagging:                                          │
│  ├── Cost Allocation Tags                                  │
│  └── Asignar costos a proyectos/equipos                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### AWS Organizations - Consolidación de Facturación

- **Consolidated Billing**: Una factura para todas las cuentas
- **Volume Discounts**: Descuentos por volumen agregado
- **RI Sharing**: Compartir Reserved Instances entre cuentas
- **Savings Plans Sharing**: Compartir Savings Plans

---

## Preguntas de Práctica

### Pregunta 1
**Una empresa ejecuta una aplicación web con tráfico predecible de lunes a viernes (9 AM - 6 PM) y mínimo los fines de semana. Actualmente usa 10 instancias On-Demand m5.large 24/7. ¿Cómo optimizar costos?**

A) Cambiar todas a Spot Instances  
B) Comprar 10 Reserved Instances de 3 años  
C) Usar 4 Reserved Instances (carga base) + Auto Scaling con On-Demand para picos  
D) Migrar todo a Lambda  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: C**

La estrategia óptima combina:
- **4 RIs** para la carga base mínima (siempre necesaria): ahorro de ~72%
- **Auto Scaling** con On-Demand para los picos de lunes a viernes
- Scheduled Scaling para reducir a mínimo los fines de semana

Spot (A) no es confiable para aplicaciones web de producción. 10 RIs (B) desperdicia capacidad los fines de semana. Lambda (D) requiere rediseño completo y puede no ser apropiado.
</details>

### Pregunta 2
**Una empresa almacena 100 TB de logs en S3 Standard. Los logs se consultan frecuentemente los primeros 3 días, raramente después, pero deben retenerse 7 años por regulación. ¿Qué reduce más los costos?**

A) Mover todo a S3 Glacier Deep Archive  
B) Usar S3 Intelligent-Tiering  
C) Lifecycle: Standard (3 días) → S3 Glacier Instant (30 días) → Glacier Deep Archive (7 años)  
D) Comprimir los logs y mantener en Standard  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: C**

La política de lifecycle optimiza costos por etapa:
- **3 días en Standard**: acceso frecuente ($0.023/GB)
- **30 días en Glacier Instant**: acceso raro pero inmediato ($0.004/GB)
- **7 años en Deep Archive**: retención regulatoria ($0.00099/GB)

Ahorro estimado: ~95% vs mantener todo en Standard.

Glacier Deep Archive inmediato (A) no permite acceso los primeros 3 días. Intelligent-Tiering (B) tiene costo de monitoreo por objeto y no llega a Deep Archive automáticamente. Compresión (D) ayuda pero no tanto como cambiar de tier.
</details>

### Pregunta 3
**Un equipo de desarrollo tiene 20 instancias RDS en entornos de desarrollo que solo se usan de 8 AM a 6 PM. ¿Cómo reducir costos?**

A) Usar Aurora Serverless v2 para desarrollo  
B) Detener las instancias RDS fuera de horario con Lambda + EventBridge  
C) Cambiar a instancias más pequeñas  
D) Usar DynamoDB en su lugar  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

Detener instancias RDS fuera de horario:
- Lambda programada con EventBridge (cron) para detener a las 6 PM
- Lambda programada para iniciar a las 8 AM
- Ahorro: ~58% (14 horas de 24 no se paga cómputo, solo almacenamiento)
- Sin cambios en la aplicación

Aurora Serverless (A) es buena opción pero requiere migración. Instancias más pequeñas (C) ayuda pero no tanto como detener. DynamoDB (D) requiere rediseño completo.

Nota: Aurora Serverless v2 también es una excelente opción si se puede migrar, ya que escala a casi cero.
</details>

### Pregunta 4
**Una aplicación procesa trabajos batch que tardan 2-4 horas y son tolerantes a interrupciones. Actualmente usa instancias On-Demand c5.2xlarge. ¿Cómo reducir costos significativamente?**

A) Cambiar a instancias más pequeñas  
B) Usar Spot Instances con diversificación de tipos de instancia  
C) Comprar Reserved Instances  
D) Migrar a Lambda  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: B**

Spot Instances son ideales para batch processing:
- Ahorro de hasta 90% vs On-Demand
- Los trabajos batch son tolerantes a interrupciones
- Diversificar tipos (c5.2xlarge, c5a.2xlarge, c4.2xlarge, m5.2xlarge) reduce riesgo de interrupción
- Usar checkpointing para reanudar si se interrumpe

Instancias más pequeñas (A) reduce poco. RIs (C) requieren compromiso y no dan 90% de ahorro. Lambda (D) tiene límite de 15 minutos, insuficiente para 2-4 horas.
</details>

### Pregunta 5
**Una empresa transfiere 50 TB de datos mensuales desde EC2 en us-east-1 a S3 en eu-west-1 para backup. ¿Cómo reducir los costos de transferencia?**

A) Usar S3 Transfer Acceleration  
B) Replicar con S3 Cross-Region Replication y comprimir datos antes  
C) Usar VPC Peering entre regiones  
D) Mantener el backup en la misma región (us-east-1) y usar S3 Glacier  

<details>
<summary>Ver Respuesta</summary>

**Respuesta: D**

Mantener el backup en la misma región elimina costos de transferencia cross-region:
- Transferencia intra-región a S3: GRATIS
- S3 Glacier para backup: $0.0036/GB/mes
- Ahorro en transferencia: 50 TB × $0.02/GB = $1,000/mes

Si se requiere DR multi-region, la opción B con compresión reduce el volumen transferido. Transfer Acceleration (A) acelera pero no reduce costos. VPC Peering (C) no reduce costos de transferencia.
</details>

---

## Resumen de Servicios Clave - Dominio 4

| Categoría | Servicios/Estrategias |
|-----------|-----------|
| Cómputo | Spot, RIs, Savings Plans, Auto Scaling, Lambda, Graviton |
| Almacenamiento | S3 Lifecycle, Intelligent-Tiering, EBS gp3, Glacier |
| Base de Datos | Aurora Serverless, DynamoDB On-Demand, RDS Reserved |
| Red | VPC Endpoints, CloudFront, compresión, misma región |
| Gestión | Cost Explorer, Budgets, Compute Optimizer, Trusted Advisor |
| Organización | Consolidated Billing, RI Sharing, Tags |
