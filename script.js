// ========== MENÚ HAMBURGUESA ==========
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
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
}

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

// ========== EFECTO PARALLAX SIMPLE ==========
const hero = document.querySelector('.hero');
const heroCinematic = document.querySelector('.hero-cinematic');
const heroVideo = heroCinematic ? heroCinematic.querySelector('.hero-video') : null;

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    
    if (hero) {
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    } else if (heroCinematic) {
        // Video parallax or keep it static
        if (heroVideo) {
            heroVideo.style.transform = `translateX(-50%) translateY(calc(-50% + ${scrollPosition * 0.3}px))`;
        }
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
// Caching de elementos del DOM para evitar consultas constantes durante el scroll
const sections = document.querySelectorAll("section");
const navLinksAnchors = document.querySelectorAll(".nav-links a");

// Agrupamos los enlaces por ID para soportar múltiples menús (ej. desktop y mobile) apuntando a la misma sección
const linksById = {};
navLinksAnchors.forEach(link => {
    const href = link.getAttribute("href");
    const id = href ? href.slice(1) : "";
    if (!linksById[id]) {
        linksById[id] = [];
    }
    linksById[id].push(link);
});

// Guardamos el ID actual para no modificar el DOM innecesariamente
let currentActiveId = "";

window.addEventListener("scroll", () => {
    let newActiveId = "";
    
    // Identificamos la sección actual basada en la regla original (top - 200)
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) {
            newActiveId = section.getAttribute("id");
        }
    });

    // Optimización crítica: Solo manipulamos las clases del DOM si la sección activa REALMENTE ha cambiado.
    if (newActiveId !== currentActiveId) {
        // Removemos la clase active de los enlaces anteriores
        if (currentActiveId && linksById[currentActiveId]) {
            linksById[currentActiveId].forEach(link => link.classList.remove("active"));
        }

        // Añadimos la clase active a los enlaces nuevos
        if (newActiveId && linksById[newActiveId]) {
            linksById[newActiveId].forEach(link => link.classList.add("active"));
        }

        currentActiveId = newActiveId;
    }
});

// ========== DETECTAR DISPOSITIVO MÓVIL ==========
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobileDevice()) {
    document.body.classList.add('mobile');
}

// ========== STICKY NAVBAR ==========
const stickyNav = document.getElementById('sticky-nav');
const heroSection = document.getElementById('inicio');

if (stickyNav && heroSection) {
    // Start hidden
    stickyNav.classList.add('hidden');

    window.addEventListener('scroll', () => {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        if (window.scrollY > heroBottom - 100) { // Adjust threshold as needed
            stickyNav.classList.remove('hidden');
        } else {
            stickyNav.classList.add('hidden');
        }
    });
}

// ========== UNIFIED VIDEO MODAL LOGIC ==========
function setupVideoModal(modalId, closeBtnSelector, triggerSelector, config) {
    const modal = document.getElementById(modalId);
    const closeBtn = modal ? modal.querySelector(closeBtnSelector) : null;
    const triggers = document.querySelectorAll(triggerSelector);

    if (!modal || !closeBtn || triggers.length === 0) return;

    // Cache players
    const players = config.players.map(p => document.getElementById(p.id));

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            let hasVideo = false;
            config.players.forEach((playerConfig, index) => {
                const videoId = trigger.getAttribute(playerConfig.dataAttribute);
                if (videoId && players[index]) {
                    hasVideo = true;
                    const autoplayParam = playerConfig.autoplay ? '?autoplay=1' : '';
                    players[index].src = `https://www.youtube.com/embed/${videoId}${autoplayParam}`;
                }
            });

            if (hasVideo) {
                modal.classList.add('show');
            }
        });
    });

    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => {
            players.forEach(player => {
                if (player) player.src = '';
            });
        }, 300);
    };

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (!e.target.closest('.modal-content')) {
            closeModal();
        }
    });
}

// Initialize Modals
setupVideoModal(
    'video-modal',
    '.close-modal',
    '.portfolio-card',
    {
        players: [
            { id: 'youtube-player', dataAttribute: 'data-youtube-id', autoplay: true }
        ]
    }
);

