# Dominio 4: Facturación, precios y soporte (12 %)

Cerca de 8 preguntas. Es el dominio más pequeño, pero muy "puntuable" porque es memorizable.

## 4.1 Modelos de precios
- **Pago por uso** (pay-as-you-go), **pagar menos al reservar**, **pagar menos al usar más** (precios por volumen).
- **Capa gratuita (Free Tier)**: tres tipos: siempre gratis, 12 meses gratis, pruebas de corta duración.

### Opciones de compra de EC2
| Opción | Ideal para | Descuento |
|---|---|---|
| **On-Demand** | Cargas cortas, impredecibles | Ninguno, sin compromiso |
| **Savings Plans** | Uso constante, compromiso de $/hora a 1 o 3 años | Hasta ~72 % |
| **Reserved Instances** | Uso estable de una configuración concreta, 1 o 3 años | Hasta ~72 % |
| **Spot** | Cargas tolerantes a interrupciones | Hasta ~90 % |
| **Dedicated Hosts** | Licencias por socket/núcleo, cumplimiento | Según opción |
| **Capacity Reservations** | Garantizar capacidad en una AZ | Sin descuento por sí solo |

### Qué influye en el costo
- Cómputo (tipo, tiempo), almacenamiento (volumen y clase), **transferencia de datos**.
- **Entrada de datos desde Internet: gratis**. **Salida a Internet y entre Regiones: se cobra**. Entre AZ: puede cobrarse.

## 4.2 Administración de costos
| Herramienta | Uso |
|---|---|
| **AWS Pricing Calculator** | Estimar el costo antes de desplegar |
| **AWS Cost Explorer** | Analizar costos y uso históricos, proyecciones |
| **AWS Budgets** | Presupuestos y alertas |
| **Cost and Usage Report (CUR)** | Datos más detallados de costo y uso |
| **Cost Allocation Tags** | Etiquetas para asignar costos a proyectos o equipos |
| **AWS Cost Anomaly Detection** | Detecta gastos inusuales |
| **Compute Optimizer** | Recomendaciones de dimensionamiento |
| **Trusted Advisor** | Chequeos de optimización de costos y más |

## 4.3 AWS Organizations y facturación consolidada
- Una **cuenta de administración (pagadora)** con varias cuentas miembro.
- **Una sola factura**, **descuentos por volumen** combinados y **Savings Plans / RI compartidos**.
- **SCP** para limitar permisos. Organizaciones por unidad (OU).

## 4.4 Planes de AWS Support
| Plan | Destaca |
|---|---|
| **Basic** (gratis) | Atención al cliente 24/7 (cuenta y facturación), documentación, Health Dashboard, chequeos básicos de Trusted Advisor |
| **Developer** | Soporte técnico en horario laboral por correo, una persona |
| **Business** (y Business+) | Soporte técnico 24/7, **todos los chequeos de Trusted Advisor**, tiempo de respuesta de 1 hora para sistemas de producción caídos |
| **Enterprise On-Ramp** | TAM por pool de gestores, revisiones de arquitectura |
| **Enterprise** | **Technical Account Manager (TAM)** designado, respuesta de 15 minutos para sistemas críticos de negocio |

> Nota: AWS ha renombrado y reorganizado sus planes de Support en los últimos años. Confirma los nombres y beneficios vigentes en la guía oficial del examen y en la página de AWS Support antes de presentar.

Pista: "**TAM designado**" = Enterprise. "**Todos los chequeos de Trusted Advisor + 24/7**" = Business o superior.

## 4.5 Recursos adicionales
- **AWS Marketplace**: software de terceros. **AWS Partner Network (APN)**. **re:Post** (comunidad), **Knowledge Center**, **Well-Architected**, **Professional Services**, **IQ**.

## Trampas frecuentes
- Pricing Calculator = **antes** (estimar). Cost Explorer = **después** (analizar).
- Budgets = **alertas**. Cost Explorer = **análisis**.
- Spot = barato pero **interrumpible**. Savings Plans / RI = compromiso, uso estable.
- Datos **entrantes** a AWS = gratis.

## Checklist del dominio
- [ ] Elijo la opción de compra de EC2 según el caso
- [ ] Distingo Pricing Calculator, Cost Explorer y Budgets
- [ ] Explico facturación consolidada
- [ ] Sé qué incluye cada plan de Support
