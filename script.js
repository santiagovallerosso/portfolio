
let sectionOffsets = [];
let scrollNavItems = [];
let scrollSections = [];
let scrollHero = null;
let scrollHeroCinematic = null;
let scrollCinematicVideo = null;
let mainStickyNav = null;

function initScrollCoordinator() {
    scrollSections = document.querySelectorAll('section');
    scrollNavItems = document.querySelectorAll('.nav-links a');
    scrollHero = document.querySelector('.hero');
    scrollHeroCinematic = document.querySelector('.hero-cinematic');
    scrollCinematicVideo = document.querySelector('.hero-video');
    mainStickyNav = document.getElementById('sticky-nav');
    
    if (scrollSections && scrollSections.length > 0) {
        sectionOffsets = Array.from(scrollSections).map(section => ({
            id: section.getAttribute('id'),
            offsetTop: section.offsetTop,
            offsetHeight: section.clientHeight
        }));
    }
    window.addEventListener('scroll', handleScroll);
}

function handleScroll() {
    const scrollPosition = window.pageYOffset;
    const scrollY = window.scrollY;
/**
 * @file script.js
 * @description Production-grade DOM scroll & section tracker with cached offsets.
 */

// Memory Cache for section coordinates to avoid expensive getBoundingClientRect layout thrashing
let cachedOffsets = null;

/**
 * Calculates and caches the vertical offsets for section elements.
 * @param {string[]} sectionIds - Array of section IDs (e.g. ['home', 'about', 'services'])
 * @returns {Record<string, number>} Object mapping section ID to its vertical coordinate
 */
function updateSectionOffsets(sectionIds) {
  if (!Array.isArray(sectionIds) || sectionIds.length === 0) {
    cachedOffsets = {};
    return cachedOffsets;
  }

  const offsets = {};
  sectionIds.forEach((id) => {
    // Standard mock selector for testing / modular usage
    const element = document.getElementById(id);
    if (element) {
      // Offset calculation with standard window scroll offset inclusion
      offsets[id] = element.getBoundingClientRect().top + window.scrollY;
// ========== MENÚ HAMBURGUESA ==========
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Cerrar menú al hacer clic en un enlace
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
}

// ========== SMOOTH SCROLL ==========
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});
});

// ========== VALIDACIÓN DE FORMULARIO ==========
function validateContactForm(name, email, message) {
  const cleanName = (name || "").trim();
  const cleanEmail = (email || "").trim();
  const cleanMessage = (message || "").trim();

  // Validación básica
  if (!cleanName || !cleanEmail || !cleanMessage) {
    return { isValid: false, error: "Por favor completa todos los campos" };
  }

  // Validación de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return { isValid: false, error: "Por favor ingresa un email válido" };
  }

  return { isValid: true };
}

function setupContactForm(formElement) {
  if (!formElement) return;

  formElement.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = formElement.querySelector('input[type="text"]');
    const emailInput = formElement.querySelector('input[type="email"]');
    const messageInput = formElement.querySelector("textarea");

    const name = (nameInput ? nameInput.value.trim() : '') || '';
    const email = (emailInput ? emailInput.value.trim() : '') || '';
    const message = (messageInput ? messageInput.value.trim() : '') || '';

    // Validación básica
    if (!name || !email || !message) {
      window.alert("Por favor completa todos los campos");
      return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      window.alert("Por favor ingresa un email válido");
      return;
    }

    // Mostrar mensaje de éxito en la UI
    const submitBtn = formElement.querySelector('button[type="submit"]');
    if (submitBtn) {
        const originalText = submitBtn.textContent;
        const originalBg = submitBtn.style.background;

        submitBtn.textContent = '¡Mensaje enviado con éxito!';
        submitBtn.style.background = '#10b981'; // Tailwind emerald-500
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = originalBg;
            submitBtn.disabled = false;
            formElement.reset();
        }, 3000);
    } else {
      offsets[id] = 0;
    }
  });

  cachedOffsets = offsets;
  return offsets;
}
}

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact-form");
  setupContactForm(contactForm);
});

// ========== EFECTO PARALLAX SIMPLE ==========
let hero = null;
let heroCinematic = null;
let cinematicVideo = null;

document.addEventListener("DOMContentLoaded", () => {
  hero = document.querySelector(".hero");
  heroCinematic = document.querySelector(".hero-cinematic");
  if (heroCinematic) {
    cinematicVideo = heroCinematic.querySelector(".hero-video");
  }
});

/**
 * Retrieves the current cached offsets, or recalculates them if the cache is empty.
 * @param {string[]} sectionIds
 * @returns {Record<string, number>}
 */
function getSectionOffsets(sectionIds) {
  if (!cachedOffsets) {
    return updateSectionOffsets(sectionIds);
  }
  return cachedOffsets;
}