setupVideoModal(
    'brand-modal',
    '.close-brand-modal',
    '.brand-card',
    {
        players: [
            { id: 'brand-player-1', dataAttribute: 'data-video-1', autoplay: false },
            { id: 'brand-player-2', dataAttribute: 'data-video-2', autoplay: false }
        ]
    }
);

// Language Translations
const translations = {
    es: {
        hero_subtitle: "Filmmaker, Editor de Video y Diseñador de Sonido",
        hero_btn: "Trabajos Destacados",
        nav_work: "TRABAJOS",
        nav_music_videos: "VIDEOCLIPS",
        nav_sound_design: "DISEÑO DE SONIDO",
        nav_brand_content: "CONTENIDO DE MARCA",
        nav_contact: "CONTACTO",
        section_work: "Trabajos",
        section_music_videos: "Videoclips",
        section_sound_design: "Diseño de Sonido",
        section_brand_content: "Contenido de Marca",
        contact_title: "Contacto",
        contact_phone: "Teléfono",
        contact_send: "Enviar mensaje",
        footer_copy: "&copy; 2026 Santiago Valle Rosso. Todos los derechos reservados.",
        cat_short_film: "Cortometraje",
        cat_documentary: "Documental",
        cat_music_video: "Videoclip",
        cat_campaign: "Campaña"
    },
    en: {
        hero_subtitle: "Filmmaker, Video Editor and Sound Designer",
        hero_btn: "Selected Works",
        nav_work: "WORK",
        nav_music_videos: "MUSIC VIDEOS",
        nav_sound_design: "SOUND DESIGN",
        nav_brand_content: "BRAND CONTENT",
        nav_contact: "CONTACT",
        section_work: "Work",
        section_music_videos: "Music Videos",
        section_sound_design: "Sound Design",
        section_brand_content: "Brand Content",
        contact_title: "Contact",
        contact_phone: "Phone",
        contact_send: "Send message",
        footer_copy: "&copy; 2026 Santiago Valle Rosso. All rights reserved.",
        cat_short_film: "Short Film",
        cat_documentary: "Documentary",
        cat_music_video: "Music Video",
        cat_campaign: "Campaign"
    },
    pt: {
        hero_subtitle: "Cineasta, Editor de Vídeo e Designer de Som",
        hero_btn: "Trabalhos Selecionados",
        nav_work: "TRABALHOS",
        nav_music_videos: "VIDEOCLIPES",
        nav_sound_design: "DESIGN DE SOM",
        nav_brand_content: "CONTEÚDO DE MARCA",
        nav_contact: "CONTATO",
        section_work: "Trabalhos",
        section_music_videos: "Videoclipes",
        section_sound_design: "Design de Som",
        section_brand_content: "Conteúdo de Marca",
        contact_title: "Contato",
        contact_phone: "Telefone",
        contact_send: "Enviar mensagem",
        footer_copy: "&copy; 2026 Santiago Valle Rosso. Todos os direitos reservados.",
        cat_short_film: "Curta-metragem",
        cat_documentary: "Documentário",
        cat_music_video: "Videoclipe",
        cat_campaign: "Campanha"
    }
};

const placeholders = {
    es: {
        contact_name: "Tu nombre",
        contact_email: "Tu email",
        contact_message: "Tu mensaje"
    },
    en: {
        contact_name: "Your name",
        contact_email: "Your email",
        contact_message: "Your message"
    },
    pt: {
        contact_name: "Seu nome",
        contact_email: "Seu email",
        contact_message: "Sua mensagem"
    }
};

function changeLanguage(lang) {
    document.documentElement.lang = lang;

    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (placeholders[lang] && placeholders[lang][key]) {
            el.placeholder = placeholders[lang][key];
        }
    });
}

// Initialize language switcher
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        changeLanguage(e.target.dataset.lang);
    });
});

// Call changeLanguage('en') on load
document.addEventListener('DOMContentLoaded', () => {
    changeLanguage('en');
});
