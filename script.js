
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

/**
 * @file script.js
 * @description Production-grade DOM scroll & section tracker with cached offsets.
 */
// Call changeLanguage('es') on load as user wants Spanish
// Execute immediately since the script is deferred and DOM is ready

let cachedOffsets = null;

/**
 * Calculates and caches the vertical offsets for section elements.
 * @param {string[]} sectionIds - Array of section IDs (e.g. ['home', 'about', 'services'])
 * @returns {Record<string, number>} Object mapping section ID to its vertical coordinate
 */


function getSectionOffsets() {
    return sectionOffsets;
function updateSectionOffsets(sectionIds) {
  if (!Array.isArray(sectionIds) || sectionIds.length === 0) {
    cachedOffsets = {};
    return cachedOffsets;
  }
  const offsets = {};
  sectionIds.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      offsets[id] = element.getBoundingClientRect().top + window.scrollY;
    } else {
      offsets[id] = 0;
    }
  });
  cachedOffsets = offsets;
  return offsets;
}

// ========== MENÚ HAMBURGUESA ==========
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach((n) =>
    n.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    })
  );
}

function validateContactForm(name, email, message) {
  const cleanName = typeof name === 'string' ? name.trim() : (name ? String(name).trim() : "");
  const cleanEmail = typeof email === 'string' ? email.trim() : (email ? String(email).trim() : "");
  const cleanMessage = typeof message === 'string' ? message.trim() : (message ? String(message).trim() : "");
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
  const cleanName = (typeof name === 'string' ? name : String(name || "")).trim();
  const cleanEmail = (typeof email === 'string' ? email : String(email || "")).trim();
  const cleanMessage = (typeof message === 'string' ? message : String(message || "")).trim();

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return { isValid: false, error: "Por favor completa todos los campos" };
  }

  // Validación de email
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  // Prevent extremely long emails from causing regex performance issues
  if (cleanEmail.length > 254 || !emailRegex.test(cleanEmail)) {
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
    if (!name || !email || !message) {
      window.alert("Por favor completa todos los campos");
      return;
    }

    // Validación de email
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (cleanEmail.length > 254 || !emailRegex.test(cleanEmail)) {
    return { isValid: false, error: "Por favor ingresa un email válido" };
  }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      window.alert("Por favor ingresa un email válido");
    const validation = validateContactForm(name, email, message);
    if (!validation.isValid) {
      window.alert(validation.error);
      return;
    }

    const submitBtn = formElement.querySelector('button[type="submit"]');
    if (submitBtn) {
        const originalText = submitBtn.textContent;
        const originalBg = submitBtn.style.background;

        submitBtn.textContent = '¡Mensaje enviado con éxito!';
        submitBtn.style.background = '#10b981';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = originalBg;
            submitBtn.disabled = false;
            formElement.reset();
        }, 3000);
    }
  });

  cachedOffsets = offsets;
  return offsets;
}

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact-form");
  setupContactForm(contactForm);
});

let hero = null;
let heroCinematic = null;
let cinematicVideo = null;

function handleParallaxScroll() {
  const scrolled = window.pageYOffset;
  if (hero) hero.style.transform = "translateY(" + scrolled * 0.5 + "px)";
  if (heroCinematic) heroCinematic.style.transform = "translateY(" + scrolled * 0.5 + "px)";
  if (cinematicVideo) cinematicVideo.style.transform = "translateY(" + scrolled * 0.4 + "px)";
}

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
const isMobileDevice = () => window.innerWidth <= 768;

window.addEventListener("scroll", () => {
  if (!isMobileDevice()) {
    handleParallaxScroll();
  } else {
    if (hero) hero.style.transform = "translateY(0)";
    if (heroCinematic) heroCinematic.style.transform = "translateY(0)";
    if (cinematicVideo) cinematicVideo.style.transform = "translateY(0)";
  }
});
  return activeSection;
}

  return activeSection;
}

  return activeSection;
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

