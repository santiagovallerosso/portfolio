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

    .section-title {
        animation: slideInLeft 0.6s ease forwards;
    }
`;
document.head.appendChild(style);

// Intersection Observer para animar elementos cuando son visibles
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".project-card, .section-title").forEach((el) => {
  el.style.animationPlayState = "paused";
  observer.observe(el);
});

// Cursor personalizado
const cursor = document.querySelector('.custom-cursor');
const links = document.querySelectorAll('a, button');

if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => cursor.classList.add('click'));
    document.addEventListener('mouseup', () => cursor.classList.remove('click'));

    links.forEach(link => {
        link.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        link.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Filtro de categorías
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'block';
                    // Re-trigger animation
                    card.style.animation = 'none';
                    card.offsetHeight; // trigger reflow
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
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


// Navbar interactivo - Esconder al hacer scroll hacia abajo, mostrar al hacer scroll hacia arriba
let lastScrollTop = 0;
const stickyNav = document.querySelector('.sticky-nav');

if (stickyNav) {
  window.addEventListener('scroll', () => {
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
  });

  const closeModal = () => {
    modal.classList.remove("show");
    // Stop video playback by clearing src
    setTimeout(() => {
      youtubePlayer.src = "";
    }, 300);
  };

  closeBtn.addEventListener("click", closeModal);

  // Close when clicking outside the video
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

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

  const closeBrandModal = () => {
    brandModal.classList.remove("show");
    // Stop video playback by clearing src
    setTimeout(() => {
      brandPlayer1.src = "";
      brandPlayer2.src = "";
    }, 300);
  };

  closeBrandBtn.addEventListener("click", closeBrandModal);

  // Close when clicking outside the videos
  brandModal.addEventListener("click", (e) => {
    if (
      e.target === brandModal ||
      e.target === document.querySelector(".brand-modal-content")
    ) {
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
    module.exports = { updateActiveNavLink, handleParallaxScroll, isMobileDevice, validateContactForm };
}
