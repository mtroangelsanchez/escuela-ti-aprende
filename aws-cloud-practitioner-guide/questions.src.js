/* Banco de preguntas CLF-C02 (original, estilo examen). 65 preguntas.
   Dominios: 1 Conceptos de la nube (24%), 2 Seguridad y cumplimiento (30%),
             3 Tecnología y servicios (34%), 4 Facturación, precios y soporte (12%).
   Formato: { d: dominio, t: 'single'|'multi', q, o: [opciones], a: [índices correctos], e: explicación } */
(function (root) {
  var Q = [];
  function add(d, t, q, o, a, e) { Q.push({ id: Q.length + 1, d: d, t: t, q: q, o: o, a: a, e: e }); }

  /* ========== DOMINIO 1: Conceptos de la nube (16) ========== */
  add(1, 'single', 'Una empresa migra a AWS y quiere dejar de hacer grandes inversiones iniciales en hardware. ¿Qué beneficio económico de la nube describe mejor esto?',
    ['Convertir gasto de capital (CapEx) en gasto variable (OpEx)', 'Firmar contratos de hardware a 5 años', 'Eliminar por completo cualquier factura de TI', 'Pagar por adelantado toda la capacidad futura'],
    [0], 'Correcta: A. En la nube se paga por lo que se consume (gasto variable) en lugar de comprar infraestructura por adelantado (CapEx). B y D son lo opuesto; C es falso, la nube no elimina costos, los hace variables.');

  add(1, 'single', 'Una tienda en línea recibe picos de tráfico en Navidad y casi nada el resto del año. Quiere que los recursos crezcan y se reduzcan automáticamente según la demanda. ¿Qué característica de la nube aprovecha?',
    ['Alta disponibilidad', 'Durabilidad', 'Elasticidad', 'Cumplimiento normativo'],
    [2], 'Correcta: C. Elasticidad es aumentar o reducir recursos de forma automática según la demanda. La alta disponibilidad busca evitar caídas, la durabilidad se refiere a no perder datos y el cumplimiento a normas.');

  add(1, 'single', '¿Qué es una Zona de Disponibilidad (AZ) de AWS?',
    ['Una ubicación de caché de CloudFront', 'Uno o más centros de datos discretos con energía, red y conectividad redundantes dentro de una Región', 'Un país donde AWS tiene oficinas', 'Una cuenta de AWS dedicada a un cliente'],
    [1], 'Correcta: B. Una Región contiene varias AZ aisladas entre sí. A describe una edge location; C y D no corresponden a la infraestructura global.');

  add(1, 'multi', 'Seleccione DOS pilares del AWS Well-Architected Framework.',
    ['Reliability (Fiabilidad)', 'Scalability (Escalabilidad)', 'Sustainability (Sostenibilidad)', 'Profitability (Rentabilidad)'],
    [0, 2], 'Correctas: A y C. Los pilares son: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization y Sustainability. Scalability y Profitability no son pilares.');

  add(1, 'single', '¿Cuál de las siguientes es una perspectiva del AWS Cloud Adoption Framework (AWS CAF)?',
    ['Marketing', 'Platform (Plataforma)', 'Hardware', 'Legal Audit'],
    [1], 'Correcta: B. Las seis perspectivas de CAF: Business, People, Governance, Platform, Security y Operations.');

  add(1, 'single', 'Una empresa mueve sus servidores a AWS sin cambiar el código ni la arquitectura (lift-and-shift). ¿Qué estrategia de migración es?',
    ['Refactor', 'Retire', 'Rehost', 'Repurchase'],
    [2], 'Correcta: C. Rehost = mover tal cual. Refactor rediseña la aplicación; Retire apaga lo que ya no se necesita; Repurchase cambia a un producto SaaS.');

  add(1, 'single', '¿Qué servicio permite entregar contenido con baja latencia usando ubicaciones cercanas a los usuarios finales (edge locations)?',
    ['Amazon CloudFront', 'AWS Direct Connect', 'Amazon EBS', 'AWS Organizations'],
    [0], 'Correcta: A. CloudFront es la CDN de AWS. Direct Connect es una conexión dedicada, EBS es almacenamiento por bloques y Organizations administra cuentas.');

  add(1, 'single', 'Para que una aplicación siga funcionando aunque falle un centro de datos completo, ¿qué debe hacer la empresa?',
    ['Usar una sola instancia grande en una AZ', 'Desplegar la aplicación en varias Zonas de Disponibilidad', 'Copiar los datos a un disco USB', 'Desactivar Auto Scaling'],
    [1], 'Correcta: B. Distribuir entre varias AZ da alta disponibilidad. Una sola AZ es un punto único de falla.');

  add(1, 'single', '¿Qué ventaja de la nube se refiere a que AWS reduce los precios gracias al volumen agregado de uso de todos sus clientes?',
    ['Economías de escala', 'Elasticidad', 'Agilidad', 'Tolerancia a fallos'],
    [0], 'Correcta: A. Al agregar el uso de cientos de miles de clientes, AWS logra economías de escala y precios más bajos de pago por uso.');

  add(1, 'single', 'Un equipo de desarrollo necesita probar una idea y quiere aprovisionar servidores en minutos en lugar de semanas. ¿Qué beneficio es?',
    ['Agilidad', 'Residencia de datos', 'Soporte Enterprise', 'Hardware dedicado'],
    [0], 'Correcta: A. La agilidad es poder experimentar y lanzar recursos rápidamente, lo que reduce el tiempo de comercialización.');

  add(1, 'multi', 'Una empresa debe elegir una Región de AWS. Seleccione DOS factores que debe considerar.',
    ['Latencia hacia los usuarios finales', 'El color del logotipo de la Región', 'Requisitos de residencia de datos y cumplimiento', 'Número de empleados de AWS en la Región'],
    [0, 2], 'Correctas: A y C. Los factores para elegir Región son cumplimiento/residencia de datos, latencia, costo y disponibilidad de servicios. B y D son irrelevantes.');

  add(1, 'single', 'Una empresa mantiene parte de su infraestructura en su centro de datos y otra parte en AWS, conectadas entre sí. ¿Qué modelo de implementación es?',
    ['Nube pública únicamente', 'Híbrido', 'Solo on-premises', 'Multi-cuenta'],
    [1], 'Correcta: B. Híbrido combina infraestructura on-premises con la nube (por ejemplo con Direct Connect, VPN o Outposts).');

  add(1, 'single', 'Una empresa antes compraba servidores calculando la capacidad "a ojo". ¿Qué beneficio de la nube resuelve esto?',
    ['Dejar de adivinar la capacidad: se ajusta según la demanda real', 'Eliminar la necesidad de seguridad', 'Garantizar costos fijos', 'Evitar el uso de redes'],
    [0], 'Correcta: A. Uno de los beneficios clásicos es "stop guessing capacity": se aprovisiona lo necesario y se ajusta.');

  add(1, 'single', '¿Qué herramienta de AWS permite revisar una carga de trabajo contra las mejores prácticas de los pilares del Well-Architected Framework?',
    ['AWS Well-Architected Tool', 'AWS Artifact', 'Amazon Inspector', 'AWS Snowball'],
    [0], 'Correcta: A. La Well-Architected Tool guía la revisión de cargas de trabajo. Artifact entrega reportes de cumplimiento, Inspector busca vulnerabilidades y Snowball transfiere datos físicos.');

  add(1, 'single', 'Una empresa lanza su aplicación en varios continentes en pocos clics para acercarla a clientes globales. ¿Qué beneficio es?',
    ['Despliegue global en minutos', 'Mayor CapEx', 'Hardware propio', 'Contratos a largo plazo'],
    [0], 'Correcta: A. "Go global in minutes": la infraestructura global permite desplegar en múltiples Regiones rápidamente.');

  add(1, 'single', 'Un sistema diseñado con Reliability en mente debe, ante todo:',
    ['Recuperarse de fallos y cumplir con la demanda', 'Ser el más barato posible sin importar las caídas', 'Tener solo un servidor', 'Evitar cualquier monitoreo'],
    [0], 'Correcta: A. El pilar de Fiabilidad trata de recuperarse de interrupciones, escalar para la demanda y mitigar fallos.');

  /* ========== DOMINIO 2: Seguridad y cumplimiento (19) ========== */
  add(2, 'single', 'En el modelo de responsabilidad compartida, ¿de qué es responsable AWS?',
    ['Parchear el sistema operativo invitado de las instancias EC2', 'La seguridad física de los centros de datos', 'Configurar los grupos de seguridad del cliente', 'Gestionar los usuarios de IAM del cliente'],
    [1], 'Correcta: B. AWS es responsable de la seguridad "DE" la nube (instalaciones, hardware, red global). El cliente lo es de la seguridad "EN" la nube (SO invitado, datos, IAM, firewall).');

  add(2, 'single', 'Una empresa ejecuta una aplicación en instancias Amazon EC2. ¿Quién es responsable de aplicar los parches del sistema operativo?',
    ['AWS', 'El cliente', 'Ambos por igual', 'Un tercero designado por AWS'],
    [1], 'Correcta: B. En EC2 (IaaS) el cliente administra el SO invitado, incluidos parches y actualizaciones.');

  add(2, 'single', 'Con Amazon RDS, ¿qué parte pasa a ser responsabilidad de AWS en comparación con instalar una base de datos en EC2?',
    ['Definir qué usuarios pueden consultar los datos', 'Parchear el motor de base de datos y el SO subyacente', 'Clasificar los datos almacenados', 'Cifrar los datos del lado del cliente'],
    [1], 'Correcta: B. RDS es un servicio administrado: AWS parchea el SO y el motor. El cliente sigue gestionando datos, accesos y configuración de seguridad.');

  add(2, 'single', '¿Cuál es la mejor práctica para el usuario raíz (root) de una cuenta de AWS?',
    ['Usarlo para las tareas diarias', 'Compartir sus credenciales con el equipo', 'Activar MFA y evitar usarlo salvo en tareas que lo exijan', 'Crear claves de acceso y guardarlas en el código'],
    [2], 'Correcta: C. Protege el root con MFA y úsalo únicamente para tareas que solo el root puede hacer. Las demás opciones son malas prácticas.');

  add(2, 'single', 'Una aplicación en EC2 necesita leer objetos de un bucket de S3 sin guardar claves de acceso en el servidor. ¿Qué debe usarse?',
    ['Un rol de IAM asociado a la instancia', 'Las credenciales del usuario raíz', 'Un archivo con claves en el disco', 'Un grupo de seguridad'],
    [0], 'Correcta: A. Los roles de IAM entregan credenciales temporales a la instancia. Un grupo de seguridad controla tráfico de red, no permisos de API.');

  add(2, 'single', '¿Qué principio indica conceder únicamente los permisos mínimos necesarios para realizar una tarea?',
    ['Mínimo privilegio', 'Alta disponibilidad', 'Elasticidad', 'Escalabilidad horizontal'],
    [0], 'Correcta: A. Least privilege es un principio central de IAM: se otorgan solo los permisos requeridos.');

  add(2, 'single', 'Una empresa quiere asignar los mismos permisos a 50 desarrolladores de forma sencilla. ¿Qué recurso de IAM es el más adecuado?',
    ['Un grupo de IAM', 'Un bucket de S3', 'Una VPC', 'Una clave de KMS'],
    [0], 'Correcta: A. Los grupos permiten asociar políticas a varios usuarios a la vez. Los roles son para identidades temporales o servicios.');

  add(2, 'multi', 'Seleccione DOS buenas prácticas de seguridad para el usuario raíz de una cuenta de AWS.',
    ['Habilitar la autenticación multifactor (MFA)', 'Crear claves de acceso para el root y usarlas en scripts', 'No crear claves de acceso para el root', 'Usar el root como cuenta de administración diaria'],
    [0, 2], 'Correctas: A y C. Habilita MFA y no crees claves de acceso para el root. B y D aumentan el riesgo.');

  add(2, 'single', '¿Qué servicio protege las aplicaciones contra ataques de denegación de servicio distribuido (DDoS)?',
    ['AWS Shield', 'AWS KMS', 'Amazon Macie', 'AWS Artifact'],
    [0], 'Correcta: A. AWS Shield (Standard automático y gratuito; Advanced con más protección) mitiga DDoS. KMS cifra, Macie descubre datos sensibles, Artifact entrega reportes.');

  add(2, 'single', '¿Qué servicio ayuda a bloquear ataques web comunes como inyección SQL y cross-site scripting (XSS)?',
    ['AWS WAF', 'Amazon GuardDuty', 'AWS CloudTrail', 'Amazon Route 53'],
    [0], 'Correcta: A. AWS WAF es un firewall de aplicaciones web (capa 7) con reglas configurables.');

  add(2, 'single', '¿Qué servicio detecta amenazas analizando registros de CloudTrail, VPC Flow Logs y DNS para identificar actividad maliciosa?',
    ['Amazon GuardDuty', 'AWS Config', 'AWS Trusted Advisor', 'Amazon EBS'],
    [0], 'Correcta: A. GuardDuty es detección inteligente de amenazas. Config evalúa configuraciones, Trusted Advisor da recomendaciones.');

  add(2, 'single', '¿Qué servicio analiza automáticamente instancias EC2, imágenes de contenedor y funciones Lambda en busca de vulnerabilidades de software?',
    ['Amazon Inspector', 'Amazon Macie', 'AWS Shield', 'AWS IAM'],
    [0], 'Correcta: A. Inspector escanea vulnerabilidades y exposición de red no deseada.');

  add(2, 'single', 'Una empresa quiere descubrir datos personales sensibles (PII) almacenados en buckets de S3. ¿Qué servicio debe usar?',
    ['Amazon Macie', 'Amazon Inspector', 'AWS WAF', 'Amazon CloudFront'],
    [0], 'Correcta: A. Macie utiliza machine learning para descubrir y proteger datos sensibles en S3.');

  add(2, 'single', 'Un auditor necesita saber quién eliminó un recurso y cuándo. ¿Qué servicio registra las llamadas a la API de la cuenta?',
    ['AWS CloudTrail', 'Amazon CloudWatch Alarms', 'AWS Budgets', 'Amazon SNS'],
    [0], 'Correcta: A. CloudTrail registra la actividad de la cuenta (quién, qué, cuándo, desde dónde). CloudWatch monitorea métricas y logs de aplicaciones.');

  add(2, 'single', 'Una empresa necesita descargar los reportes de cumplimiento de AWS (por ejemplo, SOC e ISO) para una auditoría. ¿Dónde los obtiene?',
    ['AWS Artifact', 'AWS Cost Explorer', 'Amazon Inspector', 'AWS Shield'],
    [0], 'Correcta: A. AWS Artifact es el portal de autoservicio de reportes de cumplimiento y acuerdos.');

  add(2, 'single', '¿Qué servicio permite crear y administrar las claves de cifrado usadas para proteger los datos?',
    ['AWS Key Management Service (AWS KMS)', 'Amazon Route 53', 'AWS Snowball', 'Amazon SQS'],
    [0], 'Correcta: A. KMS crea y controla claves criptográficas e integra con muchos servicios.');

  add(2, 'single', '¿Qué afirmación describe correctamente un grupo de seguridad (security group) de una instancia EC2?',
    ['Es un firewall con estado a nivel de instancia que solo permite reglas de "permitir"', 'Es un servicio de antivirus', 'Es un firewall sin estado a nivel de subred', 'Reemplaza a IAM'],
    [0], 'Correcta: A. Los grupos de seguridad son stateful y actúan a nivel de instancia/ENI. Las NACL son stateless y actúan a nivel de subred.');

  add(2, 'single', 'Una aplicación debe obtener credenciales de base de datos que se roten automáticamente sin cambiar el código. ¿Qué servicio ayuda?',
    ['AWS Secrets Manager', 'Amazon S3 Glacier', 'AWS CloudFormation', 'Amazon Rekognition'],
    [0], 'Correcta: A. Secrets Manager almacena secretos y soporta rotación automática.');

  add(2, 'single', 'Una empresa con muchas cuentas de AWS quiere que sus empleados inicien sesión una sola vez y accedan a todas las cuentas y aplicaciones asignadas. ¿Qué servicio usa?',
    ['AWS IAM Identity Center', 'Amazon Inspector', 'AWS Shield', 'Amazon Macie'],
    [0], 'Correcta: A. IAM Identity Center ofrece inicio de sesión único (SSO) centralizado para varias cuentas y aplicaciones. Las otras opciones son servicios de seguridad con otro propósito.');

  /* ========== DOMINIO 3: Tecnología y servicios (22) ========== */
  add(3, 'single', '¿Qué servicio ofrece servidores virtuales redimensionables en la nube?',
    ['Amazon EC2', 'Amazon S3', 'Amazon SNS', 'AWS IAM'],
    [0], 'Correcta: A. EC2 proporciona capacidad de cómputo virtual. S3 es almacenamiento de objetos.');

  add(3, 'single', 'Una empresa quiere ejecutar código en respuesta a eventos sin administrar servidores y pagando solo por el tiempo de ejecución. ¿Qué servicio usa?',
    ['AWS Lambda', 'Amazon EC2', 'Amazon Lightsail', 'AWS Direct Connect'],
    [0], 'Correcta: A. Lambda es cómputo serverless basado en eventos.');

  add(3, 'single', '¿Qué servicio es almacenamiento de objetos de alta durabilidad, ideal para imágenes, respaldos y sitios web estáticos?',
    ['Amazon S3', 'Amazon EBS', 'Amazon RDS', 'Amazon VPC'],
    [0], 'Correcta: A. S3 almacena objetos en buckets con durabilidad de 11 nueves.');

  add(3, 'single', '¿Qué servicio ofrece volúmenes de almacenamiento por bloques para usar con instancias EC2?',
    ['Amazon EBS', 'Amazon S3', 'Amazon Glacier', 'Amazon SQS'],
    [0], 'Correcta: A. EBS es almacenamiento por bloques persistente, como un disco duro virtual para EC2.');

  add(3, 'single', 'Varias instancias Linux necesitan compartir un mismo sistema de archivos que crece y se reduce automáticamente. ¿Qué servicio usan?',
    ['Amazon EFS', 'Amazon EBS', 'AWS Snowball', 'Amazon Redshift'],
    [0], 'Correcta: A. EFS es un sistema de archivos NFS elástico y compartido. Un volumen EBS normalmente se asocia a una sola instancia.');

  add(3, 'single', 'Una empresa debe conservar datos de archivo durante años al menor costo posible, con acceso poco frecuente y recuperación en horas. ¿Qué clase usa?',
    ['S3 Standard', 'S3 Glacier Deep Archive', 'Amazon EBS gp3', 'Amazon DynamoDB'],
    [1], 'Correcta: B. S3 Glacier Deep Archive es la clase de almacenamiento de menor costo para archivo a largo plazo. S3 Standard es para acceso frecuente.');

  add(3, 'single', '¿Qué servicio es una base de datos relacional administrada que se encarga de respaldos y parches?',
    ['Amazon RDS', 'Amazon DynamoDB', 'Amazon S3', 'Amazon EFS'],
    [0], 'Correcta: A. RDS simplifica operar bases de datos relacionales (MySQL, PostgreSQL, SQL Server, Oracle, MariaDB).');

  add(3, 'single', '¿Qué servicio es una base de datos NoSQL clave-valor sin servidor con latencia de milisegundos de un dígito a cualquier escala?',
    ['Amazon DynamoDB', 'Amazon RDS', 'Amazon Redshift', 'Amazon Aurora'],
    [0], 'Correcta: A. DynamoDB es NoSQL totalmente administrada y sin servidor.');

  add(3, 'single', '¿Qué base de datos relacional de AWS es compatible con MySQL y PostgreSQL y está diseñada para alto rendimiento y disponibilidad en la nube?',
    ['Amazon Aurora', 'Amazon ElastiCache', 'Amazon Neptune', 'Amazon DynamoDB'],
    [0], 'Correcta: A. Aurora es compatible con MySQL y PostgreSQL. Neptune es de grafos y ElastiCache es caché en memoria.');

  add(3, 'single', 'Una empresa necesita analizar petabytes de datos estructurados con consultas SQL complejas. ¿Qué servicio es el indicado?',
    ['Amazon Redshift', 'Amazon DynamoDB', 'AWS Lambda', 'Amazon SNS'],
    [0], 'Correcta: A. Redshift es un data warehouse para analítica a gran escala.');

  add(3, 'single', '¿Qué servicio permite crear una red virtual aislada de forma lógica dentro de AWS, con control de subredes y tablas de enrutamiento?',
    ['Amazon VPC', 'Amazon CloudFront', 'AWS Shield', 'Amazon SES'],
    [0], 'Correcta: A. Amazon VPC es la red privada virtual del cliente en AWS.');

  add(3, 'single', '¿Qué servicio es un DNS escalable y altamente disponible que además puede enrutar usuarios según latencia o salud?',
    ['Amazon Route 53', 'AWS Direct Connect', 'Elastic Load Balancing', 'AWS Transit Gateway'],
    [0], 'Correcta: A. Route 53 es el servicio DNS de AWS con varias políticas de enrutamiento.');

  add(3, 'single', 'Una empresa necesita entregar videos y sitios web con baja latencia a usuarios de todo el mundo usando una red de caché global. ¿Qué servicio usa?',
    ['Amazon CloudFront', 'Amazon EBS', 'AWS Backup', 'Amazon EFS'],
    [0], 'Correcta: A. CloudFront cachea contenido en edge locations cercanas al usuario.');

  add(3, 'single', 'Una aplicación recibe tráfico que debe repartirse automáticamente entre varias instancias EC2 en distintas AZ. ¿Qué servicio se usa?',
    ['Elastic Load Balancing', 'Amazon Macie', 'AWS Artifact', 'AWS Snowball'],
    [0], 'Correcta: A. ELB distribuye el tráfico entrante entre destinos en varias AZ.');

  add(3, 'single', '¿Qué servicio añade o quita instancias EC2 automáticamente para mantener el rendimiento al menor costo?',
    ['Amazon EC2 Auto Scaling', 'AWS Organizations', 'Amazon Inspector', 'AWS KMS'],
    [0], 'Correcta: A. Auto Scaling ajusta la capacidad según políticas y demanda.');

  add(3, 'single', 'Una empresa quiere una conexión de red privada y dedicada entre su centro de datos y AWS que no pase por Internet pública. ¿Qué servicio usa?',
    ['AWS Direct Connect', 'Amazon CloudFront', 'Amazon Route 53', 'AWS WAF'],
    [0], 'Correcta: A. Direct Connect ofrece un enlace dedicado y consistente. Una VPN usa Internet cifrada.');

  add(3, 'single', '¿Qué servicio recopila métricas, registros y permite crear alarmas para monitorear recursos y aplicaciones de AWS?',
    ['Amazon CloudWatch', 'AWS CloudTrail', 'AWS Artifact', 'AWS Snowball'],
    [0], 'Correcta: A. CloudWatch es monitoreo y observabilidad. CloudTrail registra llamadas a API.');

  add(3, 'single', 'Un equipo quiere definir su infraestructura en plantillas (infraestructura como código) y desplegarla de forma repetible. ¿Qué servicio usa?',
    ['AWS CloudFormation', 'Amazon Lightsail', 'AWS Shield', 'Amazon Polly'],
    [0], 'Correcta: A. CloudFormation aprovisiona recursos a partir de plantillas JSON o YAML.');

  add(3, 'single', 'Una arquitectura necesita desacoplar componentes usando una cola de mensajes para que el productor no dependa de que el consumidor esté disponible. ¿Qué servicio usa?',
    ['Amazon SQS', 'Amazon Route 53', 'AWS Config', 'Amazon VPC'],
    [0], 'Correcta: A. SQS es una cola de mensajes administrada. SNS es publicación/suscripción (notificaciones).');

  add(3, 'single', 'Una empresa quiere ejecutar contenedores sin administrar los servidores subyacentes. ¿Qué opción de cómputo se lo permite?',
    ['AWS Fargate', 'Amazon EBS', 'AWS Snowcone', 'Amazon Macie'],
    [0], 'Correcta: A. Fargate es un motor de cómputo serverless para contenedores con ECS y EKS.');

  add(3, 'single', 'Una empresa quiere crear aplicaciones de IA generativa usando modelos de base (foundation models) de varios proveedores mediante una API administrada. ¿Qué servicio usa?',
    ['Amazon Bedrock', 'Amazon Route 53', 'AWS Direct Connect', 'Amazon EFS'],
    [0], 'Correcta: A. Amazon Bedrock ofrece modelos de base a través de una API sin administrar infraestructura. SageMaker se usa para construir, entrenar y desplegar modelos de ML propios.');

  add(3, 'multi', 'Seleccione DOS servicios de base de datos de AWS.',
    ['Amazon RDS', 'Amazon SQS', 'Amazon DynamoDB', 'Amazon SNS'],
    [0, 2], 'Correctas: A y C. RDS (relacional) y DynamoDB (NoSQL) son bases de datos. SQS es cola de mensajes y SNS es mensajería pub/sub.');

  /* ========== DOMINIO 4: Facturación, precios y soporte (8) ========== */
  add(4, 'single', 'Una carga de trabajo estable y predecible se ejecutará durante los próximos 3 años. ¿Qué opción de precios reduce más el costo frente a On-Demand?',
    ['Savings Plans o Instancias Reservadas', 'Instancias Spot para todo', 'Pagar siempre On-Demand', 'Hosts dedicados sin compromiso'],
    [0], 'Correcta: A. Los compromisos de 1 o 3 años (Savings Plans o RI) ofrecen grandes descuentos para uso constante. Spot puede interrumpirse.');

  add(4, 'single', 'Una carga de trabajo tolera interrupciones (por ejemplo procesamiento por lotes) y busca el mayor ahorro posible. ¿Qué opción conviene?',
    ['Instancias Spot', 'Instancias On-Demand', 'Instancias de host dedicado', 'Plan de soporte Enterprise'],
    [0], 'Correcta: A. Spot permite descuentos de hasta 90 %, pero AWS puede recuperar la capacidad con aviso.');

  add(4, 'single', 'Una empresa quiere recibir una alerta cuando su gasto mensual supere un umbral definido. ¿Qué servicio usa?',
    ['AWS Budgets', 'AWS Artifact', 'Amazon Inspector', 'AWS Config'],
    [0], 'Correcta: A. AWS Budgets permite fijar presupuestos y alertas de costo o uso.');

  add(4, 'single', '¿Qué herramienta permite visualizar y analizar los costos y el uso históricos de AWS, e identificar tendencias?',
    ['AWS Cost Explorer', 'AWS Pricing Calculator', 'AWS Trusted Advisor', 'AWS Snowball'],
    [0], 'Correcta: A. Cost Explorer analiza gastos pasados y proyecta. Pricing Calculator estima costos antes de desplegar.');

  add(4, 'single', 'Una empresa planea migrar una aplicación y quiere estimar cuánto costaría en AWS antes de desplegarla. ¿Qué herramienta usa?',
    ['AWS Pricing Calculator', 'AWS Cost Explorer', 'AWS Budgets', 'AWS CloudTrail'],
    [0], 'Correcta: A. Pricing Calculator estima el costo de una arquitectura planeada.');

  add(4, 'single', '¿Cuál es el plan de AWS Support de menor nivel que incluye acceso a todos los chequeos de AWS Trusted Advisor y soporte técnico 24/7 por correo, chat y teléfono?',
    ['Basic', 'Developer', 'Business', 'Free Tier'],
    [2], 'Correcta: C. Basic y Developer solo incluyen los chequeos centrales de Trusted Advisor. Business (o superior) incluye todos los chequeos y soporte 24/7. Free Tier no es un plan de soporte.');

  add(4, 'single', 'Una organización con muchas cuentas quiere una sola factura y aprovechar descuentos por volumen combinando el uso de todas ellas. ¿Qué característica usa?',
    ['Facturación consolidada de AWS Organizations', 'AWS Artifact', 'Amazon Macie', 'Elastic Load Balancing'],
    [0], 'Correcta: A. La facturación consolidada agrupa cuentas bajo un pagador y combina el uso para descuentos por volumen.');

  add(4, 'multi', 'Seleccione DOS acciones que ayudan a optimizar costos en AWS.',
    ['Dimensionar correctamente (right-sizing) las instancias', 'Sobreaprovisionar recursos "por si acaso"', 'Apagar recursos que no se utilizan', 'Mantener recursos ociosos en producción'],
    [0, 2], 'Correctas: A y C. Right-sizing y eliminar o apagar recursos sin uso reducen costos. B y D aumentan el gasto sin aportar valor.');

  root.QUESTIONS = Q;
  if (typeof module !== 'undefined' && module.exports) { module.exports = Q; }
})(typeof window !== 'undefined' ? window : globalThis);