/**
 * Determines the currently active segment ID based on the scroll position.
 * @param {number} scrollY
 * @param {Record<string, number>} offsets
 * @returns {string|null} Active section ID or null
 */
function determineActiveSection(scrollY, offsets) {
  if (!offsets || Object.keys(offsets).length === 0) return null;

  let activeSection = null;
  // Dynamic threshold of 100px before section enters viewport
  const threshold = 100;

  for (const [id, offset] of Object.entries(offsets)) {
    if (scrollY >= offset - threshold) {
      activeSection = id;
    }
  }
window.addEventListener('scroll', handleParallaxScroll);

// ========== AGREGAR ESTILOS DE ANIMACIÓN ==========
const style = document.createElement("style");
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
        opacity: 0;
    }

    if (scrollHero) {
        scrollHero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    } else if (scrollHeroCinematic && scrollCinematicVideo) {
        scrollCinematicVideo.style.transform = `translateX(-50%) translateY(calc(-50% + ${scrollPosition * 0.3}px))`;
    }

    let newActiveId = "";
    if (sectionOffsets && sectionOffsets.length > 0) {
        sectionOffsets.forEach(section => {
            if (section) {
                if (scrollY >= section.offsetTop - 200) {
                    newActiveId = section.id;
                }
            }
        });
    }
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Inicializar de inmediato para rastrear los enlaces de navegación
initStickyNavbar();
// Caching de elementos del DOM para evitar consultas constantes durante el scroll
const sections = document.querySelectorAll("section");
const navLinksAnchors = document.querySelectorAll(".nav-links a");

