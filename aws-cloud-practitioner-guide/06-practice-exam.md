# Examen de práctica AWS Certified Cloud Practitioner (CLF-C02)

- **Preguntas:** 65 (opción única y respuesta múltiple)
- **Tiempo:** 90 minutos
- **Aprobación:** 700 de 1000 (en este simulacro es una estimación, ver `exam.html`)
- **Distribución:** Dominio 1: 16, Dominio 2: 19, Dominio 3: 22, Dominio 4: 8
- Las preguntas "Seleccione DOS" se califican como todo o nada.
- Responde primero **sin mirar** la clave de respuestas. Para la experiencia con cronómetro usa `exam.html`.

---

### Pregunta 1

Una empresa migra a AWS y quiere dejar de hacer grandes inversiones iniciales en hardware. ¿Qué beneficio económico de la nube describe mejor esto?

- A. Pagar por adelantado toda la capacidad futura
- B. Firmar contratos de hardware a 5 años
- C. Convertir gasto de capital (CapEx) en gasto variable (OpEx)
- D. Eliminar por completo cualquier factura de TI

### Pregunta 2

Una tienda en línea recibe picos de tráfico en Navidad y casi nada el resto del año. Quiere que los recursos crezcan y se reduzcan automáticamente según la demanda. ¿Qué característica de la nube aprovecha?

- A. Alta disponibilidad
- B. Elasticidad
- C. Cumplimiento normativo
- D. Durabilidad

### Pregunta 3

¿Qué es una Zona de Disponibilidad (AZ) de AWS?

- A. Una cuenta de AWS dedicada a un cliente
- B. Uno o más centros de datos discretos con energía, red y conectividad redundantes dentro de una Región
- C. Un país donde AWS tiene oficinas
- D. Una ubicación de caché de CloudFront

### Pregunta 4

Seleccione DOS pilares del AWS Well-Architected Framework. *(seleccione 2)*

- A. Profitability (Rentabilidad)
- B. Reliability (Fiabilidad)
- C. Sustainability (Sostenibilidad)
- D. Scalability (Escalabilidad)

### Pregunta 5

¿Cuál de las siguientes es una perspectiva del AWS Cloud Adoption Framework (AWS CAF)?

- A. Platform (Plataforma)
- B. Hardware
- C. Legal Audit
- D. Marketing

### Pregunta 6

Una empresa mueve sus servidores a AWS sin cambiar el código ni la arquitectura (lift-and-shift). ¿Qué estrategia de migración es?

- A. Repurchase
- B. Retire
- C. Rehost
- D. Refactor

### Pregunta 7

¿Qué servicio permite entregar contenido con baja latencia usando ubicaciones cercanas a los usuarios finales (edge locations)?

- A. AWS Direct Connect
- B. Amazon EBS
- C. AWS Organizations
- D. Amazon CloudFront

### Pregunta 8

Para que una aplicación siga funcionando aunque falle un centro de datos completo, ¿qué debe hacer la empresa?

- A. Usar una sola instancia grande en una AZ
- B. Desactivar Auto Scaling
- C. Copiar los datos a un disco USB
- D. Desplegar la aplicación en varias Zonas de Disponibilidad

### Pregunta 9

¿Qué ventaja de la nube se refiere a que AWS reduce los precios gracias al volumen agregado de uso de todos sus clientes?

- A. Economías de escala
- B. Tolerancia a fallos
- C. Elasticidad
- D. Agilidad

### Pregunta 10

Un equipo de desarrollo necesita probar una idea y quiere aprovisionar servidores en minutos en lugar de semanas. ¿Qué beneficio es?

- A. Hardware dedicado
- B. Agilidad
- C. Soporte Enterprise
- D. Residencia de datos

### Pregunta 11

Una empresa debe elegir una Región de AWS. Seleccione DOS factores que debe considerar. *(seleccione 2)*

- A. Latencia hacia los usuarios finales
- B. Número de empleados de AWS en la Región
- C. El color del logotipo de la Región
- D. Requisitos de residencia de datos y cumplimiento

### Pregunta 12

Una empresa mantiene parte de su infraestructura en su centro de datos y otra parte en AWS, conectadas entre sí. ¿Qué modelo de implementación es?

