/**
 * AWS Solutions Architect Associate - Study Guide
 * Interactive JavaScript functionality
 */

// ============================================
// QUIZ DATA
// ============================================
const quizQuestions = [
    {
        question: "¿Cuál es la mejor práctica para que una instancia EC2 acceda a S3 sin credenciales de largo plazo?",
        options: [
            "Almacenar access keys en variables de entorno",
            "Asignar un IAM Role a la instancia EC2",
            "Usar la cuenta root",
            "Hardcodear las credenciales en el código"
        ],
        correct: 1,
        explanation: "Los IAM Roles proporcionan credenciales temporales automáticamente via Instance Metadata Service, sin necesidad de access keys de largo plazo.",
        domain: "Seguridad"
    },
    {
        question: "¿Qué servicio protege aplicaciones web contra SQL Injection y XSS cuando el tráfico pasa por un ALB?",
        options: [
            "AWS Shield Standard",
            "Security Groups",
            "AWS WAF",
            "Network ACLs"
        ],
        correct: 2,
        explanation: "AWS WAF inspecciona el contenido HTTP y puede bloquear SQL Injection y XSS. Se asocia directamente al ALB.",
        domain: "Seguridad"
    },
    {
        question: "Una aplicación necesita desacoplamiento para no perder mensajes si el procesador falla. ¿Qué servicio usar?",
        options: [
            "Amazon SNS",
            "Amazon SQS con Dead Letter Queue",
            "Amazon EventBridge",
            "AWS Step Functions"
        ],
        correct: 1,
        explanation: "SQS retiene mensajes hasta 14 días. La DLQ captura mensajes que fallan repetidamente para investigación posterior.",
        domain: "Resiliencia"
    },
    {
        question: "¿Qué estrategia de DR tiene RTO de minutos y costo moderado?",
        options: [
            "Backup & Restore",
            "Pilot Light",
            "Warm Standby",
            "Multi-Site Active/Active"
        ],
        correct: 2,
        explanation: "Warm Standby mantiene un entorno reducido siempre activo que se escala rápidamente. Balance entre costo y velocidad de recuperación.",
        domain: "Resiliencia"
    },
    {
        question: "¿Qué proporciona latencia de microsegundos para lecturas en DynamoDB?",
        options: [
            "DynamoDB On-Demand mode",
            "DynamoDB Accelerator (DAX)",
            "DynamoDB Global Tables",
            "Aumentar Read Capacity Units"
        ],
        correct: 1,
        explanation: "DAX es un cache in-memory compatible con la API de DynamoDB que reduce la latencia de milisegundos a microsegundos.",
        domain: "Alto Rendimiento"
    },
    {
        question: "Para un cluster HPC que necesita mínima latencia entre instancias, ¿qué configuración es óptima?",
        options: [
            "Spread Placement Group con ENA",
            "Cluster Placement Group con EFA",
            "Partition Placement Group",
            "Instancias en diferentes AZs"
        ],
        correct: 1,
        explanation: "Cluster PG coloca instancias en el mismo rack. EFA proporciona bypass del kernel para comunicación MPI directa, ideal para HPC.",
        domain: "Alto Rendimiento"
    },
    {
        question: "50 instancias EC2 ejecutan 24/7 con carga estable por 3 años. ¿Qué modelo de precios ahorra más?",
        options: [
            "On-Demand",
            "Spot Instances",
            "Savings Plan 3 años, pago total anticipado",
            "Reserved Instances 1 año"
        ],
        correct: 2,
        explanation: "Savings Plan de 3 años con pago total anticipado ofrece hasta 72% de descuento. Ideal para cargas estables con compromiso a largo plazo.",
        domain: "Costos"
    },
    {
        question: "Trabajos batch de 2-4 horas tolerantes a interrupciones. ¿Cómo reducir costos significativamente?",
        options: [
            "Instancias más pequeñas",
            "Spot Instances con diversificación",
            "Reserved Instances",
            "AWS Lambda"
        ],
        correct: 1,
        explanation: "Spot Instances ofrecen hasta 90% de ahorro. Los trabajos batch tolerantes a interrupciones son el caso de uso ideal para Spot.",
        domain: "Costos"
    },
    {
        question: "¿Qué tipo de VPC Endpoint es GRATUITO y soporta S3 y DynamoDB?",
        options: [
            "Interface Endpoint",
            "Gateway Endpoint",
            "PrivateLink",
            "NAT Gateway"
        ],
        correct: 1,
        explanation: "Gateway Endpoints para S3 y DynamoDB son gratuitos. Se configuran via route tables y el tráfico no sale de la red de AWS.",
        domain: "Costos"
    },
    {
        question: "Una app móvil necesita login con Google/Facebook y acceso a recursos AWS. ¿Qué servicio usar?",
        options: [
            "IAM Users para cada usuario",
            "Amazon Cognito (User Pool + Identity Pool)",
            "IAM Identity Center",
            "AWS STS directamente"
        ],
        correct: 1,
        explanation: "Cognito User Pool maneja autenticación social. Identity Pool proporciona credenciales AWS temporales con roles IAM específicos.",
        domain: "Seguridad"
    }
];

