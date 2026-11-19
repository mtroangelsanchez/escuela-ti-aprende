/* Generado por build.js. No editar: edita questions.src.js */
window.QUESTIONS = [
 {
  "id": 1,
  "d": 1,
  "t": "single",
  "q": "Una empresa migra a AWS y quiere dejar de hacer grandes inversiones iniciales en hardware. ¿Qué beneficio económico de la nube describe mejor esto?",
  "o": [
   "Pagar por adelantado toda la capacidad futura",
   "Firmar contratos de hardware a 5 años",
   "Convertir gasto de capital (CapEx) en gasto variable (OpEx)",
   "Eliminar por completo cualquier factura de TI"
  ],
  "a": [
   2
  ],
  "e": "Correcta: C. En la nube se paga por lo que se consume (gasto variable) en lugar de comprar infraestructura por adelantado (CapEx). B y A son lo opuesto; D es falso, la nube no elimina costos, los hace variables."
 },
 {
  "id": 2,
  "d": 1,
  "t": "single",
  "q": "Una tienda en línea recibe picos de tráfico en Navidad y casi nada el resto del año. Quiere que los recursos crezcan y se reduzcan automáticamente según la demanda. ¿Qué característica de la nube aprovecha?",
  "o": [
   "Alta disponibilidad",
   "Elasticidad",
   "Cumplimiento normativo",
   "Durabilidad"
  ],
  "a": [
   1
  ],
  "e": "Correcta: B. Elasticidad es aumentar o reducir recursos de forma automática según la demanda. La alta disponibilidad busca evitar caídas, la durabilidad se refiere a no perder datos y el cumplimiento a normas."
 },
 {
  "id": 3,
  "d": 1,
  "t": "single",
  "q": "¿Qué es una Zona de Disponibilidad (AZ) de AWS?",
  "o": [
   "Una cuenta de AWS dedicada a un cliente",
   "Uno o más centros de datos discretos con energía, red y conectividad redundantes dentro de una Región",
   "Un país donde AWS tiene oficinas",
   "Una ubicación de caché de CloudFront"
  ],
  "a": [
   1
  ],
  "e": "Correcta: B. Una Región contiene varias AZ aisladas entre sí. D describe una edge location; C y A no corresponden a la infraestructura global."
 },
 {
  "id": 4,
  "d": 1,
  "t": "multi",
  "q": "Seleccione DOS pilares del AWS Well-Architected Framework.",
  "o": [
   "Profitability (Rentabilidad)",
   "Reliability (Fiabilidad)",
   "Sustainability (Sostenibilidad)",
   "Scalability (Escalabilidad)"
  ],
  "a": [
   1,
   2
  ],
  "e": "Correctas: B y C. Los pilares son: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization y Sustainability. Scalability y Profitability no son pilares."
 },
 {
  "id": 5,
  "d": 1,
  "t": "single",
  "q": "¿Cuál de las siguientes es una perspectiva del AWS Cloud Adoption Framework (AWS CAF)?",
  "o": [
   "Platform (Plataforma)",
   "Hardware",
   "Legal Audit",
   "Marketing"
  ],
  "a": [
   0
  ],
  "e": "Correcta: A. Las seis perspectivas de CAF: Business, People, Governance, Platform, Security y Operations."
 },
 {
  "id": 6,
  "d": 1,
  "t": "single",
  "q": "Una empresa mueve sus servidores a AWS sin cambiar el código ni la arquitectura (lift-and-shift). ¿Qué estrategia de migración es?",
  "o": [
   "Repurchase",
   "Retire",
   "Rehost",
   "Refactor"
  ],
  "a": [
   2
  ],
  "e": "Correcta: C. Rehost = mover tal cual. Refactor rediseña la aplicación; Retire apaga lo que ya no se necesita; Repurchase cambia a un producto SaaS."
 },
 {
  "id": 7,
  "d": 1,
  "t": "single",
  "q": "¿Qué servicio permite entregar contenido con baja latencia usando ubicaciones cercanas a los usuarios finales (edge locations)?",
  "o": [
   "AWS Direct Connect",
   "Amazon EBS",
   "AWS Organizations",
   "Amazon CloudFront"
  ],
  "a": [
   3
  ],
  "e": "Correcta: D. CloudFront es la CDN de AWS. Direct Connect es una conexión dedicada, EBS es almacenamiento por bloques y Organizations administra cuentas."
 },
 {
  "id": 8,
  "d": 1,
  "t": "single",
  "q": "Para que una aplicación siga funcionando aunque falle un centro de datos completo, ¿qué debe hacer la empresa?",
  "o": [
   "Usar una sola instancia grande en una AZ",
   "Desactivar Auto Scaling",
   "Copiar los datos a un disco USB",
   "Desplegar la aplicación en varias Zonas de Disponibilidad"
  ],
  "a": [
   3
  ],
  "e": "Correcta: D. Distribuir entre varias AZ da alta disponibilidad. Una sola AZ es un punto único de falla."
 },
 {
  "id": 9,
  "d": 1,
  "t": "single",
  "q": "¿Qué ventaja de la nube se refiere a que AWS reduce los precios gracias al volumen agregado de uso de todos sus clientes?",
  "o": [
   "Economías de escala",
   "Tolerancia a fallos",
   "Elasticidad",
   "Agilidad"
  ],
  "a": [
   0
  ],
  "e": "Correcta: A. Al agregar el uso de cientos de miles de clientes, AWS logra economías de escala y precios más bajos de pago por uso."
 },
 {
  "id": 10,
  "d": 1,
  "t": "single",
  "q": "Un equipo de desarrollo necesita probar una idea y quiere aprovisionar servidores en minutos en lugar de semanas. ¿Qué beneficio es?",
  "o": [
   "Hardware dedicado",
   "Agilidad",
   "Soporte Enterprise",
   "Residencia de datos"
  ],
  "a": [
   1
  ],
  "e": "Correcta: B. La agilidad es poder experimentar y lanzar recursos rápidamente, lo que reduce el tiempo de comercialización."
 },
 {
  "id": 11,
  "d": 1,
  "t": "multi",
  "q": "Una empresa debe elegir una Región de AWS. Seleccione DOS factores que debe considerar.",
  "o": [
   "Latencia hacia los usuarios finales",
   "Número de empleados de AWS en la Región",
   "El color del logotipo de la Región",
   "Requisitos de residencia de datos y cumplimiento"
  ],
  "a": [
   0,
   3
  ],
  "e": "Correctas: A y D. Los factores para elegir Región son cumplimiento/residencia de datos, latencia, costo y disponibilidad de servicios. C y B son irrelevantes."
 },
 {
  "id": 12,
  "d": 1,
  "t": "single",
  "q": "Una empresa mantiene parte de su infraestructura en su centro de datos y otra parte en AWS, conectadas entre sí. ¿Qué modelo de implementación es?",
  "o": [
   "Multi-cuenta",
   "Híbrido",
   "Nube pública únicamente",
   "Solo on-premises"
  ],
  "a": [
   1
  ],
  "e": "Correcta: B. Híbrido combina infraestructura on-premises con la nube (por ejemplo con Direct Connect, VPN o Outposts)."
 },
 {
  "id": 13,
  "d": 1,
  "t": "single",
  "q": "Una empresa antes compraba servidores calculando la capacidad \"a ojo\". ¿Qué beneficio de la nube resuelve esto?",
  "o": [
   "Evitar el uso de redes",
   "Eliminar la necesidad de seguridad",
   "Dejar de adivinar la capacidad: se ajusta según la demanda real",
   "Garantizar costos fijos"
  ],
  "a": [
   2
  ],
  "e": "Correcta: C. Uno de los beneficios clásicos es \"stop guessing capacity\": se aprovisiona lo necesario y se ajusta."
 },
 {
  "id": 14,
  "d": 1,
  "t": "single",
  "q": "¿Qué herramienta de AWS permite revisar una carga de trabajo contra las mejores prácticas de los pilares del Well-Architected Framework?",
  "o": [
   "Amazon Inspector",
   "AWS Snowball",
   "AWS Well-Architected Tool",
   "AWS Artifact"
  ],
  "a": [
   2
  ],
  "e": "Correcta: C. La Well-Architected Tool guía la revisión de cargas de trabajo. Artifact entrega reportes de cumplimiento, Inspector busca vulnerabilidades y Snowball transfiere datos físicos."
 },
 {
  "id": 15,
  "d": 1,
  "t": "single",
  "q": "Una empresa lanza su aplicación en varios continentes en pocos clics para acercarla a clientes globales. ¿Qué beneficio es?",
  "o": [
   "Contratos a largo plazo",
   "Mayor CapEx",
   "Despliegue global en minutos",
   "Hardware propio"
  ],
  "a": [
   2
  ],
  "e": "Correcta: C. \"Go global in minutes\": la infraestructura global permite desplegar en múltiples Regiones rápidamente."
 },
 {
  "id": 16,
  "d": 1,
  "t": "single",
  "q": "Un sistema diseñado con Reliability en mente debe, ante todo:",
  "o": [
   "Ser el más barato posible sin importar las caídas",
   "Recuperarse de fallos y cumplir con la demanda",
   "Evitar cualquier monitoreo",
   "Tener solo un servidor"
  ],
  "a": [
   1
  ],
  "e": "Correcta: B. El pilar de Fiabilidad trata de recuperarse de interrupciones, escalar para la demanda y mitigar fallos."
 },
 {
  "id": 17,
  "d": 2,
  "t": "single",
  "q": "En el modelo de responsabilidad compartida, ¿de qué es responsable AWS?",
  "o": [
   "Configurar los grupos de seguridad del cliente",
   "La seguridad física de los centros de datos",
   "Parchear el sistema operativo invitado de las instancias EC2",
   "Gestionar los usuarios de IAM del cliente"
  ],
  "a": [
   1
  ],
  "e": "Correcta: B. AWS es responsable de la seguridad \"DE\" la nube (instalaciones, hardware, red global). El cliente lo es de la seguridad \"EN\" la nube (SO invitado, datos, IAM, firewall)."
 },
 {
  "id": 18,
  "d": 2,
  "t": "single",
  "q": "Una empresa ejecuta una aplicación en instancias Amazon EC2. ¿Quién es responsable de aplicar los parches del sistema operativo?",
  "o": [
   "El cliente",
   "Ambos por igual",
   "Un tercero designado por AWS",
   "AWS"
  ],
  "a": [
   0
  ],
  "e": "Correcta: A. En EC2 (IaaS) el cliente administra el SO invitado, incluidos parches y actualizaciones."
 },
 {
  "id": 19,
  "d": 2,
  "t": "single",
  "q": "Con Amazon RDS, ¿qué parte pasa a ser responsabilidad de AWS en comparación con instalar una base de datos en EC2?",
  "o": [
   "Clasificar los datos almacenados",
   "Cifrar los datos del lado del cliente",
   "Definir qué usuarios pueden consultar los datos",
   "Parchear el motor de base de datos y el SO subyacente"
  ],
  "a": [
   3
  ],
  "e": "Correcta: D. RDS es un servicio administrado: AWS parchea el SO y el motor. El cliente sigue gestionando datos, accesos y configuración de seguridad."
 },
 {
  "id": 20,
  "d": 2,
  "t": "single",
  "q": "¿Cuál es la mejor práctica para el usuario raíz (root) de una cuenta de AWS?",
  "o": [
   "Crear claves de acceso y guardarlas en el código",
   "Usarlo para las tareas diarias",
   "Compartir sus credenciales con el equipo",
   "Activar MFA y evitar usarlo salvo en tareas que lo exijan"
  ],
  "a": [
   3
  ],
  "e": "Correcta: D. Protege el root con MFA y úsalo únicamente para tareas que solo el root puede hacer. Las demás opciones son malas prácticas."
 },
 {
  "id": 21,
  "d": 2,
  "t": "single",
  "q": "Una aplicación en EC2 necesita leer objetos de un bucket de S3 sin guardar claves de acceso en el servidor. ¿Qué debe usarse?",
  "o": [
   "Un rol de IAM asociado a la instancia",
   "Un grupo de seguridad",
   "Las credenciales del usuario raíz",
   "Un archivo con claves en el disco"
  ],
  "a": [
   0
  ],
  "e": "Correcta: A. Los roles de IAM entregan credenciales temporales a la instancia. Un grupo de seguridad controla tráfico de red, no permisos de API."
 },
 {
  "id": 22,
  "d": 2,
  "t": "single",
  "q": "¿Qué principio indica conceder únicamente los permisos mínimos necesarios para realizar una tarea?",
  "o": [
   "Alta disponibilidad",
   "Escalabilidad horizontal",
   "Elasticidad",
   "Mínimo privilegio"
  ],
  "a": [
   3
  ],
  "e": "Correcta: D. Least privilege es un principio central de IAM: se otorgan solo los permisos requeridos."
 },
 {
  "id": 23,
  "d": 2,
  "t": "single",
  "q": "Una empresa quiere asignar los mismos permisos a 50 desarrolladores de forma sencilla. ¿Qué recurso de IAM es el más adecuado?",
  "o": [
   "Una clave de KMS",
   "Un bucket de S3",
   "Una VPC",
   "Un grupo de IAM"
  ],
  "a": [
   3
  ],
  "e": "Correcta: D. Los grupos permiten asociar políticas a varios usuarios a la vez. Los roles son para identidades temporales o servicios."
 },
 {
  "id": 24,
  "d": 2,
  "t": "multi",
  "q": "Seleccione DOS buenas prácticas de seguridad para el usuario raíz de una cuenta de AWS.",
  "o": [
   "Usar el root como cuenta de administración diaria",
   "Crear claves de acceso para el root y usarlas en scripts",
   "Habilitar la autenticación multifactor (MFA)",
   "No crear claves de acceso para el root"
  ],
  "a": [
   2,
   3
  ],
  "e": "Correctas: C y D. Habilita MFA y no crees claves de acceso para el root. B y A aumentan el riesgo."
 },
 {
  "id": 25,
  "d": 2,
  "t": "single",
  "q": "¿Qué servicio protege las aplicaciones contra ataques de denegación de servicio distribuido (DDoS)?",
  "o": [
   "Amazon Macie",
   "AWS Shield",
   "AWS KMS",
   "AWS Artifact"
  ],
  "a": [
   1
  ],
  "e": "Correcta: B. AWS Shield (Standard automático y gratuito; Advanced con más protección) mitiga DDoS. KMS cifra, Macie descubre datos sensibles, Artifact entrega reportes."
 },
 {
  "id": 26,
  "d": 2,
  "t": "single",
  "q": "¿Qué servicio ayuda a bloquear ataques web comunes como inyección SQL y cross-site scripting (XSS)?",
  "o": [
   "AWS WAF",
   "AWS CloudTrail",
   "Amazon Route 53",
   "Amazon GuardDuty"
  ],
  "a": [
   0
  ],
  "e": "Correcta: A. AWS WAF es un firewall de aplicaciones web (capa 7) con reglas configurables."
 },
 {
  "id": 27,
  "d": 2,
  "t": "single",
  "q": "¿Qué servicio detecta amenazas analizando registros de CloudTrail, VPC Flow Logs y DNS para identificar actividad maliciosa?",
  "o": [
   "AWS Trusted Advisor",
   "AWS Config",
   "Amazon EBS",
   "Amazon GuardDuty"
  ],
  "a": [
   3
  ],
  "e": "Correcta: D. GuardDuty es detección inteligente de amenazas. Config evalúa configuraciones, Trusted Advisor da recomendaciones."
 },
 {
  "id": 28,
  "d": 2,
  "t": "single",
  "q": "¿Qué servicio analiza automáticamente instancias EC2, imágenes de contenedor y funciones Lambda en busca de vulnerabilidades de software?",
  "o": [
   "AWS IAM",
   "Amazon Inspector",
   "Amazon Macie",
   "AWS Shield"
  ],
  "a": [
   1
  ],
  "e": "Correcta: B. Inspector escanea vulnerabilidades y exposición de red no deseada."
 },
 {
  "id": 29,
  "d": 2,
  "t": "single",
  "q": "Una empresa quiere descubrir datos personales sensibles (PII) almacenados en buckets de S3. ¿Qué servicio debe usar?",
  "o": [
   "Amazon CloudFront",
   "AWS WAF",
   "Amazon Inspector",
   "Amazon Macie"
  ],
  "a": [
   3
  ],
  "e": "Correcta: D. Macie utiliza machine learning para descubrir y proteger datos sensibles en S3."
 },
 {
  "id": 30,
  "d": 2,
  "t": "single",
  "q": "Un auditor necesita saber quién eliminó un recurso y cuándo. ¿Qué servicio registra las llamadas a la API de la cuenta?",
  "o": [
   "Amazon SNS",
   "AWS CloudTrail",
   "AWS Budgets",
   "Amazon CloudWatch Alarms"
  ],
  "a": [
   1
  ],
  "e": "Correcta: B. CloudTrail registra la actividad de la cuenta (quién, qué, cuándo, desde dónde). CloudWatch monitorea métricas y logs de aplicaciones."
 },
 {
  "id": 31,
  "d": 2,
  "t": "single",
  "q": "Una empresa necesita descargar los reportes de cumplimiento de AWS (por ejemplo, SOC e ISO) para una auditoría. ¿Dónde los obtiene?",
  "o": [
   "Amazon Inspector",
   "AWS Cost Explorer",
   "AWS Shield",
   "AWS Artifact"
  ],
  "a": [
   3
  ],
  "e": "Correcta: D. AWS Artifact es el portal de autoservicio de reportes de cumplimiento y acuerdos."
 },
 {
  "id": 32,
  "d": 2,
  "t": "single",
  "q": "¿Qué servicio permite crear y administrar las claves de cifrado usadas para proteger los datos?",
  "o": [
   "Amazon SQS",
   "Amazon Route 53",
   "AWS Snowball",
   "AWS Key Management Service (AWS KMS)"
  ],
  "a": [
   3
  ],
  "e": "Correcta: D. KMS crea y controla claves criptográficas e integra con muchos servicios."
 },
 {
  "id": 33,
  "d": 2,
  "t": "single",
  "q": "¿Qué afirmación describe correctamente un grupo de seguridad (security group) de una instancia EC2?",
  "o": [
   "Es un firewall sin estado a nivel de subred",
   "Es un firewall con estado a nivel de instancia que solo permite reglas de \"permitir\"",
   "Reemplaza a IAM",
   "Es un servicio de antivirus"
  ],
  "a": [
   1
  ],
  "e": "Correcta: B. Los grupos de seguridad son stateful y actúan a nivel de instancia/ENI. Las NACL son stateless y actúan a nivel de subred."
 },
 {
  "id": 34,
  "d": 2,
  "t": "single",
  "q": "Una aplicación debe obtener credenciales de base de datos que se roten automáticamente sin cambiar el código. ¿Qué servicio ayuda?",
  "o": [
   "Amazon S3 Glacier",
   "Amazon Rekognition",
   "AWS Secrets Manager",
   "AWS CloudFormation"
  ],
  "a": [
   2
  ],
  "e": "Correcta: C. Secrets Manager almacena secretos y soporta rotación automática."
 },
 {
  "id": 35,
  "d": 2,
  "t": "single",
  "q": "Una empresa con muchas cuentas de AWS quiere que sus empleados inicien sesión una sola vez y accedan a todas las cuentas y aplicaciones asignadas. ¿Qué servicio usa?",
  "o": [
   "Amazon Inspector",
   "AWS IAM Identity Center",
   "Amazon Macie",
   "AWS Shield"
  ],
  "a": [
   1
  ],
  "e": "Correcta: B. IAM Identity Center ofrece inicio de sesión único (SSO) centralizado para varias cuentas y aplicaciones. Las otras opciones son servicios de seguridad con otro propósito."
 },
 {
  "id": 36,
  "d": 3,
  "t": "single",
  "q": "¿Qué servicio ofrece servidores virtuales redimensionables en la nube?",
  "o": [
   "Amazon EC2",
   "Amazon SNS",
   "Amazon S3",
   "AWS IAM"
  ],
  "a": [
   0
  ],
  "e": "Correcta: A. EC2 proporciona capacidad de cómputo virtual. S3 es almacenamiento de objetos."
 },
 {
  "id": 37,
  "d": 3,
  "t": "single",
  "q": "Una empresa quiere ejecutar código en respuesta a eventos sin administrar servidores y pagando solo por el tiempo de ejecución. ¿Qué servicio usa?",
  "o": [
   "Amazon Lightsail",
   "Amazon EC2",
   "AWS Lambda",
   "AWS Direct Connect"
  ],
  "a": [
   2
  ],
  "e": "Correcta: C. Lambda es cómputo serverless basado en eventos."
 },
 {
  "id": 38,
  "d": 3,
  "t": "single",
  "q": "¿Qué servicio es almacenamiento de objetos de alta durabilidad, ideal para imágenes, respaldos y sitios web estáticos?",
  "o": [
   "Amazon VPC",
   "Amazon EBS",
   "Amazon S3",
   "Amazon RDS"
  ],
  "a": [
   2
  ],
  "e": "Correcta: C. S3 almacena objetos en buckets con durabilidad de 11 nueves."
 },
 {
  "id": 39,
  "d": 3,
  "t": "single",
  "q": "¿Qué servicio ofrece volúmenes de almacenamiento por bloques para usar con instancias EC2?",
  "o": [
   "Amazon S3",
   "Amazon EBS",
   "Amazon SQS",
   "Amazon Glacier"
  ],
  "a": [
   1
  ],
  "e": "Correcta: B. EBS es almacenamiento por bloques persistente, como un disco duro virtual para EC2."
 },
 {
  "id": 40,
  "d": 3,
  "t": "single",
  "q": "Varias instancias Linux necesitan compartir un mismo sistema de archivos que crece y se reduce automáticamente. ¿Qué servicio usan?",
  "o": [
   "Amazon EFS",
   "Amazon Redshift",
   "AWS Snowball",
   "Amazon EBS"
  ],
  "a": [
   0
  ],
  "e": "Correcta: A. EFS es un sistema de archivos NFS elástico y compartido. Un volumen EBS normalmente se asocia a una sola instancia."
 },
 {
  "id": 41,
  "d": 3,
  "t": "single",
  "q": "Una empresa debe conservar datos de archivo durante años al menor costo posible, con acceso poco frecuente y recuperación en horas. ¿Qué clase usa?",
  "o": [
   "Amazon EBS gp3",
   "S3 Standard",
   "S3 Glacier Deep Archive",
   "Amazon DynamoDB"
  ],
  "a": [
   2
  ],
  "e": "Correcta: C. S3 Glacier Deep Archive es la clase de almacenamiento de menor costo para archivo a largo plazo. S3 Standard es para acceso frecuente."
 },
 {
  "id": 42,
  "d": 3,
  "t": "single",
  "q": "¿Qué servicio es una base de datos relacional administrada que se encarga de respaldos y parches?",
  "o": [
   "Amazon S3",
   "Amazon DynamoDB",
   "Amazon EFS",
   "Amazon RDS"
  ],
  "a": [
   3
  ],
  "e": "Correcta: D. RDS simplifica operar bases de datos relacionales (MySQL, PostgreSQL, SQL Server, Oracle, MariaDB)."
 },
 {
  "id": 43,
  "d": 3,
  "t": "single",
  "q": "¿Qué servicio es una base de datos NoSQL clave-valor sin servidor con latencia de milisegundos de un dígito a cualquier escala?",
  "o": [
   "Amazon DynamoDB",
   "Amazon RDS",
   "Amazon Redshift",
   "Amazon Aurora"
  ],
  "a": [
   0
  ],
  "e": "Correcta: A. DynamoDB es NoSQL totalmente administrada y sin servidor."
 },
 {
  "id": 44,
  "d": 3,
  "t": "single",
  "q": "¿Qué base de datos relacional de AWS es compatible con MySQL y PostgreSQL y está diseñada para alto rendimiento y disponibilidad en la nube?",
  "o": [
   "Amazon Neptune",
   "Amazon Aurora",
   "Amazon ElastiCache",
   "Amazon DynamoDB"
  ],
  "a": [
   1
  ],
  "e": "Correcta: B. Aurora es compatible con MySQL y PostgreSQL. Neptune es de grafos y ElastiCache es caché en memoria."
 },
 {
  "id": 45,
  "d": 3,
  "t": "single",
  "q": "Una empresa necesita analizar petabytes de datos estructurados con consultas SQL complejas. ¿Qué servicio es el indicado?",
  "o": [
   "Amazon SNS",
   "Amazon DynamoDB",
   "Amazon Redshift",
   "AWS Lambda"
  ],
  "a": [
   2
  ],
  "e": "Correcta: C. Redshift es un data warehouse para analítica a gran escala."
 },
 {
  "id": 46,
  "d": 3,
  "t": "single",
  "q": "¿Qué servicio permite crear una red virtual aislada de forma lógica dentro de AWS, con control de subredes y tablas de enrutamiento?",
  "o": [
   "Amazon CloudFront",
   "AWS Shield",
   "Amazon VPC",
   "Amazon SES"
  ],
  "a": [
   2
  ],
  "e": "Correcta: C. Amazon VPC es la red privada virtual del cliente en AWS."
 },
 {
  "id": 47,
  "d": 3,
  "t": "single",
  "q": "¿Qué servicio es un DNS escalable y altamente disponible que además puede enrutar usuarios según latencia o salud?",
  "o": [
   "AWS Direct Connect",
   "Elastic Load Balancing",
   "Amazon Route 53",
   "AWS Transit Gateway"
  ],
  "a": [
   2
  ],
  "e": "Correcta: C. Route 53 es el servicio DNS de AWS con varias políticas de enrutamiento."
 },
 {
  "id": 48,
  "d": 3,
  "t": "single",
  "q": "Una empresa necesita entregar videos y sitios web con baja latencia a usuarios de todo el mundo usando una red de caché global. ¿Qué servicio usa?",
  "o": [
   "AWS Backup",
   "Amazon EFS",
   "Amazon EBS",
   "Amazon CloudFront"
  ],
  "a": [
   3
  ],
  "e": "Correcta: D. CloudFront cachea contenido en edge locations cercanas al usuario."
 },
 {
  "id": 49,
  "d": 3,
  "t": "single",
  "q": "Una aplicación recibe tráfico que debe repartirse automáticamente entre varias instancias EC2 en distintas AZ. ¿Qué servicio se usa?",
  "o": [
   "AWS Artifact",
   "Elastic Load Balancing",
   "AWS Snowball",
   "Amazon Macie"
  ],
  "a": [
   1
  ],
  "e": "Correcta: B. ELB distribuye el tráfico entrante entre destinos en varias AZ."
 },
 {
  "id": 50,
  "d": 3,
  "t": "single",
  "q": "¿Qué servicio añade o quita instancias EC2 automáticamente para mantener el rendimiento al menor costo?",
  "o": [
   "Amazon EC2 Auto Scaling",
   "AWS Organizations",
   "Amazon Inspector",
   "AWS KMS"
  ],
  "a": [
   0
  ],
  "e": "Correcta: A. Auto Scaling ajusta la capacidad según políticas y demanda."
 },
 {
  "id": 51,
  "d": 3,
  "t": "single",
  "q": "Una empresa quiere una conexión de red privada y dedicada entre su centro de datos y AWS que no pase por Internet pública. ¿Qué servicio usa?",
  "o": [
   "AWS Direct Connect",
   "Amazon Route 53",
   "AWS WAF",
   "Amazon CloudFront"
  ],
  "a": [
   0
  ],
  "e": "Correcta: A. Direct Connect ofrece un enlace dedicado y consistente. Una VPN usa Internet cifrada."
 },
 {
  "id": 52,
  "d": 3,
  "t": "single",
  "q": "¿Qué servicio recopila métricas, registros y permite crear alarmas para monitorear recursos y aplicaciones de AWS?",
  "o": [
   "AWS CloudTrail",
   "AWS Snowball",
   "AWS Artifact",
   "Amazon CloudWatch"
  ],
  "a": [
   3
  ],
  "e": "Correcta: D. CloudWatch es monitoreo y observabilidad. CloudTrail registra llamadas a API."
 },
 {
  "id": 53,
  "d": 3,
  "t": "single",
  "q": "Un equipo quiere definir su infraestructura en plantillas (infraestructura como código) y desplegarla de forma repetible. ¿Qué servicio usa?",
  "o": [
   "AWS CloudFormation",
   "Amazon Polly",
   "Amazon Lightsail",
   "AWS Shield"
  ],
  "a": [
   0
  ],
  "e": "Correcta: A. CloudFormation aprovisiona recursos a partir de plantillas JSON o YAML."
 },
 {
  "id": 54,
  "d": 3,
  "t": "single",
  "q": "Una arquitectura necesita desacoplar componentes usando una cola de mensajes para que el productor no dependa de que el consumidor esté disponible. ¿Qué servicio usa?",
  "o": [
   "Amazon Route 53",
   "Amazon VPC",
   "Amazon SQS",
   "AWS Config"
  ],
  "a": [
   2
  ],
  "e": "Correcta: C. SQS es una cola de mensajes administrada. SNS es publicación/suscripción (notificaciones)."
 },
 {
  "id": 55,
  "d": 3,
  "t": "single",
  "q": "Una empresa quiere ejecutar contenedores sin administrar los servidores subyacentes. ¿Qué opción de cómputo se lo permite?",
  "o": [
   "Amazon EBS",
   "AWS Fargate",
   "Amazon Macie",
   "AWS Snowcone"
  ],
  "a": [
   1
  ],
  "e": "Correcta: B. Fargate es un motor de cómputo serverless para contenedores con ECS y EKS."
 },
 {
  "id": 56,
  "d": 3,
  "t": "single",
  "q": "Una empresa quiere crear aplicaciones de IA generativa usando modelos de base (foundation models) de varios proveedores mediante una API administrada. ¿Qué servicio usa?",
  "o": [
   "Amazon Route 53",
   "Amazon EFS",
   "Amazon Bedrock",
   "AWS Direct Connect"
  ],
  "a": [
   2
  ],
  "e": "Correcta: C. Amazon Bedrock ofrece modelos de base a través de una API sin administrar infraestructura. SageMaker se usa para construir, entrenar y desplegar modelos de ML propios."
 },
 {
  "id": 57,
  "d": 3,
  "t": "multi",
  "q": "Seleccione DOS servicios de base de datos de AWS.",
  "o": [
   "Amazon DynamoDB",
   "Amazon SQS",
   "Amazon RDS",
   "Amazon SNS"
  ],
  "a": [
   0,
   2
  ],
  "e": "Correctas: C y A. RDS (relacional) y DynamoDB (NoSQL) son bases de datos. SQS es cola de mensajes y SNS es mensajería pub/sub."
 },
 {
  "id": 58,
  "d": 4,
  "t": "single",
  "q": "Una carga de trabajo estable y predecible se ejecutará durante los próximos 3 años. ¿Qué opción de precios reduce más el costo frente a On-Demand?",
  "o": [
   "Pagar siempre On-Demand",
   "Hosts dedicados sin compromiso",
   "Savings Plans o Instancias Reservadas",
   "Instancias Spot para todo"
  ],
  "a": [
   2
  ],
  "e": "Correcta: C. Los compromisos de 1 o 3 años (Savings Plans o RI) ofrecen grandes descuentos para uso constante. Spot puede interrumpirse."
 },
 {
  "id": 59,
  "d": 4,
  "t": "single",
  "q": "Una carga de trabajo tolera interrupciones (por ejemplo procesamiento por lotes) y busca el mayor ahorro posible. ¿Qué opción conviene?",
  "o": [
   "Plan de soporte Enterprise",
   "Instancias Spot",
   "Instancias On-Demand",
   "Instancias de host dedicado"
  ],
  "a": [
   1
  ],
  "e": "Correcta: B. Spot permite descuentos de hasta 90 %, pero AWS puede recuperar la capacidad con aviso."
 },
 {
  "id": 60,
  "d": 4,
  "t": "single",
  "q": "Una empresa quiere recibir una alerta cuando su gasto mensual supere un umbral definido. ¿Qué servicio usa?",
  "o": [
   "Amazon Inspector",
   "AWS Config",
   "AWS Artifact",
   "AWS Budgets"
  ],
  "a": [
   3
  ],
  "e": "Correcta: D. AWS Budgets permite fijar presupuestos y alertas de costo o uso."
 },
 {
  "id": 61,
  "d": 4,
  "t": "single",
  "q": "¿Qué herramienta permite visualizar y analizar los costos y el uso históricos de AWS, e identificar tendencias?",
  "o": [
   "AWS Pricing Calculator",
   "AWS Cost Explorer",
   "AWS Trusted Advisor",
   "AWS Snowball"
  ],
  "a": [
   1
  ],
  "e": "Correcta: B. Cost Explorer analiza gastos pasados y proyecta. Pricing Calculator estima costos antes de desplegar."
 },
 {
  "id": 62,
  "d": 4,
  "t": "single",
  "q": "Una empresa planea migrar una aplicación y quiere estimar cuánto costaría en AWS antes de desplegarla. ¿Qué herramienta usa?",
  "o": [
   "AWS Budgets",
   "AWS Pricing Calculator",
   "AWS Cost Explorer",
   "AWS CloudTrail"
  ],
  "a": [
   1
  ],
  "e": "Correcta: B. Pricing Calculator estima el costo de una arquitectura planeada."
 },
 {
  "id": 63,
  "d": 4,
  "t": "single",
  "q": "¿Cuál es el plan de AWS Support de menor nivel que incluye acceso a todos los chequeos de AWS Trusted Advisor y soporte técnico 24/7 por correo, chat y teléfono?",
  "o": [
   "Developer",
   "Business",
   "Free Tier",
   "Basic"
  ],
  "a": [
   1
  ],
  "e": "Correcta: B. Basic y Developer solo incluyen los chequeos centrales de Trusted Advisor. Business (o superior) incluye todos los chequeos y soporte 24/7. Free Tier no es un plan de soporte."
 },
 {
  "id": 64,
  "d": 4,
  "t": "single",
  "q": "Una organización con muchas cuentas quiere una sola factura y aprovechar descuentos por volumen combinando el uso de todas ellas. ¿Qué característica usa?",
  "o": [
   "Amazon Macie",
   "Elastic Load Balancing",
   "Facturación consolidada de AWS Organizations",
   "AWS Artifact"
  ],
  "a": [
   2
  ],
  "e": "Correcta: C. La facturación consolidada agrupa cuentas bajo un pagador y combina el uso para descuentos por volumen."
 },
 {
  "id": 65,
  "d": 4,
  "t": "multi",
  "q": "Seleccione DOS acciones que ayudan a optimizar costos en AWS.",
  "o": [
   "Apagar recursos que no se utilizan",
   "Sobreaprovisionar recursos \"por si acaso\"",
   "Dimensionar correctamente (right-sizing) las instancias",
   "Mantener recursos ociosos en producción"
  ],
  "a": [
   0,
   2
  ],
  "e": "Correctas: C y A. Right-sizing y eliminar o apagar recursos sin uso reducen costos. B y D aumentan el gasto sin aportar valor."
 }
];