- A. Multi-cuenta
- B. Híbrido
- C. Nube pública únicamente
- D. Solo on-premises

### Pregunta 13

Una empresa antes compraba servidores calculando la capacidad "a ojo". ¿Qué beneficio de la nube resuelve esto?

- A. Evitar el uso de redes
- B. Eliminar la necesidad de seguridad
- C. Dejar de adivinar la capacidad: se ajusta según la demanda real
- D. Garantizar costos fijos

### Pregunta 14

¿Qué herramienta de AWS permite revisar una carga de trabajo contra las mejores prácticas de los pilares del Well-Architected Framework?

- A. Amazon Inspector
- B. AWS Snowball
- C. AWS Well-Architected Tool
- D. AWS Artifact

### Pregunta 15

Una empresa lanza su aplicación en varios continentes en pocos clics para acercarla a clientes globales. ¿Qué beneficio es?

- A. Contratos a largo plazo
- B. Mayor CapEx
- C. Despliegue global en minutos
- D. Hardware propio

### Pregunta 16

Un sistema diseñado con Reliability en mente debe, ante todo:

- A. Ser el más barato posible sin importar las caídas
- B. Recuperarse de fallos y cumplir con la demanda
- C. Evitar cualquier monitoreo
- D. Tener solo un servidor

### Pregunta 17

En el modelo de responsabilidad compartida, ¿de qué es responsable AWS?

- A. Configurar los grupos de seguridad del cliente
- B. La seguridad física de los centros de datos
- C. Parchear el sistema operativo invitado de las instancias EC2
- D. Gestionar los usuarios de IAM del cliente

### Pregunta 18

Una empresa ejecuta una aplicación en instancias Amazon EC2. ¿Quién es responsable de aplicar los parches del sistema operativo?

- A. El cliente
- B. Ambos por igual
- C. Un tercero designado por AWS
- D. AWS

### Pregunta 19

Con Amazon RDS, ¿qué parte pasa a ser responsabilidad de AWS en comparación con instalar una base de datos en EC2?

- A. Clasificar los datos almacenados
- B. Cifrar los datos del lado del cliente
- C. Definir qué usuarios pueden consultar los datos
- D. Parchear el motor de base de datos y el SO subyacente

### Pregunta 20

¿Cuál es la mejor práctica para el usuario raíz (root) de una cuenta de AWS?

- A. Crear claves de acceso y guardarlas en el código
- B. Usarlo para las tareas diarias
- C. Compartir sus credenciales con el equipo
- D. Activar MFA y evitar usarlo salvo en tareas que lo exijan

### Pregunta 21

Una aplicación en EC2 necesita leer objetos de un bucket de S3 sin guardar claves de acceso en el servidor. ¿Qué debe usarse?

- A. Un rol de IAM asociado a la instancia
- B. Un grupo de seguridad
- C. Las credenciales del usuario raíz
- D. Un archivo con claves en el disco

### Pregunta 22

¿Qué principio indica conceder únicamente los permisos mínimos necesarios para realizar una tarea?

- A. Alta disponibilidad
- B. Escalabilidad horizontal
- C. Elasticidad
- D. Mínimo privilegio

### Pregunta 23

Una empresa quiere asignar los mismos permisos a 50 desarrolladores de forma sencilla. ¿Qué recurso de IAM es el más adecuado?

- A. Una clave de KMS
- B. Un bucket de S3
- C. Una VPC
- D. Un grupo de IAM

### Pregunta 24

Seleccione DOS buenas prácticas de seguridad para el usuario raíz de una cuenta de AWS. *(seleccione 2)*

- A. Usar el root como cuenta de administración diaria
- B. Crear claves de acceso para el root y usarlas en scripts
- C. Habilitar la autenticación multifactor (MFA)
- D. No crear claves de acceso para el root

### Pregunta 25

¿Qué servicio protege las aplicaciones contra ataques de denegación de servicio distribuido (DDoS)?

- A. Amazon Macie
- B. AWS Shield
- C. AWS KMS
- D. AWS Artifact

### Pregunta 26

¿Qué servicio ayuda a bloquear ataques web comunes como inyección SQL y cross-site scripting (XSS)?

