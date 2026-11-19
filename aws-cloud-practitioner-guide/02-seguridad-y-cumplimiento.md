# Dominio 2: Seguridad y cumplimiento (30 %)

Cerca de 19 preguntas. Dominio con más trampas de "¿quién es responsable de qué?".

## 2.1 Modelo de responsabilidad compartida
- **AWS**: seguridad **DE** la nube. Instalaciones físicas, hardware, red global, hipervisor, software de servicios administrados.
- **Cliente**: seguridad **EN** la nube. Datos, IAM, SO invitado y parches (en EC2), firewall (security groups), cifrado, configuración.

| Servicio | AWS administra | Cliente administra |
|---|---|---|
| EC2 (IaaS) | Hardware, hipervisor | SO invitado, parches, apps, security groups, datos |
| RDS (administrado) | SO, parches del motor, respaldos | Datos, accesos, parámetros, red |
| S3 / DynamoDB | Infraestructura, durabilidad | Permisos, cifrado, clasificación de datos |
| Lambda | SO, runtime, escalado | Código y permisos |

**Controles heredados**: seguridad física. **Controles compartidos**: gestión de parches, configuración, capacitación. **Específicos del cliente**: zonas de cumplimiento de datos propias.

## 2.2 IAM (Identity and Access Management)
- **Usuario**: identidad con credenciales a largo plazo. **Grupo**: conjunto de usuarios. **Rol**: identidad con credenciales temporales (servicios, otras cuentas, federación). **Política**: documento JSON de permisos.
- **Mínimo privilegio**: solo los permisos necesarios.
- **Usuario raíz (root)**: activa MFA, no lo uses a diario, no crees claves de acceso para él.
- **MFA**, políticas de contraseñas y **rotación de claves**.
- **Rol de IAM para EC2** en lugar de guardar claves en la instancia.
- **IAM Identity Center**: inicio de sesión único (SSO) para múltiples cuentas y apps.
- **AWS Organizations + SCP**: límites de permisos para cuentas de la organización.
- **Amazon Cognito**: identidad de usuarios finales de tus aplicaciones.

## 2.3 Protección de datos
- **Cifrado en reposo y en tránsito**. **AWS KMS** administra claves; **CloudHSM** ofrece HSM dedicado.
- **AWS Certificate Manager (ACM)**: certificados TLS/SSL.
- **AWS Secrets Manager**: guarda y rota secretos. **Parameter Store**: parámetros y configuración.
- **Amazon Macie**: descubre datos sensibles (PII) en S3.

## 2.4 Seguridad de red
- **Security groups**: firewall con estado a nivel de instancia, solo reglas "permitir".
- **Network ACL (NACL)**: firewall **sin estado** a nivel de subred, permite y deniega.
- **AWS WAF**: bloquea ataques web (SQL injection, XSS).
- **AWS Shield**: protección DDoS (Standard gratis; Advanced de pago).
- **AWS Firewall Manager**: administra reglas de WAF/Shield entre cuentas.
- **VPN y Direct Connect**: conectividad privada.

## 2.5 Monitoreo, detección y auditoría
| Servicio | Para qué |
|---|---|
| CloudTrail | Registra llamadas a la API (quién, qué, cuándo) |
| CloudWatch | Métricas, logs y alarmas |
| AWS Config | Historial y cumplimiento de configuraciones de recursos |
| GuardDuty | Detección de amenazas inteligente |
| Inspector | Escaneo de vulnerabilidades (EC2, ECR, Lambda) |
| Security Hub | Vista centralizada de hallazgos de seguridad |
| Detective | Investigar la causa de un hallazgo |
| Trusted Advisor | Recomendaciones de costo, seguridad, rendimiento, límites y tolerancia a fallos |
| Amazon Macie | Datos sensibles en S3 |

## 2.6 Cumplimiento y gobernanza
- **AWS Artifact**: reportes de cumplimiento (SOC, ISO, PCI) y acuerdos (BAA) de descarga.
- **AWS Audit Manager**: automatiza la recolección de evidencia para auditorías.
- **Cumplimiento por Región**: los datos no salen de la Región a menos que tú lo decidas.
- **AWS Control Tower**: configura una landing zone multicuenta con barreras de protección.

## 2.7 Otros recursos de soporte de seguridad
- **AWS Security Blog, Knowledge Center, Security Bulletins, AWS Support**.
- **Informar abuso o actividad sospechosa**: AWS Trust & Safety / abuse report.
- **Pruebas de penetración**: permitidas en ciertos servicios sin aprobación previa, siguiendo la política vigente.

## Trampas frecuentes
- "Parchear el SO de EC2" = **cliente**. "Parchear el SO de RDS" = **AWS**.
- Security group = **stateful**; NACL = **stateless**.
- CloudTrail = **auditoría de API**; CloudWatch = **monitoreo**.
- Artifact = **reportes de cumplimiento**, no escaneo de vulnerabilidades.

## Checklist del dominio
- [ ] Explico la responsabilidad compartida con ejemplos EC2/RDS/S3
- [ ] Conozco las buenas prácticas del usuario root y MFA
- [ ] Distingo GuardDuty, Inspector, Macie, Shield, WAF y Config
- [ ] Sé cuándo usar KMS vs Secrets Manager vs ACM
- [ ] Sé dónde descargar reportes de cumplimiento
