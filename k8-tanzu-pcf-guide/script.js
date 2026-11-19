/**
 * Kubernetes, Tanzu & PCF - Study Guide
 * Interactive JavaScript functionality
 */

// ============================================
// QUIZ DATA
// ============================================
const quizQuestions = [
    {
        question: "¿Cuál componente del Control Plane de Kubernetes almacena todo el estado del cluster?",
        options: [
            "kube-apiserver",
            "kube-scheduler",
            "etcd",
            "kube-controller-manager"
        ],
        correct: 2,
        explanation: "etcd es la base de datos clave-valor distribuida que almacena todo el estado del cluster. Es el único componente stateful del control plane.",
        domain: "Kubernetes"
    },
    {
        question: "¿Qué tipo de Service es el default cuando no se especifica en Kubernetes?",
        options: [
            "NodePort",
            "LoadBalancer",
            "ExternalName",
            "ClusterIP"
        ],
        correct: 3,
        explanation: "ClusterIP es el tipo por defecto. Crea una IP virtual interna accesible solo dentro del cluster.",
        domain: "Kubernetes"
    },
    {
        question: "¿Qué garantiza un StatefulSet que un Deployment NO proporciona?",
        options: [
            "Alta disponibilidad automática",
            "Rolling updates sin downtime",
            "Identidad de red estable y almacenamiento persistente individual por Pod",
            "Auto-scaling horizontal"
        ],
        correct: 2,
        explanation: "StatefulSets proveen nombres de Pod predecibles (pod-0, pod-1), DNS estable, PVCs individuales por réplica, y orden garantizado de creación/eliminación.",
        domain: "Kubernetes"
    },
    {
        question: "¿Cuál producto de VMware Tanzu es una distribución Kubernetes conformant para múltiples clouds?",
        options: [
            "Tanzu Application Platform",
            "Tanzu Mission Control",
            "Tanzu Kubernetes Grid",
            "Tanzu Application Service"
        ],
        correct: 2,
        explanation: "Tanzu Kubernetes Grid (TKG) es la distribución K8s enterprise que funciona en vSphere, AWS, y Azure con conformance certificada por CNCF.",
        domain: "Tanzu"
    },
    {
        question: "¿Qué componente de TAP orquesta el pipeline de código a producción (supply chain)?",
        options: [
            "Knative",
            "Backstage",
            "Cartographer",
            "Crossplane"
        ],
        correct: 2,
        explanation: "Cartographer define y orquesta Supply Chains declarativamente: source → build (buildpacks) → testing → deployment en producción.",
        domain: "Tanzu"
    },
    {
        question: "En Cloud Foundry, ¿qué variable de entorno contiene las credenciales de servicios vinculados?",
        options: [
            "CF_SERVICES",
            "SERVICE_CREDENTIALS",
            "VCAP_SERVICES",
            "BOUND_SERVICES"
        ],
        correct: 2,
        explanation: "VCAP_SERVICES es la variable JSON que contiene todas las credenciales de los servicios vinculados (bound) a la aplicación en Cloud Foundry.",
        domain: "PCF"
    },
    {
        question: "¿Qué componente de Cloud Foundry orquesta los contenedores de aplicaciones?",
        options: [
            "Gorouter",
            "Cloud Controller",
            "UAA",
            "Diego"
        ],
        correct: 3,
        explanation: "Diego es el runtime de CF que gestiona scheduling, ejecución y health-checking de contenedores en las Diego Cells.",
        domain: "PCF"
    },
    {
        question: "¿Cuál es la diferencia entre 'cf restart' y 'cf restage'?",
        options: [
            "No hay diferencia",
            "restart reinicia contenedores; restage reconstruye el droplet con buildpack",
            "restage es más rápido que restart",
            "restart también actualiza el buildpack"
        ],
        correct: 1,
        explanation: "cf restart solo reinicia los contenedores. cf restage re-ejecuta el buildpack y crea un nuevo droplet, necesario tras bind-service o cambio de env vars.",
        domain: "PCF"
    },
    {
        question: "¿Qué Taint effect impide que NUEVOS Pods se programen pero NO desaloja los existentes?",
        options: [
            "NoExecute",
            "NoSchedule",
            "PreferNoSchedule",
            "Evict"
        ],
        correct: 1,
        explanation: "NoSchedule impide scheduling de nuevos Pods sin la Toleration adecuada. NoExecute sí desaloja Pods existentes que no toleren el taint.",
        domain: "Kubernetes"
    },
    {
        question: "¿Qué componente Tanzu proporciona autenticación federada (LDAP/OIDC) para clusters TKG?",
        options: [
            "UAA",
            "Dex",
            "Pinniped",
            "Keycloak"
        ],
        correct: 2,
        explanation: "Pinniped es el componente de autenticación en TKG que federa identidad desde LDAP, OIDC, y otros proveedores hacia los clusters Kubernetes.",
        domain: "Tanzu"
    },
    {
        question: "¿Qué rol de Space en Cloud Foundry permite desplegar aplicaciones (cf push)?",
        options: [
            "SpaceManager",
            "SpaceAuditor",
            "SpaceDeveloper",
            "OrgManager"
        ],
        correct: 2,
        explanation: "SpaceDeveloper puede: cf push, bind/unbind services, ver logs, SSH a apps, y gestionar rutas dentro del space.",
        domain: "PCF"
    },
    {
        question: "¿Qué probe de Kubernetes se usa para apps con arranque lento antes de activar liveness/readiness?",
        options: [
            "livenessProbe",
            "readinessProbe",
            "startupProbe",
            "initProbe"
        ],
        correct: 2,
        explanation: "startupProbe se ejecuta solo durante el arranque. Mientras no tenga éxito, liveness y readiness probes se desactivan. Ideal para apps lentas al iniciar.",
        domain: "Kubernetes"
    },
    {
        question: "¿Qué herramienta gestiona el ciclo de vida completo de la plataforma Cloud Foundry (VMs, releases)?",
        options: [
            "Terraform",
            "Concourse",
            "BOSH",
            "Ansible"
        ],
        correct: 2,
        explanation: "BOSH despliega y gestiona CF: provisiona VMs, aplica releases, gestiona stemcells, health monitoring, y self-healing de la plataforma.",
        domain: "PCF"
    },
    {
        question: "¿Qué tecnología usa TAP para construir imágenes de contenedor automáticamente sin Dockerfile?",
        options: [
            "Docker Build",
            "Kaniko",
            "Cloud Native Buildpacks",
            "Podman"
        ],
        correct: 2,
        explanation: "Cloud Native Buildpacks detectan el lenguaje/framework y construyen imágenes OCI reproducibles automáticamente, sin Dockerfile.",
        domain: "Tanzu"
    },
    {
        question: "Un PDB con minAvailable: 2 y 3 réplicas. ¿Cuántos Pods pueden estar down simultáneamente?",
        options: [
            "0",
            "1",
            "2",
            "3"
        ],
        correct: 1,
        explanation: "Con minAvailable: 2 y 3 réplicas, solo 1 Pod puede estar unavailable a la vez (3 - 2 = 1). Protege la disponibilidad durante mantenimiento.",
        domain: "Kubernetes"
    }
];