- A. AWS WAF
- B. AWS CloudTrail
- C. Amazon Route 53
- D. Amazon GuardDuty

### Pregunta 27

¿Qué servicio detecta amenazas analizando registros de CloudTrail, VPC Flow Logs y DNS para identificar actividad maliciosa?

- A. AWS Trusted Advisor
- B. AWS Config
- C. Amazon EBS
- D. Amazon GuardDuty

### Pregunta 28

¿Qué servicio analiza automáticamente instancias EC2, imágenes de contenedor y funciones Lambda en busca de vulnerabilidades de software?

- A. AWS IAM
- B. Amazon Inspector
- C. Amazon Macie
- D. AWS Shield

### Pregunta 29

Una empresa quiere descubrir datos personales sensibles (PII) almacenados en buckets de S3. ¿Qué servicio debe usar?

- A. Amazon CloudFront
- B. AWS WAF
- C. Amazon Inspector
- D. Amazon Macie

### Pregunta 30

Un auditor necesita saber quién eliminó un recurso y cuándo. ¿Qué servicio registra las llamadas a la API de la cuenta?

- A. Amazon SNS
- B. AWS CloudTrail
- C. AWS Budgets
- D. Amazon CloudWatch Alarms

### Pregunta 31

Una empresa necesita descargar los reportes de cumplimiento de AWS (por ejemplo, SOC e ISO) para una auditoría. ¿Dónde los obtiene?

- A. Amazon Inspector
- B. AWS Cost Explorer
- C. AWS Shield
- D. AWS Artifact

### Pregunta 32

¿Qué servicio permite crear y administrar las claves de cifrado usadas para proteger los datos?

- A. Amazon SQS
- B. Amazon Route 53
- C. AWS Snowball
- D. AWS Key Management Service (AWS KMS)

### Pregunta 33

¿Qué afirmación describe correctamente un grupo de seguridad (security group) de una instancia EC2?

- A. Es un firewall sin estado a nivel de subred
- B. Es un firewall con estado a nivel de instancia que solo permite reglas de "permitir"
- C. Reemplaza a IAM
- D. Es un servicio de antivirus

### Pregunta 34

Una aplicación debe obtener credenciales de base de datos que se roten automáticamente sin cambiar el código. ¿Qué servicio ayuda?

- A. Amazon S3 Glacier
- B. Amazon Rekognition
- C. AWS Secrets Manager
- D. AWS CloudFormation

### Pregunta 35

Una empresa con muchas cuentas de AWS quiere que sus empleados inicien sesión una sola vez y accedan a todas las cuentas y aplicaciones asignadas. ¿Qué servicio usa?

- A. Amazon Inspector
- B. AWS IAM Identity Center
- C. Amazon Macie
- D. AWS Shield

### Pregunta 36

¿Qué servicio ofrece servidores virtuales redimensionables en la nube?

- A. Amazon EC2
- B. Amazon SNS
- C. Amazon S3
- D. AWS IAM

### Pregunta 37

Una empresa quiere ejecutar código en respuesta a eventos sin administrar servidores y pagando solo por el tiempo de ejecución. ¿Qué servicio usa?

- A. Amazon Lightsail
- B. Amazon EC2
- C. AWS Lambda
- D. AWS Direct Connect

### Pregunta 38

¿Qué servicio es almacenamiento de objetos de alta durabilidad, ideal para imágenes, respaldos y sitios web estáticos?

- A. Amazon VPC
- B. Amazon EBS
- C. Amazon S3
- D. Amazon RDS

### Pregunta 39

¿Qué servicio ofrece volúmenes de almacenamiento por bloques para usar con instancias EC2?

- A. Amazon S3
- B. Amazon EBS
- C. Amazon SQS
- D. Amazon Glacier

### Pregunta 40

Varias instancias Linux necesitan compartir un mismo sistema de archivos que crece y se reduce automáticamente. ¿Qué servicio usan?

- A. Amazon EFS
- B. Amazon Redshift
- C. AWS Snowball
- D. Amazon EBS

### Pregunta 41

Una empresa debe conservar datos de archivo durante años al menor costo posible, con acceso poco frecuente y recuperación en horas. ¿Qué clase usa?