let sectionOffsets = [];
const domSections = document.querySelectorAll('section');

function initScrollCoordinator() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return () => {};

    updateSectionOffsets();
    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}

function handleScroll() {
    const scrollPosition = window.pageYOffset;
    let newActiveId = null;

    if (sectionOffsets && sectionOffsets.length > 0) {
        sectionOffsets.forEach(section => {
            if (section && scrollPosition >= section.top - 200) {
                newActiveId = section.id;
            }
        });
    }
    let newActiveId = "";
    // Performance improvement: Avoid offsetTop layout thrashing during scroll
    if (sectionOffsets && sectionOffsets.length > 0) {
        sectionOffsets.forEach(section => {
            if (section && section.cachedOffsetTop !== undefined) {
                if (scrollY >= section.cachedOffsetTop - 200) {
                    newActiveId = section.id;
                }
            } else if (section) {
                // Fallback if not cached
                if (scrollY >= section.offsetTop - 200) {
                    newActiveId = section.id;
                }
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
// Inicializar de inmediato para rastrear los enlaces de navegación
initStickyNavbar();
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


// Optimización de rendimiento: Usar IntersectionObserver en lugar de eventos de scroll síncronos
const observerOptions = {
    root: null,
    rootMargin: '-200px 0px -50% 0px', // Aproximación a la lógica top - 200 y evitando activación doble
    threshold: 0
};

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
                // Añadimos la clase active a los enlaces nuevos
                if (newActiveId && linksById[newActiveId]) {
                    linksById[newActiveId].forEach(link => link.classList.add("active"));
                }
            }
            currentActiveId = newActiveId;
        }
    });
}, observerOptions);

  let activeSection = '';

  for (const section of sectionOffsets) {
    if (scrollPosition >= section.top - threshold && scrollPosition < section.top + section.height - threshold) {
      activeSection = section.id;
    }
  }

  return activeSection;
    if (newActiveId !== currentActiveId) {
        currentActiveId = newActiveId;
        updateActiveNavLink(newActiveId);
    }
}

let currentActiveId = "";
const linksById = {};

function initStickyNavbar() {
    const navLinksAnchors = document.querySelectorAll(".nav-links a");
    navLinksAnchors.forEach(link => {
        const href = link.getAttribute("href");
        if (!href) return;
        const id = href.slice(1);
        if (!linksById[id]) linksById[id] = [];
        linksById[id].push(link);
    });
}
initStickyNavbar();

function updateActiveNavLink(id) {
    document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
    if (linksById[id]) {
        linksById[id].forEach(link => link.classList.add('active'));
    }
  });
});

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { initScrollCoordinator, handleScroll };
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
// Initialize section offsets cache to avoid layout thrashing during scroll
function cacheSectionOffsets() {
    sectionOffsets = Array.from(domSections).map(section => ({
        id: section.id,
        offsetTop: section.offsetTop, // Will be used as fallback if caching fails
        cachedOffsetTop: section.offsetTop // Performance optimization
    }));
}

if (typeof document !== 'undefined') {
    document.addEventListener("DOMContentLoaded", cacheSectionOffsets);
    window.addEventListener("resize", cacheSectionOffsets);
}

function changeLanguage(lang) {
    // mock implementation
}

function updateSectionOffsets(sectionIds) {
    if (!Array.isArray(sectionIds)) return {};
    const offsets = {};
    sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) offsets[id] = el.getBoundingClientRect().top + (window.scrollY || 0);
    });
    cachedOffsets = offsets;
    return offsets;
}

function getSectionOffsets() {
    return sectionOffsets;
}

function getSectionOffsets() {
    return sectionOffsets;
}

function getSectionOffsets() {
    return sectionOffsets;
}

if (typeof ResizeObserver !== 'undefined') {
    const observer = new ResizeObserver(updateSectionOffsets);
    observer.observe(document.body);
} else {
    window.addEventListener('resize', updateSectionOffsets);
}

