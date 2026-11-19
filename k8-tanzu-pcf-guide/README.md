# ☸️ Kubernetes, VMware Tanzu & PCF - Guía de Estudio

Guía completa e interactiva para dominar Kubernetes, VMware Tanzu y Pivotal Cloud Foundry (Cloud Foundry / TAS).

## 🚀 Despliegue en GitHub Pages

### Opción 1: GitHub Pages (directo)

1. Crear un repositorio en GitHub
2. Subir todos los archivos de esta carpeta
3. Ir a **Settings → Pages → Source → Deploy from a branch**
4. Seleccionar `main` branch y `/ (root)`
5. El sitio estará disponible en `https://<usuario>.github.io/<repo>/`

### Opción 2: Como subdirectorio en un repo existente

1. Copiar la carpeta a un repositorio existente
2. Configurar GitHub Pages apuntando al subdirectorio

---

## 📁 Estructura del Proyecto

```
k8s-tanzu-pcf-study-guide/
├── index.html                      # Sitio web principal (GitHub Pages)
├── styles.css                      # Estilos (tema dark + gold INTRADOS)
├── script.js                       # Interactividad (quiz, progreso, modals)
├── 01-kubernetes-fundamentals.md   # Dominio 1: K8s Fundamentos
├── 02-kubernetes-advanced.md       # Dominio 2: K8s Avanzado
├── 03-vmware-tanzu.md              # Dominio 3: VMware Tanzu
├── 04-pivotal-cloud-foundry.md     # Dominio 4: PCF / TAS
├── 05-cronograma.md                # Plan de estudio 10 semanas
├── 06-practice-exam.md             # Examen de práctica (60 preguntas)
└── README.md                       # Este archivo
```

---

## 📚 Dominios de Estudio

| # | Dominio | Peso | Temas Clave |
|---|---------|------|-------------|
| 1 | Kubernetes Fundamentos | 30% | Arquitectura, Pods, Services, Storage, RBAC |
| 2 | Kubernetes Avanzado | 20% | StatefulSets, HPA, Helm, Security, Scheduling |
| 3 | VMware Tanzu | 25% | TKG, TAP, TMC, Supply Chains, vSphere |
| 4 | Cloud Foundry / TAS | 25% | cf push, Buildpacks, Services, BOSH, Blue-Green |

---

## ✨ Funcionalidades del Sitio

- **Quiz interactivo** con 15 preguntas y feedback inmediato
- **Modal de contenido** por dominio con resumen visual
- **Cronograma visual** tipo timeline de 10 semanas
- **Tracker de progreso** con localStorage (persiste entre sesiones)
- **Navegación por teclado** en el quiz (A/B/C/D, flechas)
- **Responsive design** mobile-first
- **Tema dark + gold** inspirado en INTRADOS

---

## 🎯 Cronograma Resumen

| Semanas | Tema |
|---------|------|
| 1-2 | Kubernetes Fundamentos |
| 3-4 | Kubernetes Avanzado |
| 5-6 | VMware Tanzu |
| 7-8 | Cloud Foundry / TAS |
| 9 | Integración y Comparativas |
| 10 | Repaso + Exámenes de Práctica |

---

## 🛠️ Tecnologías

- HTML5 semántico
- CSS3 con variables custom y grid/flexbox
- JavaScript vanilla (sin dependencias)
- Google Fonts (Inter + JetBrains Mono)
- LocalStorage para persistencia de progreso