// ============================================
// DOMAIN CONTENT DATA
// ============================================
const domainContent = {
    1: {
        title: "Dominio 1: Kubernetes Fundamentos",
        weight: "30%",
        icon: "☸️",
        sections: [
            {
                title: "Arquitectura del Cluster",
                content: `
                    <ul>
                        <li><strong>kube-apiserver</strong>: Punto de entrada REST, valida y configura objetos API</li>
                        <li><strong>etcd</strong>: Base de datos clave-valor con todo el estado del cluster</li>
                        <li><strong>kube-scheduler</strong>: Asigna Pods a nodos según recursos y restricciones</li>
                        <li><strong>kube-controller-manager</strong>: Ejecuta controladores (ReplicaSet, Deployment)</li>
                        <li><strong>kubelet</strong>: Agente en cada nodo que gestiona contenedores</li>
                        <li><strong>kube-proxy</strong>: Reglas de red para Services (iptables/IPVS)</li>
                    </ul>
                `
            },
            {
                title: "Objetos Fundamentales",
                content: `
                    <ul>
                        <li><strong>Pod</strong>: Unidad mínima, contenedores comparten red/storage</li>
                        <li><strong>Deployment</strong>: Gestiona ReplicaSets, rolling updates, rollbacks</li>
                        <li><strong>Service</strong>: ClusterIP, NodePort, LoadBalancer, ExternalName</li>
                        <li><strong>Ingress</strong>: Enrutamiento HTTP/HTTPS externo con TLS</li>
                        <li><strong>ConfigMap/Secret</strong>: Configuración externalizada</li>
                    </ul>
                `
            },
            {
                title: "Almacenamiento",
                content: `
                    <ul>
                        <li><strong>PersistentVolume (PV)</strong>: Recurso de storage en el cluster</li>
                        <li><strong>PersistentVolumeClaim (PVC)</strong>: Solicitud de storage por Pod</li>
                        <li><strong>StorageClass</strong>: Provisión dinámica de volúmenes</li>
                        <li><strong>Access Modes</strong>: RWO, ROX, RWX, RWOP</li>
                    </ul>
                `
            },
            {
                title: "Seguridad y Networking",
                content: `
                    <ul>
                        <li><strong>RBAC</strong>: Role/ClusterRole + RoleBinding/ClusterRoleBinding</li>
                        <li><strong>NetworkPolicy</strong>: Firewall a nivel de Pod (additive)</li>
                        <li><strong>Namespaces</strong>: Aislamiento lógico y multi-tenancy</li>
                        <li><strong>ResourceQuota</strong>: Límites de recursos por namespace</li>
                    </ul>
                `
            }
        ]
    },
    2: {
        title: "Dominio 2: Kubernetes Avanzado",
        weight: "20%",
        icon: "⚙️",
        sections: [
            {
                title: "Workloads Avanzados",
                content: `
                    <ul>
                        <li><strong>StatefulSet</strong>: Identidad estable, storage individual, orden</li>
                        <li><strong>DaemonSet</strong>: Un Pod por nodo (logging, monitoring)</li>
                        <li><strong>Job/CronJob</strong>: Tareas batch, programadas</li>
                        <li><strong>HPA/VPA</strong>: Auto-escalamiento horizontal/vertical</li>
                    </ul>
                `
            },
            {
                title: "Scheduling Avanzado",
                content: `
                    <ul>
                        <li><strong>Taints/Tolerations</strong>: Repeler/permitir Pods en nodos</li>
                        <li><strong>Node Affinity</strong>: Required vs Preferred scheduling</li>
                        <li><strong>Pod Affinity/Anti-Affinity</strong>: Co-ubicación/separación de Pods</li>
                        <li><strong>PDB</strong>: Pod Disruption Budget para disponibilidad</li>
                    </ul>
                `
            },
            {
                title: "Seguridad y Observabilidad",
                content: `
                    <ul>
                        <li><strong>Pod Security Standards</strong>: Privileged, Baseline, Restricted</li>
                        <li><strong>SecurityContext</strong>: runAsNonRoot, readOnlyRootFilesystem</li>
                        <li><strong>Probes</strong>: startup, liveness, readiness</li>
                        <li><strong>ServiceMonitor</strong>: Prometheus scraping</li>
                    </ul>
                `
            },
            {
                title: "Deployment y Tooling",
                content: `
                    <ul>
                        <li><strong>Helm</strong>: Package manager con Charts y Values</li>
                        <li><strong>Blue/Green</strong>: Dos deployments, switch via Service</li>
                        <li><strong>Canary</strong>: Tráfico parcial a nueva versión</li>
                        <li><strong>Recreate</strong>: Elimina todos antes de crear nuevos</li>
                    </ul>
                `
            }
        ]
    },
    3: {
        title: "Dominio 3: VMware Tanzu",
        weight: "25%",
        icon: "🏗️",
        sections: [
            {
                title: "Tanzu Kubernetes Grid (TKG)",
                content: `
                    <ul>
                        <li><strong>Management Cluster</strong>: Gestiona lifecycle de workload clusters</li>
                        <li><strong>Workload Clusters</strong>: Donde corren las aplicaciones</li>
                        <li><strong>Cluster API</strong>: Declarativo para provisionar clusters</li>
                        <li><strong>TKG Packages</strong>: Contour, Harbor, Prometheus, Fluent Bit</li>
                    </ul>
                `
            },
            {
                title: "Tanzu Application Platform (TAP)",
                content: `
                    <ul>
                        <li><strong>Supply Chains</strong>: Source → Build → Test → Deploy</li>
                        <li><strong>Cartographer</strong>: Orquesta supply chains</li>
                        <li><strong>Cloud Native Buildpacks</strong>: Build sin Dockerfile</li>
                        <li><strong>TAP GUI (Backstage)</strong>: Portal de desarrollador</li>
                        <li><strong>Knative</strong>: Serverless con scale-to-zero</li>
                    </ul>
                `
            },
            {
                title: "Gestión Multi-Cluster",
                content: `
                    <ul>
                        <li><strong>Tanzu Mission Control</strong>: Consola central multi-cluster</li>
                        <li><strong>Policies</strong>: Seguridad, red, quotas centralizadas</li>
                        <li><strong>Velero</strong>: Backup y restore de clusters</li>
                        <li><strong>Pinniped</strong>: Autenticación federada LDAP/OIDC</li>
                    </ul>
                `
            },
            {
                title: "vSphere with Tanzu",
                content: `
                    <ul>
                        <li><strong>Supervisor Cluster</strong>: K8s integrado en vSphere</li>
                        <li><strong>VM Classes</strong>: Sizing de nodos (xsmall → 2xlarge)</li>
                        <li><strong>TanzuKubernetesCluster</strong>: CRD para crear clusters</li>
                        <li><strong>Antrea</strong>: CNI incluido para networking</li>
                    </ul>
                `
            }
        ]
    },
    4: {
        title: "Dominio 4: Pivotal Cloud Foundry / TAS",
        weight: "25%",
        icon: "☁️",
        sections: [
            {
                title: "Arquitectura CF",
                content: `
                    <ul>
                        <li><strong>Cloud Controller</strong>: API REST, gestiona apps y services</li>
                        <li><strong>Diego</strong>: Runtime que orquesta contenedores</li>
                        <li><strong>Gorouter</strong>: HTTP router con load balancing</li>
                        <li><strong>UAA</strong>: OAuth2/SAML autenticación</li>
                        <li><strong>BOSH</strong>: Gestión del ciclo de vida de la plataforma</li>
                    </ul>
                `
            },
            {
                title: "Desarrollo y Despliegue",
                content: `
                    <ul>
                        <li><strong>cf push</strong>: Un comando para detectar, construir y desplegar</li>
                        <li><strong>Buildpacks</strong>: Auto-detección de lenguaje, sin Dockerfile</li>
                        <li><strong>Manifest.yml</strong>: Configuración declarativa de la app</li>
                        <li><strong>Blue-Green</strong>: map-route / unmap-route para zero-downtime</li>
                    </ul>
                `
            },
            {
                title: "Servicios y Multi-tenancy",
                content: `
                    <ul>
                        <li><strong>Marketplace</strong>: Catálogo de servicios provisionables</li>
                        <li><strong>Service Binding</strong>: Credenciales via VCAP_SERVICES</li>
                        <li><strong>Orgs/Spaces</strong>: Multi-tenancy jerárquica</li>
                        <li><strong>Roles</strong>: OrgManager, SpaceDeveloper, SpaceAuditor</li>
                    </ul>
                `
            },
            {
                title: "Operaciones",
                content: `
                    <ul>
                        <li><strong>Scaling</strong>: cf scale -i (instancias), -m (memoria)</li>
                        <li><strong>Logging</strong>: Loggregator, cf logs, drains</li>
                        <li><strong>ASGs</strong>: Application Security Groups (egress firewall)</li>
                        <li><strong>Tasks</strong>: cf run-task para procesos one-off</li>
                    </ul>
                `
            }
        ]
    }
};