function getSectionOffsets() {
    return cachedOffsets;
}

function isMobileDevice() {
    return window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
/**
 * Invalidates the cached offsets (used during resize events).
 */
function invalidateOffsetCache() {
  cachedOffsets = null;
}

function setSectionOffsets(val) {
    sectionOffsets = val;
}

// ========== STICKY NAVBAR ==========
function initStickyNavbar() {
    const stickyNav = document.getElementById('main-nav');
    if (!stickyNav) return () => {};
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

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            stickyNav.classList.add('hidden');
        } else {
            stickyNav.classList.remove('hidden');
        }
    }
        lastScrollTop = scrollTop;

        // Return cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
}

function updateActiveNavLink() {
    // mock
}

function handleParallaxScroll() {
    // mock
}

// ========== UNIFIED VIDEO MODAL LOGIC ==========
function setupVideoModal(modalId, closeBtnSelector, triggerSelector, config) {
    if (typeof document === "undefined") return;
    const modal = document.getElementById(modalId);
    const closeBtn = modal ? modal.querySelector(closeBtnSelector) : null;
    const triggers = document.querySelectorAll(triggerSelector);

    if (!modal || !closeBtn || triggers.length === 0) return;

    const players = config.players.map(p => document.getElementById(p.id));

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            let hasVideo = false;
            config.players.forEach((playerConfig, index) => {
                const videoId = trigger.getAttribute(playerConfig.dataAttribute);
                if (videoId && players[index]) {
                    hasVideo = true;
                    const autoplayParam = playerConfig.autoplay ? '?autoplay=1' : '';
                    players[index].src = "https://www.youtube.com/embed/" + videoId + autoplayParam;
                    players[index].src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}${autoplayParam}`;
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
}

const modal = document.getElementById("video-modal");
const closeBtn = document.querySelector(".close-modal");
const youtubePlayer = document.getElementById("youtube-player");
const portfolioCards = document.querySelectorAll(".portfolio-card");

if (modal && closeBtn && youtubePlayer) {
  portfolioCards.forEach((card) => {
    card.addEventListener("click", () => {
      const videoId = card.getAttribute("data-youtube-id");
      if (videoId) {
        youtubePlayer.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1';
        // Set the src with autoplay
        youtubePlayer.src = 'https://www.youtube.com/embed/' + encodeURIComponent(videoId) + '?autoplay=1';
        modal.classList.add("show");
      }
    });
  });
}

setupVideoModal(
    'video-modal',
    '.close-modal',
    '.portfolio-card',
    { players: [{ id: 'youtube-player', dataAttribute: 'data-youtube-id', autoplay: true }] }
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
const backToTopBtn = document.getElementById("back-to-top");
if (backToTopBtn) {
    let isScrolling = false;
  window.addEventListener("scroll", () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 500) {
          backToTopBtn.classList.add("visible");
        } else {
          backToTopBtn.classList.remove("visible");
        }
        isScrolling = false;
      });
      isScrolling = true;
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const brandModal = document.getElementById("brand-modal");
const closeBrandBtn = document.querySelector(".close-brand-modal");
const brandPlayer1 = document.getElementById("brand-player-1");
const brandPlayer2 = document.getElementById("brand-player-2");
const brandCards = document.querySelectorAll(".brand-card");
function validateContactForm(name, email, message) {
  const cleanName = (typeof name === 'string' ? name : (name == null ? "" : String(name))).trim();
  const cleanEmail = (typeof email === 'string' ? email : (email == null ? "" : String(email))).trim();
  const cleanMessage = (typeof message === 'string' ? message : (message == null ? "" : String(message))).trim();

  // Validación básica
  if (!cleanName || !cleanEmail || !cleanMessage) {
    return { isValid: false, error: "Por favor completa todos los campos" };
  }

      if (video1Id) {
        brandPlayer1.src = "https://www.youtube.com/embed/" + video1Id;
        brandPlayer1.style.display = 'block';

        if (video2Id) {
            brandPlayer2.src = "https://www.youtube.com/embed/" + video2Id;
            brandPlayer2.style.display = 'block';
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
  // Validación de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  // Prevent extremely long emails from causing regex performance issues
  if (cleanEmail.length > 254 || !emailRegex.test(cleanEmail)) {
    return { isValid: false, error: "Por favor ingresa un email válido" };
  }

  return { isValid: true };
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    document.addEventListener("DOMContentLoaded", () => {
        initStickyNavbar();
        changeLanguage("es");
    });
  });
}

const translations = {
  es: { nav_work: "TRABAJOS" },
  en: { nav_work: "WORK" },
  pt: { nav_work: "TRABALHOS" },
};
const placeholders = {
  es: { contact_name: "Tu nombre" },
  en: { contact_name: "Your name" },
  pt: { contact_name: "Seu nome" },
};

function changeLanguage(lang) {
  if (typeof document === "undefined") return;
  if (!document.documentElement) return;

  document.documentElement.lang = lang;
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (translations[lang] && translations[lang][key]) el.textContent = translations[lang][key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (placeholders[lang] && placeholders[lang][key]) el.placeholder = placeholders[lang][key];
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
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      changeLanguage(e.target.dataset.lang);
    });
  });
});

changeLanguage("es");

if (typeof module !== 'undefined') {
    module.exports = {
        initStickyNavbar: typeof initStickyNavbar !== 'undefined' ? initStickyNavbar : undefined,
        updateActiveNavLink: typeof updateActiveNavLink !== 'undefined' ? updateActiveNavLink : undefined,
        handleParallaxScroll: typeof handleParallaxScroll !== 'undefined' ? handleParallaxScroll : undefined,
        isMobileDevice: typeof isMobileDevice !== 'undefined' ? isMobileDevice : undefined,
        validateContactForm: typeof validateContactForm !== 'undefined' ? validateContactForm : undefined,
        updateSectionOffsets: typeof updateSectionOffsets !== 'undefined' ? updateSectionOffsets : undefined,
        getSectionOffsets: typeof sectionOffsets !== 'undefined' ? () => sectionOffsets : undefined,
        setSectionOffsets: (val) => { if (typeof sectionOffsets !== 'undefined') sectionOffsets = val; },
        initScrollCoordinator: typeof initScrollCoordinator !== 'undefined' ? initScrollCoordinator : undefined,
        handleScroll: typeof handleScroll !== 'undefined' ? handleScroll : undefined,
    };
}
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    determineActiveSection,
    validateContactForm,
    updateActiveNavLink,
    handleParallaxScroll,
    isMobileDevice,
    updateSectionOffsets,
    determineActiveSection,
    determineActiveSection,
    getSectionOffsets,
    setSectionOffsets,
    initStickyNavbar
  };
}


// Call changeLanguage('es') on load as user wants Spanish
// Execute immediately since the script is deferred and DOM is ready
if (typeof changeLanguage === 'function') {
    changeLanguage("es");
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = {
        initStickyNavbar,
        updateActiveNavLink: typeof updateActiveNavLink !== 'undefined' ? updateActiveNavLink : undefined,
        handleParallaxScroll: typeof handleParallaxScroll !== 'undefined' ? handleParallaxScroll : undefined,
        isMobileDevice,
        validateContactForm,
        updateSectionOffsets: typeof updateSectionOffsets !== 'undefined' ? updateSectionOffsets : undefined,
        getSectionOffsets: () => typeof sectionOffsets !== 'undefined' ? sectionOffsets : [],
        setSectionOffsets: (val) => { if(typeof sectionOffsets !== 'undefined') sectionOffsets = val; }
    };
}


}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    validateContactForm
  };
}