- A. Amazon EBS gp3
- B. S3 Standard
- C. S3 Glacier Deep Archive
- D. Amazon DynamoDB

### Pregunta 42

¿Qué servicio es una base de datos relacional administrada que se encarga de respaldos y parches?

- A. Amazon S3
- B. Amazon DynamoDB
- C. Amazon EFS
- D. Amazon RDS

### Pregunta 43

¿Qué servicio es una base de datos NoSQL clave-valor sin servidor con latencia de milisegundos de un dígito a cualquier escala?

- A. Amazon DynamoDB
- B. Amazon RDS
- C. Amazon Redshift
- D. Amazon Aurora

### Pregunta 44

¿Qué base de datos relacional de AWS es compatible con MySQL y PostgreSQL y está diseñada para alto rendimiento y disponibilidad en la nube?

- A. Amazon Neptune
- B. Amazon Aurora
- C. Amazon ElastiCache
- D. Amazon DynamoDB

### Pregunta 45

Una empresa necesita analizar petabytes de datos estructurados con consultas SQL complejas. ¿Qué servicio es el indicado?

- A. Amazon SNS
- B. Amazon DynamoDB
- C. Amazon Redshift
- D. AWS Lambda

### Pregunta 46

¿Qué servicio permite crear una red virtual aislada de forma lógica dentro de AWS, con control de subredes y tablas de enrutamiento?

- A. Amazon CloudFront
- B. AWS Shield
- C. Amazon VPC
- D. Amazon SES

### Pregunta 47

¿Qué servicio es un DNS escalable y altamente disponible que además puede enrutar usuarios según latencia o salud?

- A. AWS Direct Connect
- B. Elastic Load Balancing
- C. Amazon Route 53
- D. AWS Transit Gateway

### Pregunta 48

Una empresa necesita entregar videos y sitios web con baja latencia a usuarios de todo el mundo usando una red de caché global. ¿Qué servicio usa?

- A. AWS Backup
- B. Amazon EFS
- C. Amazon EBS
- D. Amazon CloudFront

### Pregunta 49

Una aplicación recibe tráfico que debe repartirse automáticamente entre varias instancias EC2 en distintas AZ. ¿Qué servicio se usa?

- A. AWS Artifact
- B. Elastic Load Balancing
- C. AWS Snowball
- D. Amazon Macie

### Pregunta 50

¿Qué servicio añade o quita instancias EC2 automáticamente para mantener el rendimiento al menor costo?

- A. Amazon EC2 Auto Scaling
- B. AWS Organizations
- C. Amazon Inspector
- D. AWS KMS

### Pregunta 51

Una empresa quiere una conexión de red privada y dedicada entre su centro de datos y AWS que no pase por Internet pública. ¿Qué servicio usa?

- A. AWS Direct Connect
- B. Amazon Route 53
- C. AWS WAF
- D. Amazon CloudFront

### Pregunta 52

¿Qué servicio recopila métricas, registros y permite crear alarmas para monitorear recursos y aplicaciones de AWS?

- A. AWS CloudTrail
- B. AWS Snowball
- C. AWS Artifact
- D. Amazon CloudWatch

### Pregunta 53

Un equipo quiere definir su infraestructura en plantillas (infraestructura como código) y desplegarla de forma repetible. ¿Qué servicio usa?

- A. AWS CloudFormation
- B. Amazon Polly
- C. Amazon Lightsail
- D. AWS Shield

### Pregunta 54

Una arquitectura necesita desacoplar componentes usando una cola de mensajes para que el productor no dependa de que el consumidor esté disponible. ¿Qué servicio usa?

- A. Amazon Route 53
- B. Amazon VPC
- C. Amazon SQS
- D. AWS Config

### Pregunta 55

Una empresa quiere ejecutar contenedores sin administrar los servidores subyacentes. ¿Qué opción de cómputo se lo permite?

- A. Amazon EBS
- B. AWS Fargate
- C. Amazon Macie
- D. AWS Snowcone

### Pregunta 56

Una empresa quiere crear aplicaciones de IA generativa usando modelos de base (foundation models) de varios proveedores mediante una API administrada. ¿Qué servicio usa?

