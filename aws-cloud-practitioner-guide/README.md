# Guía de estudio AWS Certified Cloud Practitioner (CLF-C02)

Material para preparar el examen **AWS Certified Cloud Practitioner**, con guía por dominios, cronograma, simulador cronometrado y complemento con Skill Builder.

## Datos del examen
| Concepto | Valor |
|---|---|
| Código | CLF-C02 |
| Preguntas | 65 (50 puntúan, 15 son de prueba y no se identifican) |
| Tiempo | 90 minutos |
| Formato | Opción única y respuesta múltiple |
| Puntaje | Escala de 100 a 1000, aprobación en 700 |
| Costo | 100 USD (puede variar por país) |

> Verifica los datos vigentes en la [guía oficial del examen](https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02.html) antes de agendar.

## Dominios y peso
| Dominio | Peso | Archivo |
|---|---|---|
| 1. Conceptos de la nube | 24 % | [01-conceptos-de-la-nube.md](01-conceptos-de-la-nube.md) |
| 2. Seguridad y cumplimiento | 30 % | [02-seguridad-y-cumplimiento.md](02-seguridad-y-cumplimiento.md) |
| 3. Tecnología y servicios de la nube | 34 % | [03-tecnologia-y-servicios.md](03-tecnologia-y-servicios.md) |
| 4. Facturación, precios y soporte | 12 % | [04-facturacion-precios-y-soporte.md](04-facturacion-precios-y-soporte.md) |

## Contenido de la carpeta
| Archivo | Descripción |
|---|---|
| `guia.html` | Toda la guía en un solo documento HTML con navegación |
| `exam.html` | **Simulador**: 65 preguntas, cronómetro de 90 min, marcar para revisar, puntaje y explicaciones |
| `06-practice-exam.md` | El mismo examen en Markdown con clave y explicaciones |
| [05-cronograma.md](05-cronograma.md) | Plan de 3 semanas y estrategia del examen |
| [07-skill-builder.md](07-skill-builder.md) | Cómo complementar con AWS Skill Builder |
| `questions.src.js` | Fuente editable del banco de preguntas |
| `build.js` | Regenera `questions.js`, `06-practice-exam.md` y `guia.html` |

## Cómo usarlo
1. Abre `guia.html` (doble clic) o lee los `.md`.
2. Sigue el [cronograma](05-cronograma.md).
3. Abre `exam.html` en el navegador y haz el simulacro en condiciones reales.
4. Revisa cada error con su explicación y regresa a la guía del dominio.
5. Complementa con [Skill Builder](07-skill-builder.md) para el set de práctica oficial.

## Regenerar archivos tras editar preguntas
```
node build.js
```

## Aviso sobre el simulador
Las preguntas son originales, escritas al estilo del examen, y no son preguntas reales del examen ni de ningún proveedor de simulacros. El puntaje escalado es una **estimación**: AWS no publica la fórmula exacta ni qué preguntas puntúan. Usa también el material oficial de Skill Builder como medida de referencia.