// ============================================
// NAVIGATION
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ============================================
// DOMAIN MODAL
// ============================================
function showDomainContent(domainNum) {
    const domain = domainContent[domainNum];
    const modal = document.getElementById('domainModal');
    const body = document.getElementById('domainModalBody');
    
    const mdFiles = {
        1: '01-kubernetes-fundamentals.md',
        2: '02-kubernetes-advanced.md',
        3: '03-vmware-tanzu.md',
        4: '04-pivotal-cloud-foundry.md'
    };
    
    let html = `
        <div style="margin-bottom: 2rem;">
            <span style="font-size: 2.5rem;">${domain.icon}</span>
            <h2 style="margin-top: 1rem; font-size: 1.8rem;">${domain.title}</h2>
            <p style="color: var(--accent-primary); font-weight: 600;">${domain.weight} del contenido</p>
        </div>
    `;
    
    domain.sections.forEach(section => {
        html += `
            <div style="margin-bottom: 2rem; padding: 1.5rem; background: var(--bg-secondary); border-radius: var(--radius-sm); border-left: 3px solid var(--accent-primary);">
                <h3 style="font-size: 1.1rem; margin-bottom: 1rem; color: var(--accent-primary);">${section.title}</h3>
                <div style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.8;">
                    ${section.content}
                </div>
            </div>
        `;
    });
    
    html += `
        <div style="text-align: center; margin-top: 2rem;">
            <a href="${mdFiles[domainNum]}" 
               class="btn btn-primary" style="text-decoration: none; display: inline-block;">
                Ver Contenido Completo (Markdown)
            </a>
        </div>
    `;
    
    body.innerHTML = html;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDomainModal() {
    const modal = document.getElementById('domainModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on backdrop click
document.getElementById('domainModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        closeDomainModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeDomainModal();
    }
});

// ============================================
// QUIZ FUNCTIONALITY
// ============================================
let currentQuestion = 0;
let userAnswers = new Array(quizQuestions.length).fill(-1);

function renderQuestion() {
    const q = quizQuestions[currentQuestion];
    document.getElementById('questionText').textContent = q.question;
    document.getElementById('quizProgress').textContent = `Pregunta ${currentQuestion + 1} de ${quizQuestions.length}`;
    document.getElementById('quizProgressFill').style.width = `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;
    
    const optionsContainer = document.getElementById('quizOptions');
    const letters = ['A', 'B', 'C', 'D'];
    
    optionsContainer.innerHTML = q.options.map((opt, i) => `
        <div class="quiz-option ${userAnswers[currentQuestion] === i ? 'selected' : ''}" 
             onclick="selectOption(${i})" data-index="${i}">
            <span class="option-letter">${letters[i]}</span>
            <span>${opt}</span>
        </div>
    `).join('');
    
    const feedback = document.getElementById('quizFeedback');
    if (userAnswers[currentQuestion] !== -1) {
        showFeedback();
    } else {
        feedback.classList.remove('show');
        feedback.className = 'quiz-feedback';
    }
    
    document.getElementById('btnPrev').disabled = currentQuestion === 0;
    document.getElementById('btnNext').textContent = currentQuestion === quizQuestions.length - 1 ? 'Ver Resultados' : 'Siguiente →';
}

function selectOption(index) {
    if (userAnswers[currentQuestion] !== -1) return;
    
    userAnswers[currentQuestion] = index;
    
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((opt, i) => {
        opt.classList.remove('selected');
        if (i === index) opt.classList.add('selected');
    });
    
    showFeedback();
}

function showFeedback() {
    const q = quizQuestions[currentQuestion];
    const feedback = document.getElementById('quizFeedback');
    const userAnswer = userAnswers[currentQuestion];
    const isCorrect = userAnswer === q.correct;
    
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((opt, i) => {
        if (i === q.correct) opt.classList.add('correct');
        if (i === userAnswer && !isCorrect) opt.classList.add('incorrect');
    });
    
    feedback.className = `quiz-feedback show ${isCorrect ? 'correct' : 'incorrect'}`;
    feedback.innerHTML = `
        <strong>${isCorrect ? '✓ ¡Correcto!' : '✗ Incorrecto'}</strong>
        <p style="margin-top: 0.5rem; color: var(--text-secondary);">${q.explanation}</p>
    `;
}

function nextQuestion() {
    if (userAnswers[currentQuestion] === -1) {
        document.getElementById('quizFeedback').className = 'quiz-feedback show incorrect';
        document.getElementById('quizFeedback').innerHTML = '<strong>Selecciona una respuesta antes de continuar.</strong>';
        return;
    }
    
    if (currentQuestion === quizQuestions.length - 1) {
        showResults();
        return;
    }
    
    currentQuestion++;
    renderQuestion();
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
}

function showResults() {
    const correct = userAnswers.reduce((acc, answer, i) => {
        return acc + (answer === quizQuestions[i].correct ? 1 : 0);
    }, 0);
    
    const percentage = Math.round((correct / quizQuestions.length) * 100);
    
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';
    
    document.getElementById('resultsScore').textContent = `${correct}/${quizQuestions.length} (${percentage}%)`;
    
    let message = '';
    if (percentage >= 90) message = '🎉 ¡Excelente! Estás muy bien preparado.';
    else if (percentage >= 72) message = '✅ ¡Bien! Estás en camino de aprobar.';
    else if (percentage >= 60) message = '⚠️ Necesitas repasar algunos temas.';
    else message = '📚 Requieres más estudio. Revisa los dominios donde fallaste.';
    
    const domainScores = {};
    quizQuestions.forEach((q, i) => {
        if (!domainScores[q.domain]) domainScores[q.domain] = { correct: 0, total: 0 };
        domainScores[q.domain].total++;
        if (userAnswers[i] === q.correct) domainScores[q.domain].correct++;
    });
    
    let breakdown = `<p style="margin-bottom: 1.5rem;">${message}</p><div style="text-align: left;">`;
    for (const [domain, scores] of Object.entries(domainScores)) {
        const pct = Math.round((scores.correct / scores.total) * 100);
        breakdown += `<p style="margin-bottom: 0.5rem;"><strong>${domain}:</strong> ${scores.correct}/${scores.total} (${pct}%)</p>`;
    }
    breakdown += '</div>';
    
    document.getElementById('resultsBreakdown').innerHTML = breakdown;
}

function restartQuiz() {
    currentQuestion = 0;
    userAnswers = new Array(quizQuestions.length).fill(-1);
    document.getElementById('quizContainer').style.display = 'block';
    document.getElementById('quizResults').style.display = 'none';
    renderQuestion();
}

// Initialize quiz
renderQuestion();

// ============================================
// PROGRESS TRACKING
// ============================================
const STORAGE_KEY = 'k8s-tanzu-pcf-progress';

function loadProgress() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        const checked = JSON.parse(saved);
        document.querySelectorAll('.progress-check').forEach((checkbox, i) => {
            checkbox.checked = checked[i] || false;
        });
    }
    updateProgressDisplay();
}

function saveProgress() {
    const checked = Array.from(document.querySelectorAll('.progress-check')).map(cb => cb.checked);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    updateProgressDisplay();
}

function updateProgressDisplay() {
    const checkboxes = document.querySelectorAll('.progress-check');
    const total = checkboxes.length;
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
    const percentage = Math.round((checked / total) * 100);
    
    const circle = document.getElementById('progressCircle');
    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (percentage / 100) * circumference;
    circle.style.strokeDashoffset = offset;
    
    document.getElementById('progressPercentage').textContent = `${percentage}%`;
}

document.querySelectorAll('.progress-check').forEach(checkbox => {
    checkbox.addEventListener('change', saveProgress);
});

loadProgress();

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.domain-card, .timeline-item, .resource-card, .checklist-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ============================================
// WEIGHT BARS ANIMATION
// ============================================
const weightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target.querySelector('.weight-fill');
            if (fill) {
                const width = fill.style.width;
                fill.style.width = '0%';
                setTimeout(() => {
                    fill.style.width = width;
                }, 100);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.domain-card').forEach(card => {
    weightObserver.observe(card);
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--accent-primary)';
        }
    });
});

// ============================================
// KEYBOARD NAVIGATION FOR QUIZ
// ============================================
document.addEventListener('keydown', (e) => {
    if (document.getElementById('quizContainer').style.display === 'none') return;
    
    const key = e.key.toLowerCase();
    if (key === 'a' || key === '1') selectOption(0);
    else if (key === 'b' || key === '2') selectOption(1);
    else if (key === 'c' || key === '3') selectOption(2);
    else if (key === 'd' || key === '4') selectOption(3);
    else if (key === 'enter' || key === 'arrowright') nextQuestion();
    else if (key === 'arrowleft') prevQuestion();
});

console.log('K8s, Tanzu & PCF Study Guide loaded successfully! 🚀');