- A. Amazon Route 53
- B. Amazon EFS
- C. Amazon Bedrock
- D. AWS Direct Connect

### Pregunta 57

Seleccione DOS servicios de base de datos de AWS. *(seleccione 2)*

- A. Amazon DynamoDB
- B. Amazon SQS
- C. Amazon RDS
- D. Amazon SNS

### Pregunta 58

Una carga de trabajo estable y predecible se ejecutará durante los próximos 3 años. ¿Qué opción de precios reduce más el costo frente a On-Demand?

- A. Pagar siempre On-Demand
- B. Hosts dedicados sin compromiso
- C. Savings Plans o Instancias Reservadas
- D. Instancias Spot para todo

### Pregunta 59

Una carga de trabajo tolera interrupciones (por ejemplo procesamiento por lotes) y busca el mayor ahorro posible. ¿Qué opción conviene?

- A. Plan de soporte Enterprise
- B. Instancias Spot
- C. Instancias On-Demand
- D. Instancias de host dedicado

### Pregunta 60

Una empresa quiere recibir una alerta cuando su gasto mensual supere un umbral definido. ¿Qué servicio usa?

- A. Amazon Inspector
- B. AWS Config
- C. AWS Artifact
- D. AWS Budgets

### Pregunta 61

¿Qué herramienta permite visualizar y analizar los costos y el uso históricos de AWS, e identificar tendencias?

- A. AWS Pricing Calculator
- B. AWS Cost Explorer
- C. AWS Trusted Advisor
- D. AWS Snowball

### Pregunta 62

Una empresa planea migrar una aplicación y quiere estimar cuánto costaría en AWS antes de desplegarla. ¿Qué herramienta usa?

- A. AWS Budgets
- B. AWS Pricing Calculator
- C. AWS Cost Explorer
- D. AWS CloudTrail

### Pregunta 63

¿Cuál es el plan de AWS Support de menor nivel que incluye acceso a todos los chequeos de AWS Trusted Advisor y soporte técnico 24/7 por correo, chat y teléfono?

- A. Developer
- B. Business
- C. Free Tier
- D. Basic

### Pregunta 64

Una organización con muchas cuentas quiere una sola factura y aprovechar descuentos por volumen combinando el uso de todas ellas. ¿Qué característica usa?

- A. Amazon Macie
- B. Elastic Load Balancing
- C. Facturación consolidada de AWS Organizations
- D. AWS Artifact

### Pregunta 65

Seleccione DOS acciones que ayudan a optimizar costos en AWS. *(seleccione 2)*

- A. Apagar recursos que no se utilizan
- B. Sobreaprovisionar recursos "por si acaso"
- C. Dimensionar correctamente (right-sizing) las instancias
- D. Mantener recursos ociosos en producción

---

# Clave de respuestas y explicaciones

### 1. Dominio 1 (Conceptos de la nube)

**Respuesta:** C

Correcta: C. En la nube se paga por lo que se consume (gasto variable) en lugar de comprar infraestructura por adelantado (CapEx). B y A son lo opuesto; D es falso, la nube no elimina costos, los hace variables.

### 2. Dominio 1 (Conceptos de la nube)

**Respuesta:** B

Correcta: B. Elasticidad es aumentar o reducir recursos de forma automática según la demanda. La alta disponibilidad busca evitar caídas, la durabilidad se refiere a no perder datos y el cumplimiento a normas.

### 3. Dominio 1 (Conceptos de la nube)

**Respuesta:** B

Correcta: B. Una Región contiene varias AZ aisladas entre sí. D describe una edge location; C y A no corresponden a la infraestructura global.

### 4. Dominio 1 (Conceptos de la nube)

**Respuesta:** B, C

Correctas: B y C. Los pilares son: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization y Sustainability. Scalability y Profitability no son pilares.

### 5. Dominio 1 (Conceptos de la nube)

**Respuesta:** A

Correcta: A. Las seis perspectivas de CAF: Business, People, Governance, Platform, Security y Operations.

### 6. Dominio 1 (Conceptos de la nube)

**Respuesta:** C

Correcta: C. Rehost = mover tal cual. Refactor rediseña la aplicación; Retire apaga lo que ya no se necesita; Repurchase cambia a un producto SaaS.