// Agrupamos los enlaces por ID para soportar múltiples menús (ej. desktop y mobile) apuntando a la misma sección
const linksById = {};
navLinksAnchors.forEach((link) => {
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

    if (newActiveId && scrollNavItems && scrollNavItems.length > 0) {
        scrollNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${newActiveId}`) {
                item.classList.add('active');
            }
        });
    }

    if (mainStickyNav && scrollHero) {
        const heroBottom = scrollHero.offsetHeight;
        if (scrollY > heroBottom - 100) {
            mainStickyNav.classList.remove('hidden');
        } else {
            mainStickyNav.classList.add('hidden');
        }
    }
}

if (typeof module !== 'undefined') {
    module.exports = { initScrollCoordinator, handleScroll };
    });
}

// Navegación Activa en Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

function updateActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

  return activeSection;
}

/**
 * Invalidates the cached offsets (used during resize events).
 */
function invalidateOffsetCache() {
  cachedOffsets = null;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateSectionOffsets,
        getSectionOffsets,
        determineActiveSection,
        invalidateOffsetCache,
        // Helper to let Jest clear the module-scoped variables:
        resetCache: () => {
            cachedOffsets = null;
        }
    };
}
document.addEventListener('DOMContentLoaded', () => {

    // Forzar autoplay de video de fondo si el navegador lo bloquea
    const bgVideo = document.getElementById('hero-bg-video');
    if (bgVideo) {
        bgVideo.muted = true;
        bgVideo.defaultMuted = true;
        const playPromise = bgVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                document.body.addEventListener('click', () => {
                    bgVideo.play();
                }, { once: true });
            });
        }
    }

    // Animación de entrada suave para la página
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease-in-out';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Si es móvil, podemos aplicar algunos ajustes específicos aquí
    if (isMobileDevice()) {
        const body = document.body;
        body.classList.add('is-mobile');
    }
});

// ========== STICKY NAVBAR ==========
function initStickyNavbar() {
    let lastScrollTop = 0;
    const stickyNav = document.querySelector('.sticky-nav');

    if (stickyNav) {
        // Start hidden
        stickyNav.classList.add('hidden');

        const handleScroll = () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Only show sticky nav if scrolled past hero section
            const heroSection = document.querySelector('.hero') || document.querySelector('.hero-cinematic');
            const heroBottom = heroSection ? heroSection.offsetHeight : 0;

            if (scrollTop > heroBottom) {
                stickyNav.classList.remove('hidden');
                if (scrollTop > lastScrollTop) {
                    // Scroll down - hide
                    stickyNav.style.transform = 'translateY(-100%)';
                } else {
                    // Scroll up - show
                    stickyNav.style.transform = 'translateY(0)';
                }
            } else {
                stickyNav.classList.add('hidden');
            }
            lastScrollTop = scrollTop;
        };

        window.addEventListener('scroll', handleScroll);

        // Check initial scroll position
        const heroSection = document.querySelector('.hero') || document.querySelector('.hero-cinematic');
        const heroBottom = heroSection ? heroSection.offsetHeight : 0;

        if (window.pageYOffset > heroBottom) {
            stickyNav.classList.remove("hidden");
        } else {
            stickyNav.classList.add("hidden");
        }

        // Return cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }
    return () => {};
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    initStickyNavbar();
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
    } else {
        stickyNav.classList.add('hidden');
    }

    lastScrollTop = scrollTop;
  });

  // Check initial scroll position
  window.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero') || document.querySelector('.hero-cinematic');
    const heroBottom = heroSection ? heroSection.offsetHeight : 0;

    if (window.pageYOffset > heroBottom) {
        stickyNav.classList.remove("hidden");
    } else {
        stickyNav.classList.add("hidden");
    }
  });
    // Start hidden
    stickyNav.classList.add('hidden');


}

// ========== VIDEO MODAL ==========
const modal = document.getElementById("video-modal");
const closeBtn = document.querySelector(".close-modal");
const youtubePlayer = document.getElementById("youtube-player");
const portfolioCards = document.querySelectorAll(".portfolio-card");

if (modal && closeBtn && youtubePlayer) {
  portfolioCards.forEach((card) => {
    card.addEventListener("click", () => {
      const videoId = card.getAttribute("data-youtube-id");
      if (videoId) {
        // Set the src with autoplay
        youtubePlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        modal.classList.add("show");
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
// ========== BACK TO TOP BUTTON ==========
const backToTopBtn = document.getElementById("back-to-top");

if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });


  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ========== BRAND VIDEO MODAL ==========
const brandModal = document.getElementById("brand-modal");
const closeBrandBtn = document.querySelector(".close-brand-modal");
const brandPlayer1 = document.getElementById("brand-player-1");
const brandPlayer2 = document.getElementById("brand-player-2");
const brandCards = document.querySelectorAll(".brand-card");

if (brandModal && closeBrandBtn && brandPlayer1 && brandPlayer2) {
  brandCards.forEach((card) => {
    card.addEventListener("click", () => {
      const video1Id = card.getAttribute("data-video-1");
      const video2Id = card.getAttribute("data-video-2");

      if (video1Id) {
        brandPlayer1.src = `https://www.youtube.com/embed/${video1Id}`;
        brandPlayer1.style.display = 'block';

        if (video2Id) {
            brandPlayer2.src = `https://www.youtube.com/embed/${video2Id}`;
            brandPlayer2.style.display = 'block';
        } else {
            brandPlayer2.src = '';
            brandPlayer2.style.display = 'none';
        }

        brandModal.classList.add("show");
      }
    });
  });


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
    footer_copy: "© 2026 Santiago Valle Rosso. Todos los derechos reservados.",
    cat_short_film: "Cortometraje",
    cat_documentary: "Documental",
    cat_music_video: "Videoclip",
    cat_campaign: "Campaña",
    gallery_subtitle: "Una selección de proyectos en los que trabajé como Director, Diseñador de Sonido y Editor."
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
    footer_copy: "© 2026 Santiago Valle Rosso. All rights reserved.",
    cat_short_film: "Short Film",
    cat_documentary: "Documentary",
    cat_music_video: "Music Video",
    cat_campaign: "Campaign",
    gallery_subtitle: "A curated selection of projects where I served as a Director, Sound Designer and Editor."
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
    footer_copy: "© 2026 Santiago Valle Rosso. Todos os direitos reservados.",
    cat_short_film: "Curta-metragem",
    cat_documentary: "Documentário",
    cat_music_video: "Videoclipe",
    cat_campaign: "Campanha",
    gallery_subtitle: "Uma seleção de projetos onde atuei como Diretor, Designer de Som e Editor."
  },
};

const placeholders = {
  es: {
    contact_name: "Tu nombre",
    contact_email: "Tu email",
    contact_message: "Tu mensaje",
  },
  en: {
    contact_name: "Your name",
    contact_email: "Your email",
    contact_message: "Your message",
  },
  pt: {
    contact_name: "Seu nome",
    contact_email: "Seu email",
    contact_message: "Sua mensagem",
  },
};

function changeLanguage(lang) {
  document.documentElement.lang = lang;

  // Update active button
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  // Update text content
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Update placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (placeholders[lang] && placeholders[lang][key]) {
      el.placeholder = placeholders[lang][key];
    }
  });
}

// Initialize language switcher
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      changeLanguage(e.target.dataset.lang);
    });
  });
});

// Call changeLanguage('es') on load as user wants Spanish
// Execute immediately since the script is deferred and DOM is ready
changeLanguage("es");

if (typeof module !== 'undefined') {
    module.exports = { initStickyNavbar, updateActiveNavLink, handleParallaxScroll, isMobileDevice, validateContactForm };
    module.exports = { updateActiveNavLink, handleParallaxScroll, isMobileDevice, validateContactForm };
}
