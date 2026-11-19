# Dominio 1: Conceptos de la nube (24 %)

Cerca de 16 de las 65 preguntas. Es el dominio "de vocabulario": si dominas los términos, son puntos fáciles.

## 1.1 Valor de la nube de AWS

### Seis ventajas de la computación en la nube
| Ventaja | Idea clave |
|---|---|
| Cambiar CapEx por OpEx | No compras hardware por adelantado, pagas lo que consumes |
| Economías de escala | AWS agrega el uso de todos sus clientes y baja los precios |
| Dejar de adivinar la capacidad | Escalas hacia arriba o abajo según la demanda real |
| Mayor velocidad y agilidad | Recursos en minutos, no en semanas |
| Dejar de gastar en operar centros de datos | Te enfocas en tu negocio, no en racks y cableado |
| Despliegue global en minutos | Varias Regiones con pocos clics |

### Conceptos que se confunden
- **Elasticidad**: crecer y reducir recursos *automáticamente* según demanda.
- **Escalabilidad**: capacidad de manejar más carga (vertical: más grande; horizontal: más instancias).
- **Alta disponibilidad**: el sistema sigue funcionando ante fallos (varias AZ).
- **Tolerancia a fallos**: sigue operando aun cuando falla un componente, sin interrupción.
- **Agilidad**: velocidad para experimentar y lanzar.

## 1.2 Infraestructura global de AWS
- **Región**: ubicación geográfica con varias AZ. Eliges Región por: cumplimiento y residencia de datos, latencia, costo y disponibilidad de servicios.
- **Zona de Disponibilidad (AZ)**: uno o más centros de datos con energía, red y refrigeración redundantes. Aisladas entre sí, conectadas con baja latencia.
- **Edge locations**: sitios de la red de entrega de contenido (CloudFront) y Route 53, más cerca del usuario.
- **Local Zones / Wavelength / Outposts**: extienden AWS más cerca de usuarios o a tu centro de datos.
- Regla de oro: para **alta disponibilidad** usa **varias AZ**; para **recuperación ante desastres** o latencia global usa **varias Regiones**.

## 1.3 AWS Well-Architected Framework (6 pilares)
1. **Operational Excellence** (excelencia operativa): ejecutar y monitorear, mejorar procesos.
2. **Security** (seguridad): proteger datos y sistemas.
3. **Reliability** (fiabilidad): recuperarse de fallos, cumplir la demanda.
4. **Performance Efficiency** (eficiencia del rendimiento): usar recursos de forma eficiente.
5. **Cost Optimization** (optimización de costos): evitar gasto innecesario.
6. **Sustainability** (sostenibilidad): minimizar el impacto ambiental.

Herramienta: **AWS Well-Architected Tool**. Truco: "Scalability" NO es un pilar.

### Principios de diseño en la nube
Diseñar para fallos, desacoplar componentes, implementar elasticidad, tratar la infraestructura como código, pensar en seguridad en cada capa.

## 1.4 AWS Cloud Adoption Framework (AWS CAF)
Seis perspectivas: **Business, People, Governance** (negocio) y **Platform, Security, Operations** (técnicas).

## 1.5 Estrategias de migración (las "6 R")
| Estrategia | Significado |
|---|---|
| Rehost | Lift-and-shift, mover sin cambios |
| Replatform | Pequeños ajustes sin rediseñar (lift-tinker-and-shift) |
| Repurchase | Cambiar a SaaS / otro producto |
| Refactor / Re-architect | Rediseñar para aprovechar la nube |
| Retire | Apagar lo que ya no se necesita |
| Retain | Dejar donde está por ahora |

Servicios de migración: **AWS Migration Hub**, **Application Migration Service**, **Database Migration Service (DMS)**, **Snow Family** (transporte físico de datos).

## 1.6 Modelos de implementación y de servicio
- **Nube pública**, **privada (on-premises)** e **híbrida**.
- **IaaS** (EC2, VPC, EBS): administras SO y aplicaciones.
- **PaaS** (Elastic Beanstalk, RDS): administras aplicación y datos.
- **SaaS** (Amazon Chime, WorkMail): usas el software terminado.

## 1.7 Economía de la nube
- **TCO** (costo total de propiedad): comparar costo on-premises vs nube (herramientas: Pricing Calculator, Migration Evaluator).
- **Costos de licencias, mano de obra y tiempo de comercialización** forman parte de la comparación.
- El costo operativo baja al usar servicios administrados y serverless.

## Checklist del dominio
- [ ] Puedo nombrar las 6 ventajas de la nube
- [ ] Distingo Región, AZ y edge location
- [ ] Recito los 6 pilares Well-Architected y las 6 perspectivas CAF
- [ ] Sé qué es cada "R" de migración
- [ ] Diferencio elasticidad, escalabilidad y alta disponibilidad