### 7. Dominio 1 (Conceptos de la nube)

**Respuesta:** D

Correcta: D. CloudFront es la CDN de AWS. Direct Connect es una conexión dedicada, EBS es almacenamiento por bloques y Organizations administra cuentas.

### 8. Dominio 1 (Conceptos de la nube)

**Respuesta:** D

Correcta: D. Distribuir entre varias AZ da alta disponibilidad. Una sola AZ es un punto único de falla.

### 9. Dominio 1 (Conceptos de la nube)

**Respuesta:** A

Correcta: A. Al agregar el uso de cientos de miles de clientes, AWS logra economías de escala y precios más bajos de pago por uso.

### 10. Dominio 1 (Conceptos de la nube)

**Respuesta:** B

Correcta: B. La agilidad es poder experimentar y lanzar recursos rápidamente, lo que reduce el tiempo de comercialización.

### 11. Dominio 1 (Conceptos de la nube)

**Respuesta:** A, D

Correctas: A y D. Los factores para elegir Región son cumplimiento/residencia de datos, latencia, costo y disponibilidad de servicios. C y B son irrelevantes.

### 12. Dominio 1 (Conceptos de la nube)

**Respuesta:** B

Correcta: B. Híbrido combina infraestructura on-premises con la nube (por ejemplo con Direct Connect, VPN o Outposts).

### 13. Dominio 1 (Conceptos de la nube)

**Respuesta:** C

Correcta: C. Uno de los beneficios clásicos es "stop guessing capacity": se aprovisiona lo necesario y se ajusta.

### 14. Dominio 1 (Conceptos de la nube)

**Respuesta:** C

Correcta: C. La Well-Architected Tool guía la revisión de cargas de trabajo. Artifact entrega reportes de cumplimiento, Inspector busca vulnerabilidades y Snowball transfiere datos físicos.

### 15. Dominio 1 (Conceptos de la nube)

**Respuesta:** C

Correcta: C. "Go global in minutes": la infraestructura global permite desplegar en múltiples Regiones rápidamente.

### 16. Dominio 1 (Conceptos de la nube)

**Respuesta:** B

Correcta: B. El pilar de Fiabilidad trata de recuperarse de interrupciones, escalar para la demanda y mitigar fallos.

### 17. Dominio 2 (Seguridad y cumplimiento)

**Respuesta:** B

Correcta: B. AWS es responsable de la seguridad "DE" la nube (instalaciones, hardware, red global). El cliente lo es de la seguridad "EN" la nube (SO invitado, datos, IAM, firewall).

### 18. Dominio 2 (Seguridad y cumplimiento)

**Respuesta:** A

Correcta: A. En EC2 (IaaS) el cliente administra el SO invitado, incluidos parches y actualizaciones.

### 19. Dominio 2 (Seguridad y cumplimiento)

**Respuesta:** D

Correcta: D. RDS es un servicio administrado: AWS parchea el SO y el motor. El cliente sigue gestionando datos, accesos y configuración de seguridad.

### 20. Dominio 2 (Seguridad y cumplimiento)

**Respuesta:** D

Correcta: D. Protege el root con MFA y úsalo únicamente para tareas que solo el root puede hacer. Las demás opciones son malas prácticas.

### 21. Dominio 2 (Seguridad y cumplimiento)

**Respuesta:** A

Correcta: A. Los roles de IAM entregan credenciales temporales a la instancia. Un grupo de seguridad controla tráfico de red, no permisos de API.

### 22. Dominio 2 (Seguridad y cumplimiento)

**Respuesta:** D

Correcta: D. Least privilege es un principio central de IAM: se otorgan solo los permisos requeridos.

### 23. Dominio 2 (Seguridad y cumplimiento)

**Respuesta:** D

Correcta: D. Los grupos permiten asociar políticas a varios usuarios a la vez. Los roles son para identidades temporales o servicios.

### 24. Dominio 2 (Seguridad y cumplimiento)

**Respuesta:** C, D

Correctas: C y D. Habilita MFA y no crees claves de acceso para el root. B y A aumentan el riesgo.