// ============================================
// DOMAIN CONTENT DATA
// ============================================
const domainContent = {
    1: {
        title: "Dominio 1: Arquitecturas Seguras",
        weight: "30%",
        icon: "🔒",
        sections: [
            {
                title: "IAM (Identity and Access Management)",
                content: `
                    <ul>
                        <li><strong>Usuarios</strong>: Personas o aplicaciones</li>
                        <li><strong>Grupos</strong>: Colecciones de usuarios</li>
                        <li><strong>Roles</strong>: Identidades temporales (EC2, Lambda, cross-account)</li>
                        <li><strong>Políticas</strong>: JSON que define permisos (Allow/Deny)</li>
                    </ul>
                    <p><strong>Principio clave:</strong> Menor privilegio - solo los permisos mínimos necesarios.</p>
                `
            },
            {
                title: "VPC y Seguridad de Red",
                content: `
                    <ul>
                        <li><strong>Security Groups</strong>: Stateful, nivel de instancia, solo Allow</li>
                        <li><strong>NACLs</strong>: Stateless, nivel de subnet, Allow y Deny</li>
                        <li><strong>VPC Endpoints</strong>: Acceso privado a servicios AWS</li>
                        <li><strong>NAT Gateway</strong>: Acceso a internet desde subnets privadas</li>
                    </ul>
                `
            },
            {
                title: "Cifrado y Gestión de Claves",
                content: `
                    <ul>
                        <li><strong>KMS</strong>: Gestión de claves (AWS Managed, Customer Managed)</li>
                        <li><strong>CloudHSM</strong>: HSM dedicado (FIPS 140-2 Level 3)</li>
                        <li><strong>Secrets Manager</strong>: Rotación automática de credenciales</li>
                        <li><strong>ACM</strong>: Certificados SSL/TLS gratuitos</li>
                    </ul>
                `
            },
            {
                title: "Protección y Monitoreo",
                content: `
                    <ul>
                        <li><strong>WAF</strong>: Protección contra SQL Injection, XSS</li>
                        <li><strong>Shield</strong>: Protección DDoS (Standard gratuito, Advanced $3K/mes)</li>
                        <li><strong>GuardDuty</strong>: Detección de amenazas con ML</li>
                        <li><strong>CloudTrail</strong>: Auditoría de todas las llamadas API</li>
                        <li><strong>Config</strong>: Evaluación de configuraciones</li>
                    </ul>
                `
            }
        ]
    },
    2: {
        title: "Dominio 2: Arquitecturas Resilientes",
        weight: "26%",
        icon: "🔄",
        sections: [
            {
                title: "Elastic Load Balancing",
                content: `
                    <ul>
                        <li><strong>ALB</strong>: Capa 7, HTTP/HTTPS, routing por contenido</li>
                        <li><strong>NLB</strong>: Capa 4, TCP/UDP, ultra-baja latencia, IPs estáticas</li>
                        <li><strong>GWLB</strong>: Capa 3, appliances de red (firewalls)</li>
                    </ul>
                    <p><strong>Tip:</strong> ALB para web apps, NLB para gaming/IoT, GWLB para seguridad.</p>
                `
            },
            {
                title: "Auto Scaling",
                content: `
                    <ul>
                        <li><strong>Target Tracking</strong>: Mantiene métrica en valor objetivo (ej: CPU 70%)</li>
                        <li><strong>Step Scaling</strong>: Escala en pasos según umbrales</li>
                        <li><strong>Scheduled</strong>: Escalamiento programado</li>
                        <li><strong>Predictive</strong>: ML para anticipar demanda</li>
                    </ul>
                `
            },
            {
                title: "Desacoplamiento",
                content: `
                    <ul>
                        <li><strong>SQS</strong>: Colas de mensajes (Standard vs FIFO)</li>
                        <li><strong>SNS</strong>: Pub/Sub, fan-out a múltiples suscriptores</li>
                        <li><strong>EventBridge</strong>: Bus de eventos serverless</li>
                        <li><strong>Kinesis</strong>: Streaming en tiempo real</li>
                    </ul>
                    <p><strong>Patrón clave:</strong> SNS + SQS para fan-out desacoplado.</p>
                `
            },
            {
                title: "Disaster Recovery",
                content: `
                    <ul>
                        <li><strong>Backup & Restore</strong>: RTO horas, más económico</li>
                        <li><strong>Pilot Light</strong>: Core activo, RTO ~10 min</li>
                        <li><strong>Warm Standby</strong>: Entorno reducido activo, RTO minutos</li>
                        <li><strong>Multi-Site</strong>: Active/Active, RTO ~0, más costoso</li>
                    </ul>
                `
            }
        ]
    },
    3: {
        title: "Dominio 3: Alto Rendimiento",
        weight: "24%",
        icon: "⚡",
        sections: [
            {
                title: "Almacenamiento",
                content: `
                    <ul>
                        <li><strong>EBS gp3</strong>: 16,000 IOPS, 1,000 MB/s (propósito general)</li>
                        <li><strong>EBS io2</strong>: 256,000 IOPS (bases de datos críticas)</li>
                        <li><strong>Instance Store</strong>: NVMe local, efímero, máximo rendimiento</li>
                        <li><strong>EFS</strong>: NFS compartido, escalamiento automático</li>
                        <li><strong>FSx Lustre</strong>: HPC, ML (alto throughput)</li>
                    </ul>
                `
            },
            {
                title: "Cómputo",
                content: `
                    <ul>
                        <li><strong>EC2 Familias</strong>: C (CPU), R (RAM), P/G (GPU), I (I/O)</li>
                        <li><strong>Placement Groups</strong>: Cluster (HPC), Spread (HA), Partition (Big Data)</li>
                        <li><strong>Lambda</strong>: Serverless, hasta 10 GB RAM, 15 min</li>
                        <li><strong>Fargate</strong>: Contenedores serverless</li>
                        <li><strong>EFA</strong>: Elastic Fabric Adapter para HPC</li>
                    </ul>
                `
            },
            {
                title: "Bases de Datos",
                content: `
                    <ul>
                        <li><strong>Aurora</strong>: 5x MySQL, failover < 30s, 15 replicas</li>
                        <li><strong>DynamoDB + DAX</strong>: Microsegundos de latencia</li>
                        <li><strong>ElastiCache Redis</strong>: Cache in-memory, pub/sub</li>
                        <li><strong>Redshift</strong>: Data warehouse columnar, MPP</li>
                    </ul>
                `
            },
            {
                title: "Red",
                content: `
                    <ul>
                        <li><strong>CloudFront</strong>: CDN, 450+ edge locations</li>
                        <li><strong>Global Accelerator</strong>: IPs anycast, optimiza ruta</li>
                        <li><strong>Direct Connect</strong>: Conexión dedicada 1-100 Gbps</li>
                        <li><strong>S3 Transfer Acceleration</strong>: Uploads rápidos globales</li>
                    </ul>
                `
            }
        ]
    },
    4: {
        title: "Dominio 4: Optimización de Costos",
        weight: "20%",
        icon: "💰",
        sections: [
            {
                title: "EC2 Pricing",
                content: `
                    <ul>
                        <li><strong>On-Demand</strong>: Sin compromiso, pago por uso</li>
                        <li><strong>Reserved/Savings Plans</strong>: Hasta 72% ahorro (1-3 años)</li>
                        <li><strong>Spot</strong>: Hasta 90% ahorro, puede interrumpirse</li>
                        <li><strong>Dedicated Hosts</strong>: Licencias BYOL</li>
                    </ul>
                    <p><strong>Tip:</strong> Combinar RI (base) + On-Demand (picos) + Spot (batch).</p>
                `
            },
            {
                title: "Almacenamiento",
                content: `
                    <ul>
                        <li><strong>S3 Lifecycle</strong>: Mover datos automáticamente entre tiers</li>
                        <li><strong>Intelligent-Tiering</strong>: Movimiento automático por acceso</li>
                        <li><strong>Glacier Deep Archive</strong>: $0.00099/GB/mes (95% ahorro)</li>
                        <li><strong>EBS gp3 vs gp2</strong>: gp3 es 20% más barato</li>
                    </ul>
                `
            },
            {
                title: "Base de Datos",
                content: `
                    <ul>
                        <li><strong>Aurora Serverless</strong>: Escala a casi cero</li>
                        <li><strong>DynamoDB On-Demand</strong>: Pago por solicitud</li>
                        <li><strong>RDS Reserved</strong>: Hasta 69% ahorro</li>
                        <li><strong>Detener instancias dev/test</strong>: Ahorro ~60%</li>
                    </ul>
                `
            },
            {
                title: "Herramientas de Gestión",
                content: `
                    <ul>
                        <li><strong>Cost Explorer</strong>: Visualización y proyección de gastos</li>
                        <li><strong>Budgets</strong>: Alertas y acciones automáticas</li>
                        <li><strong>Compute Optimizer</strong>: Recomendaciones de right-sizing</li>
                        <li><strong>Trusted Advisor</strong>: Checks de optimización</li>
                        <li><strong>Cost Allocation Tags</strong>: Asignar costos a equipos</li>
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
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    lastScroll = currentScroll;
});

// ============================================
// DOMAIN MODAL
// ============================================
function showDomainContent(domainNum) {
    const domain = domainContent[domainNum];
    const modal = document.getElementById('domainModal');
    const body = document.getElementById('domainModalBody');
    
    let html = `
        <div style="margin-bottom: 2rem;">
            <span style="font-size: 2.5rem;">${domain.icon}</span>
            <h2 style="margin-top: 1rem; font-size: 1.8rem;">${domain.title}</h2>
            <p style="color: var(--accent-primary); font-weight: 600;">${domain.weight} del examen</p>
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
            <a href="0${domainNum}-${domainNum === 1 ? 'secure' : domainNum === 2 ? 'resilient' : domainNum === 3 ? 'high-performing' : 'cost-optimized'}-architectures.md" 
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
let quizCompleted = false;

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
    
    // Show feedback if already answered
    const feedback = document.getElementById('quizFeedback');
    if (userAnswers[currentQuestion] !== -1) {
        showFeedback();
    } else {
        feedback.classList.remove('show');
        feedback.className = 'quiz-feedback';
    }
    
    // Update buttons
    document.getElementById('btnPrev').disabled = currentQuestion === 0;
    document.getElementById('btnNext').textContent = currentQuestion === quizQuestions.length - 1 ? 'Ver Resultados' : 'Siguiente →';
}

function selectOption(index) {
    if (userAnswers[currentQuestion] !== -1) return; // Already answered
    
    userAnswers[currentQuestion] = index;
    
    // Update visual
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
    
    // Highlight correct/incorrect options
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
        // Must answer before proceeding
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
    
    // Domain breakdown
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
const STORAGE_KEY = 'aws-saa-progress';

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
    
    // Update circle
    const circle = document.getElementById('progressCircle');
    const circumference = 2 * Math.PI * 54; // r=54
    const offset = circumference - (percentage / 100) * circumference;
    circle.style.strokeDashoffset = offset;
    
    // Update percentage text
    document.getElementById('progressPercentage').textContent = `${percentage}%`;
}

// Add event listeners to checkboxes
document.querySelectorAll('.progress-check').forEach(checkbox => {
    checkbox.addEventListener('change', saveProgress);
});

// Load saved progress
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

// Observe elements for animation
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
// SMOOTH SCROLL FOR ANCHOR LINKS
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

console.log('AWS SAA-C03 Study Guide loaded successfully! 🚀');
