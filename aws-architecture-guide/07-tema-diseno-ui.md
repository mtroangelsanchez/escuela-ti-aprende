# 🎨 Tema de Diseño UI - Inspirado en INTRADOS

## Descripción General

Este documento describe el tema de diseño UI/UX utilizado en el sitio web de la guía de estudio,
inspirado en el estilo visual del sitio web de INTRADOS (diseño de interiores). El tema combina
elegancia oscura con acentos dorados para crear una experiencia visual profesional y moderna.

---

## Filosofía de Diseño

### Principios Fundamentales

1. **Elegancia Oscura**: Fondos oscuros que transmiten sofisticación y reducen fatiga visual
2. **Acentos Dorados**: Color oro/amarillo como acento que evoca lujo y calidad
3. **Tipografía Limpia**: Fuentes sans-serif modernas con jerarquía clara
4. **Espacios Amplios**: Uso generoso de whitespace para respiración visual
5. **Cards como Unidad**: Contenido organizado en tarjetas con bordes sutiles

---

## Paleta de Colores

```
┌─────────────────────────────────────────────────────────────┐
│              PALETA DE COLORES                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Fondos:                                                    │
│  ├── Principal:    #1a1a2e (azul muy oscuro)               │
│  ├── Secundario:   #16213e (azul oscuro)                   │
│  ├── Tarjetas:     #0f3460 (azul medio oscuro)             │
│  └── Superficie:   #1a1a3e (variante oscura)               │
│                                                             │
│  Acentos:                                                   │
│  ├── Primario:     #f5a623 (oro/dorado)                    │
│  ├── Hover:        #ffc107 (amarillo brillante)            │
│  ├── Suave:        #f5a62333 (oro con transparencia)       │
│  └── Gradiente:    #f5a623 → #ff6b35 (oro a naranja)      │
│                                                             │
│  Texto:                                                     │
│  ├── Principal:    #ffffff (blanco)                         │
│  ├── Secundario:   #b8b8cc (gris claro)                    │
│  ├── Muted:        #8888aa (gris medio)                    │
│  └── Sobre acento: #1a1a2e (oscuro sobre dorado)           │
│                                                             │
│  Estados:                                                   │
│  ├── Éxito:        #4caf50 (verde)                         │
│  ├── Error:        #f44336 (rojo)                          │
│  ├── Advertencia:  #ff9800 (naranja)                       │
│  └── Info:         #2196f3 (azul)                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Tipografía

### Fuentes

| Uso | Fuente | Peso | Tamaño |
|-----|--------|------|--------|
| Títulos H1 | Inter / Poppins | 700 (Bold) | 3rem - 4rem |
| Títulos H2 | Inter / Poppins | 600 (SemiBold) | 2rem - 2.5rem |
| Títulos H3 | Inter / Poppins | 600 (SemiBold) | 1.5rem |
| Cuerpo | Inter | 400 (Regular) | 1rem (16px) |
| Código | JetBrains Mono / Fira Code | 400 | 0.9rem |
| Etiquetas | Inter | 500 (Medium) | 0.75rem |
| Navegación | Inter | 500 (Medium) | 0.9rem |

### Jerarquía Tipográfica

```css
/* Hero Section */
.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

/* Section Titles */
.section-title {
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 600;
  line-height: 1.2;
}

/* Body Text */
.body-text {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.7;
  color: #b8b8cc;
}
```

---

## Componentes UI

### 1. Hero Section

Inspirada en INTRADOS: imagen/video de fondo con overlay oscuro, título grande centrado,
y un botón de acción dorado.

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│              [Video/Imagen de fondo con overlay]             │
│                                                             │
│                                                             │
│           TÍTULO PRINCIPAL GRANDE                            │
│           Subtítulo descriptivo en gris claro               │
│                                                             │
│              [ ▶ Comenzar Ahora ]                           │
│                    (botón dorado)                            │
│                                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Características:**
- Fondo con gradiente oscuro o imagen con overlay al 70%
- Título en blanco con font-weight: 700
- Botón con borde dorado y efecto hover con fill
- Posible botón de play para video (círculo con triángulo)

### 2. Tarjetas (Cards)

```
┌─────────────────────────────────┐
│                                 │
│  🔒  [Ícono/Número]            │
│                                 │
│  Título de la Tarjeta           │
│  ─────────────────── (línea    │
│                       dorada)   │
│  Descripción breve del          │
│  contenido de esta sección      │
│  con texto en gris claro.       │
│                                 │
│  [Ver más →]                    │
│   (enlace dorado)              │
│                                 │
└─────────────────────────────────┘