### 25. Dominio 2 (Seguridad y cumplimiento)

**Respuesta:** B

Correcta: B. AWS Shield (Standard automático y gratuito; Advanced con más protección) mitiga DDoS. KMS cifra, Macie descubre datos sensibles, Artifact entrega reportes.

### 26. Dominio 2 (Seguridad y cumplimiento)

**Respuesta:** A

Correcta: A. AWS WAF es un firewall de aplicaciones web (capa 7) con reglas configurables.

### 27. Dominio 2 (Seguridad y cumplimiento)

**Respuesta:** D

Correcta: D. GuardDuty es detección inteligente de amenazas. Config evalúa configuraciones, Trusted Advisor da recomendaciones.

### 28. Dominio 2 (Seguridad y cumplimiento)

**Respuesta:** B

Correcta: B. Inspector escanea vulnerabilidades y exposición de red no deseada.

### 29. Dominio 2 (Seguridad y cumplimiento)

**Respuesta:** D

Correcta: D. Macie utiliza machine learning para descubrir y proteger datos sensibles en S3.

### 30. Dominio 2 (Seguridad y cumplimiento)

**Respuesta:** B

Correcta: B. CloudTrail registra la actividad de la cuenta (quién, qué, cuándo, desde dónde). CloudWatch monitorea métricas y logs de aplicaciones.

### 31. Dominio 2 (Seguridad y cumplimiento)

**Respuesta:** D

Correcta: D. AWS Artifact es el portal de autoservicio de reportes de cumplimiento y acuerdos.

### 32. Dominio 2 (Seguridad y cumplimiento)

**Respuesta:** D

Correcta: D. KMS crea y controla claves criptográficas e integra con muchos servicios.

### 33. Dominio 2 (Seguridad y cumplimiento)

**Respuesta:** B

Correcta: B. Los grupos de seguridad son stateful y actúan a nivel de instancia/ENI. Las NACL son stateless y actúan a nivel de subred.

### 34. Dominio 2 (Seguridad y cumplimiento)

**Respuesta:** C

Correcta: C. Secrets Manager almacena secretos y soporta rotación automática.

### 35. Dominio 2 (Seguridad y cumplimiento)

**Respuesta:** B

Correcta: B. IAM Identity Center ofrece inicio de sesión único (SSO) centralizado para varias cuentas y aplicaciones. Las otras opciones son servicios de seguridad con otro propósito.

### 36. Dominio 3 (Tecnología y servicios)

**Respuesta:** A

Correcta: A. EC2 proporciona capacidad de cómputo virtual. S3 es almacenamiento de objetos.

### 37. Dominio 3 (Tecnología y servicios)

**Respuesta:** C

Correcta: C. Lambda es cómputo serverless basado en eventos.

### 38. Dominio 3 (Tecnología y servicios)

**Respuesta:** C

Correcta: C. S3 almacena objetos en buckets con durabilidad de 11 nueves.

### 39. Dominio 3 (Tecnología y servicios)

**Respuesta:** B

Correcta: B. EBS es almacenamiento por bloques persistente, como un disco duro virtual para EC2.

### 40. Dominio 3 (Tecnología y servicios)

**Respuesta:** A

Correcta: A. EFS es un sistema de archivos NFS elástico y compartido. Un volumen EBS normalmente se asocia a una sola instancia.

### 41. Dominio 3 (Tecnología y servicios)

**Respuesta:** C

Correcta: C. S3 Glacier Deep Archive es la clase de almacenamiento de menor costo para archivo a largo plazo. S3 Standard es para acceso frecuente.

### 42. Dominio 3 (Tecnología y servicios)

**Respuesta:** D

Correcta: D. RDS simplifica operar bases de datos relacionales (MySQL, PostgreSQL, SQL Server, Oracle, MariaDB).

### 43. Dominio 3 (Tecnología y servicios)

**Respuesta:** A

Correcta: A. DynamoDB es NoSQL totalmente administrada y sin servidor.

### 44. Dominio 3 (Tecnología y servicios)

**Respuesta:** B

Correcta: B. Aurora es compatible con MySQL y PostgreSQL. Neptune es de grafos y ElastiCache es caché en memoria.

### 45. Dominio 3 (Tecnología y servicios)

