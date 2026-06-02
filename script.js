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
function validateContactForm(name, email, message) {
    const cleanName = (name || '').trim();
    const cleanEmail = (email || '').trim();
    const cleanMessage = (message || '').trim();

    // Validación básica
    if (!cleanName || !cleanEmail || !cleanMessage) {
        return { isValid: false, error: 'Por favor completa todos los campos' };
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
        return { isValid: false, error: 'Por favor ingresa un email válido' };
    }

    return { isValid: true };
}

const contactForm = document.querySelector('.contact-form');

function setupContactForm(formElement) {
    if (!formElement) return;

    formElement.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = formElement.querySelector('input[type="text"]').value;
        const email = formElement.querySelector('input[type="email"]').value;
        const message = formElement.querySelector('textarea').value;

        // Validación básica
        if (!name || !email || !message) {
            window.alert('Por favor completa todos los campos');
            return;
        }

        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            window.alert('Por favor ingresa un email válido');
            return;
        }

        window.alert('¡Mensaje enviado! Gracias por contactarme.');
        formElement.reset();
    });
}

setupContactForm(contactForm);

// ========== EFECTO PARALLAX SIMPLE ==========
const hero = document.querySelector('.hero');
const heroCinematic = document.querySelector('.hero-cinematic');
let cinematicVideo = null;

if (heroCinematic) {
    cinematicVideo = heroCinematic.querySelector('.hero-video');
}

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    
    if (hero) {
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    } else if (heroCinematic && cinematicVideo) {
        // Video parallax or keep it static
        cinematicVideo.style.transform = `translateX(-50%) translateY(calc(-50% + ${scrollPosition * 0.3}px))`;
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
    if (!href) return;
    const id = href.slice(1);
    if (!linksById[id]) {
        linksById[id] = [];
    }
    linksById[id].push(link);
});

// Guardamos el ID actual para no modificar el DOM innecesariamente
let currentActiveId = "";

const observerOptions = {
    root: null,
    rootMargin: "-200px 0px 0px 0px", // Equivalent to top - 200
    threshold: 0 // Trigger as soon as it intersects the margin
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const newActiveId = entry.target.getAttribute("id");

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
        }
    });
};

const navObserver = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach(section => {
    navObserver.observe(section);
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

// ========== VIDEO MODAL ==========
const modal = document.getElementById('video-modal');
const closeBtn = document.querySelector('.close-modal');
const youtubePlayer = document.getElementById('youtube-player');
const portfolioCards = document.querySelectorAll('.portfolio-card');

if (modal && closeBtn && youtubePlayer) {
    portfolioCards.forEach(card => {
        card.addEventListener('click', () => {
            const videoId = card.getAttribute('data-youtube-id');
            if (videoId) {
                // Set the src with autoplay
                youtubePlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                modal.classList.add('show');
            }
        });
    });

    const closeModal = () => {
        modal.classList.remove('show');
        // Stop video playback by clearing src
        setTimeout(() => {
            youtubePlayer.src = '';
        }, 300);
    };

    closeBtn.addEventListener('click', closeModal);

    // Close when clicking outside the video
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// ========== BACK TO TOP BUTTON ==========
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== BRAND VIDEO MODAL ==========
const brandModal = document.getElementById('brand-modal');
const closeBrandBtn = document.querySelector('.close-brand-modal');
const brandPlayer1 = document.getElementById('brand-player-1');
const brandPlayer2 = document.getElementById('brand-player-2');
const brandCards = document.querySelectorAll('.brand-card');

if (brandModal && closeBrandBtn && brandPlayer1 && brandPlayer2) {
    brandCards.forEach(card => {
        card.addEventListener('click', () => {
            const video1Id = card.getAttribute('data-video-1');
            const video2Id = card.getAttribute('data-video-2');

            if (video1Id && video2Id) {
                // Set the src WITHOUT autoplay so the user chooses which to play
                brandPlayer1.src = `https://www.youtube.com/embed/${video1Id}`;
                brandPlayer2.src = `https://www.youtube.com/embed/${video2Id}`;
                brandModal.classList.add('show');
            }
        });
    });

    const closeBrandModal = () => {
        brandModal.classList.remove('show');
        // Stop video playback by clearing src
        setTimeout(() => {
            brandPlayer1.src = '';
            brandPlayer2.src = '';
        }, 300);
    };

    closeBrandBtn.addEventListener('click', closeBrandModal);

    // Close when clicking outside the videos
    brandModal.addEventListener('click', (e) => {
        if (e.target === brandModal || e.target === document.querySelector('.brand-modal-content')) {
            closeBrandModal();
        }
    });
}

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

if (typeof module !== 'undefined') {
    module.exports = { isMobileDevice };
}
