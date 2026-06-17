
function validateContactForm(name, email, message) {
  const cleanName = typeof name === 'string' ? name.trim() : (name ? String(name).trim() : "");
  const cleanEmail = typeof email === 'string' ? email.trim() : (email ? String(email).trim() : "");
  const cleanMessage = typeof message === 'string' ? message.trim() : (message ? String(message).trim() : "");

  // Validación básica
  if (!cleanName || !cleanEmail || !cleanMessage) {
    return { isValid: false, error: "Por favor completa todos los campos" };
  }

  // Validación de email
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailRegex.test(cleanEmail)) {
    return { isValid: false, error: "Por favor ingresa un email válido" };
  }

  return { isValid: true };
}

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
    }
  });
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

function handleParallaxScroll() {
    const scrollPosition = window.pageYOffset;
    if (hero) {
        hero.style.backgroundPosition = 'center ' + (scrollPosition * 0.5) + 'px';
    } else if (heroCinematic && cinematicVideo) {
        cinematicVideo.style.transform = 'translateX(-50%) translateY(calc(-50% + ' + (scrollPosition * 0.3) + 'px))';
    }
}
if (typeof window !== "undefined") {
    window.addEventListener('scroll', handleParallaxScroll);
}

// ========== AGREGAR ESTILOS DE ANIMACIÓN ==========
if (typeof document !== "undefined") {
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
        }`;
    document.head.appendChild(style);
}

// ========== SCROLLSPY (from user instructions) ==========
let sections = [];
let navItems = [];
if (typeof document !== "undefined") {
    sections = document.querySelectorAll('section[id]');
    navItems = document.querySelectorAll('.nav-links a');
}

// Colección local para almacenar los offsets calculados de cada sección
let sectionOffsets = [];

/**
 * Recalcula y actualiza las posiciones top y la altura de cada sección.
 * Se debe ejecutar al cargar la página y al redimensionar la ventana (resize).
 */
function updateSectionOffsets() {
  let domSections = sections;
  if (typeof document !== "undefined") {
    domSections = document.querySelectorAll("section");
  }
  sectionOffsets = Array.from(domSections).map(section => {
    return {
      id: section.getAttribute("id"),
      top: section.offsetTop,
      height: section.offsetHeight
    };
  });
}

function getSectionOffsets() {
    return sectionOffsets;
}
function setSectionOffsets(val) {
    sectionOffsets = val;
}

/**
 * Determina cuál es la sección visible actualmente en el viewport
 * aplicando un umbral (threshold) para mejorar la usabilidad del scroll.
 * @returns {string} ID de la sección activa
 */
function determineActiveSection() {
  const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
  // Un margen de 150px suele ser ideal para activar el enlace antes de llegar al tope
  const threshold = 150;

  let activeSection = '';

  for (const section of sectionOffsets) {
    if (scrollPosition >= section.top - threshold && scrollPosition < section.top + section.height - threshold) {
      activeSection = section.id;
    }
  }

  return activeSection;
}

/**
 * Actualiza la clase activa en los enlaces de navegación basándose en el ID actual
 */
function updateActiveNavLink() {
  const activeSectionId = determineActiveSection();

  navItems.forEach(item => {
    // Removemos la clase de forma preventiva
    item.classList.remove('active');

    // Obtenemos el href (ej: "#services") y verificamos si coincide con la sección activa
    const href = item.getAttribute('href');
    if (href === `#${activeSectionId}`) {
      item.classList.add('active');
    }
  });
}

// 2. Registro de Event Listeners de forma segura
if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    updateSectionOffsets();
    updateActiveNavLink();
  });

  if (typeof ResizeObserver !== "undefined") {
    const observer = new ResizeObserver(() => {
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(updateSectionOffsets);
      } else {
        updateSectionOffsets();
      }
    });
    if (typeof document !== "undefined" && document.body) {
        observer.observe(document.body);
    }
  } else {
    window.addEventListener("resize", updateSectionOffsets);
  }
  window.addEventListener("scroll", updateActiveNavLink);
}

// ========== AUTOPLAY HERO VIDEO ==========
if (typeof document !== "undefined") {
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
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            const body = document.body;
            body.classList.add('is-mobile');
        }
    });
}

// ========== STICKY NAVBAR ==========
function initStickyNavbar() {
    let lastScrollTop = 0;
    if (typeof document === "undefined") return;
    const stickyNav = document.querySelector('.sticky-nav');

    if (stickyNav) {
        // Start hidden
        stickyNav.classList.add('hidden');

        const handleScrollSticky = () => {
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

        window.addEventListener('scroll', handleScrollSticky);

        // Check initial scroll position
        const heroSection = document.querySelector('.hero') || document.querySelector('.hero-cinematic');
        const heroBottom = heroSection ? heroSection.offsetHeight : 0;

        if (window.pageYOffset > heroBottom) {
            stickyNav.classList.remove("hidden");
        } else {
            stickyNav.classList.add("hidden");
        }
    }
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    initStickyNavbar();
}

// ========== UNIFIED VIDEO MODAL LOGIC ==========
function setupVideoModal(modalId, closeBtnSelector, triggerSelector, config) {
    if (typeof document === "undefined") return;
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

// ========== BACK TO TOP BUTTON ==========
if (typeof document !== "undefined") {
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
}

// ========== BRAND VIDEO MODAL OVERRIDE ==========
// (Keep for backwards compat or specific structure if any)
if (typeof document !== "undefined") {
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
    }
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
  if (typeof document === "undefined") return;
  if (!document.documentElement) return;

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
if (typeof document !== "undefined") {
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
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { validateContactForm, updateSectionOffsets, getSectionOffsets, setSectionOffsets };
}