**Respuesta:** C

Correcta: C. Redshift es un data warehouse para analítica a gran escala.

### 46. Dominio 3 (Tecnología y servicios)

**Respuesta:** C

Correcta: C. Amazon VPC es la red privada virtual del cliente en AWS.

### 47. Dominio 3 (Tecnología y servicios)

**Respuesta:** C

Correcta: C. Route 53 es el servicio DNS de AWS con varias políticas de enrutamiento.

### 48. Dominio 3 (Tecnología y servicios)

**Respuesta:** D

Correcta: D. CloudFront cachea contenido en edge locations cercanas al usuario.

### 49. Dominio 3 (Tecnología y servicios)

**Respuesta:** B

Correcta: B. ELB distribuye el tráfico entrante entre destinos en varias AZ.

### 50. Dominio 3 (Tecnología y servicios)

**Respuesta:** A

Correcta: A. Auto Scaling ajusta la capacidad según políticas y demanda.

### 51. Dominio 3 (Tecnología y servicios)

**Respuesta:** A

Correcta: A. Direct Connect ofrece un enlace dedicado y consistente. Una VPN usa Internet cifrada.

### 52. Dominio 3 (Tecnología y servicios)

**Respuesta:** D

Correcta: D. CloudWatch es monitoreo y observabilidad. CloudTrail registra llamadas a API.

### 53. Dominio 3 (Tecnología y servicios)

**Respuesta:** A

Correcta: A. CloudFormation aprovisiona recursos a partir de plantillas JSON o YAML.

### 54. Dominio 3 (Tecnología y servicios)

**Respuesta:** C

Correcta: C. SQS es una cola de mensajes administrada. SNS es publicación/suscripción (notificaciones).

### 55. Dominio 3 (Tecnología y servicios)

**Respuesta:** B

Correcta: B. Fargate es un motor de cómputo serverless para contenedores con ECS y EKS.

### 56. Dominio 3 (Tecnología y servicios)

**Respuesta:** C

Correcta: C. Amazon Bedrock ofrece modelos de base a través de una API sin administrar infraestructura. SageMaker se usa para construir, entrenar y desplegar modelos de ML propios.

### 57. Dominio 3 (Tecnología y servicios)

**Respuesta:** A, C

Correctas: C y A. RDS (relacional) y DynamoDB (NoSQL) son bases de datos. SQS es cola de mensajes y SNS es mensajería pub/sub.

### 58. Dominio 4 (Facturación, precios y soporte)

**Respuesta:** C

Correcta: C. Los compromisos de 1 o 3 años (Savings Plans o RI) ofrecen grandes descuentos para uso constante. Spot puede interrumpirse.

### 59. Dominio 4 (Facturación, precios y soporte)

**Respuesta:** B

Correcta: B. Spot permite descuentos de hasta 90 %, pero AWS puede recuperar la capacidad con aviso.

### 60. Dominio 4 (Facturación, precios y soporte)

**Respuesta:** D

Correcta: D. AWS Budgets permite fijar presupuestos y alertas de costo o uso.

### 61. Dominio 4 (Facturación, precios y soporte)

**Respuesta:** B

Correcta: B. Cost Explorer analiza gastos pasados y proyecta. Pricing Calculator estima costos antes de desplegar.

### 62. Dominio 4 (Facturación, precios y soporte)

**Respuesta:** B

Correcta: B. Pricing Calculator estima el costo de una arquitectura planeada.

### 63. Dominio 4 (Facturación, precios y soporte)

**Respuesta:** B

Correcta: B. Basic y Developer solo incluyen los chequeos centrales de Trusted Advisor. Business (o superior) incluye todos los chequeos y soporte 24/7. Free Tier no es un plan de soporte.

### 64. Dominio 4 (Facturación, precios y soporte)

**Respuesta:** C

Correcta: C. La facturación consolidada agrupa cuentas bajo un pagador y combina el uso para descuentos por volumen.

### 65. Dominio 4 (Facturación, precios y soporte)

**Respuesta:** A, C

Correctas: C y A. Right-sizing y eliminar o apagar recursos sin uso reducen costos. B y D aumentan el gasto sin aportar valor.