Estilos:
- Background: #16213e o rgba(255,255,255,0.03)
- Border: 1px solid rgba(245,166,35,0.2)
- Border-radius: 12px
- Padding: 2rem
- Hover: border-color #f5a623, transform translateY(-4px)
- Box-shadow en hover: 0 8px 32px rgba(245,166,35,0.1)
```

### 3. Navegación

Inspirada en INTRADOS: navegación limpia con logo a la izquierda, links centrados,
y un botón de búsqueda/CTA a la derecha.

```
┌─────────────────────────────────────────────────────────────┐
│  LOGO    |  Inicio  Dominios  Cronograma  Examen  |  🔍    │
└─────────────────────────────────────────────────────────────┘

Estilos:
- Background: rgba(26,26,46,0.95) con backdrop-filter: blur(10px)
- Position: fixed, top: 0
- Border-bottom: 1px solid rgba(245,166,35,0.1)
- Links: color blanco, hover dorado con underline animada
- Transición suave al hacer scroll (aparece/desaparece)
```

### 4. Secciones de Contenido

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ── ETIQUETA DORADA ──                                      │
│                                                             │
│  Título de Sección Grande                                   │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │  Card 1  │  │  Card 2  │  │  Card 3  │                 │
│  │          │  │          │  │          │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │  Card 4  │  │  Card 5  │  │  Card 6  │                 │
│  │          │  │          │  │          │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Grid: display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
Gap: 2rem
```

### 5. Barra de Progreso

```
┌─────────────────────────────────────────────────────────────┐
│  Progreso del Estudio                                       │
│  ████████████████░░░░░░░░░░░░░░  45%                       │
│  (gradiente dorado sobre fondo oscuro)                      │
└─────────────────────────────────────────────────────────────┘

Estilos:
- Track: background #0f3460, border-radius: 10px
- Fill: background linear-gradient(90deg, #f5a623, #ffc107)
- Height: 8px
- Animación: width transition 0.5s ease
```

### 6. Acordeones/Collapsibles (para preguntas)

```
┌─────────────────────────────────────────────────────────────┐
│  ▶ Pregunta 1: ¿Cuál es la mejor práctica para...?    [+]  │
├─────────────────────────────────────────────────────────────┤
│  (contenido oculto, se expande al hacer clic)               │
│                                                             │
│  Respuesta: B                                               │
│  Explicación detallada...                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Estilos:
- Header: padding 1.5rem, cursor pointer
- Ícono: rotación 90° al expandir
- Contenido: max-height animado, overflow hidden
- Border-left: 3px solid #f5a623 cuando está activo
```

---

## Efectos y Animaciones

### Transiciones

```css
/* Hover suave en cards */
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

/* Fade in al scroll */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Underline animada en links */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: #f5a623;
  transition: width 0.3s ease;
}
.nav-link:hover::after {
  width: 100%;
}
```

### Micro-interacciones

- Botones: scale(1.02) en hover, scale(0.98) en active
- Cards: translateY(-4px) en hover con sombra expandida
- Checkboxes: animación de check con stroke-dasharray
- Progreso: animación de llenado al entrar en viewport
- Números/estadísticas: counter animation al ser visibles

---

## Responsive Design

### Breakpoints

| Breakpoint | Ancho | Columnas Grid | Navegación |
|-----------|-------|---------------|------------|
| Mobile | < 768px | 1 columna | Hamburger menu |
| Tablet | 768px - 1024px | 2 columnas | Compacta |
| Desktop | 1024px - 1440px | 3 columnas | Completa |
| Wide | > 1440px | 3-4 columnas | Completa + espaciado extra |

### Mobile First

```css
/* Base (mobile) */
.grid { grid-template-columns: 1fr; }

/* Tablet */
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop */
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

---

## Inspiración INTRADOS - Elementos Específicos

### Del sitio INTRADOS que se replican:

1. **Fondo oscuro dominante** con contenido que "flota" sobre él
2. **Líneas doradas** como separadores y acentos decorativos
3. **Tipografía grande y bold** para títulos principales
4. **Grid de proyectos** con hover que revela información
5. **Botón de play circular** para contenido multimedia
6. **Navegación minimalista** con efecto de transparencia
7. **Footer con columnas** organizadas y links dorados
8. **Números grandes** como indicadores de sección (01, 02, 03...)
9. **Imágenes con overlay** gradiente oscuro
10. **Scroll suave** entre secciones con snap points

### Adaptación para Educación:

- Cards de dominio con porcentaje de peso del examen
- Barra de progreso de estudio
- Indicadores de completado (checkmarks dorados)
- Quiz interactivo con feedback visual (verde/rojo)
- Cronograma visual tipo timeline
- Estadísticas de rendimiento en exámenes de práctica

---

## Accesibilidad

- Contraste mínimo WCAG AA: texto blanco sobre fondos oscuros (ratio > 4.5:1)
- Focus visible con outline dorado para navegación por teclado
- Aria-labels en elementos interactivos
- Reducción de movimiento respetada (prefers-reduced-motion)
- Texto escalable (rem units)
- Skip navigation link para lectores de pantalla
