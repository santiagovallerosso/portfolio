// ========== MENÚ HAMBURGUESA ==========
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ========== VALIDACIÓN DE FORMULARIO ==========
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Validación básica
        if (!name || !email || !message) {
            alert('Por favor completa todos los campos');
            return;
        }

        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor ingresa un email válido');
            return;
        }

        // Aquí puedes integrar tu servicio de email
        // Opción 1: Formspree
        // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        //     method: 'POST',
        //     body: JSON.stringify({ name, email, message }),
        //     headers: { 'Content-Type': 'application/json' }
        // });

        // Opción 2: EmailJS (requiere librería)
        // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        //     from_name: name,
        //     from_email: email,
        //     message: message
        // });

        // Por ahora, solo mostrar mensaje de éxito
        alert('¡Mensaje enviado! Gracias por contactarme.');
        contactForm.reset();
    });
}

// ========== ANIMACIÓN DE CONTADORES ==========
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stat = entry.target.querySelector('h3');
            if (stat && !stat.classList.contains('animated')) {
                animateCounter(stat);
                stat.classList.add('animated');
            }
        }
    });
}, observerOptions);

// Observar la sección de estadísticas
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    observer.observe(aboutSection);
}

function animateCounter(element) {
    const originalText = element.textContent;
    const finalValue = parseInt(originalText);
    const suffix = originalText.includes('+') ? '+' : originalText.includes('%') ? '%' : '';
    let currentValue = 0;
    const increment = finalValue / 50;

    const interval = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            element.textContent = finalValue + suffix;
            clearInterval(interval);
        } else {
            element.textContent = Math.floor(currentValue) + suffix;
        }
    }, 30);
}

// ========== ANIMACIÓN AL SCROLL ==========
const observerAnimation = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observerAnimation.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

// Observar elementos con clases específicas
document.querySelectorAll('.project-card, .skill-category, .stat').forEach(el => {
    observerAnimation.observe(el);
});

// ========== EFECTO PARALLAX SIMPLE ==========
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.pageYOffset;
    
    if (hero) {
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

// ========== AGREGAR ESTILOS DE ANIMACIÓN ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .project-card {
        animation: fadeInUp 0.6s ease forwards;
    }

    .skill-category {
        animation: fadeInUp 0.6s ease forwards;
    }
`;
document.head.appendChild(style);

// ========== ACTIVAR ENLACE DE NAVEGACIÓN ACTUAL ==========
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========== DETECTAR DISPOSITIVO MÓVIL ==========
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobileDevice()) {
    document.body.classList.add('mobile');
}

// ========== CONSOLE LOG ==========
console.log('✨ Portfolio cargado exitosamente');
console.log('👨‍💻 Visita mi GitHub: https://github.com/santiagovallerosso');
