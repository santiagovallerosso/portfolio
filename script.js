// Call changeLanguage('es') on load as user wants Spanish
// Execute immediately since the script is deferred and DOM is ready

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
    } else {
      offsets[id] = 0;
    }
  });

  cachedOffsets = offsets;
  return offsets;
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
    }`;

    if (scrollHero) {
        scrollHero.style.backgroundPosition = 'center ' + (scrollPosition * 0.5) + 'px';
    } else if (scrollHeroCinematic && scrollCinematicVideo) {
        scrollCinematicVideo.style.transform = 'translateX(-50%) translateY(calc(-50% + ' + (scrollPosition * 0.3) + 'px))';
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
navLinksAnchors.forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;
    const id = href.slice(1);
    if (!linksById[id]) {
        linksById[id] = [];
    }
    linksById[id].push(link);
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


// Optimización de rendimiento: Usar IntersectionObserver en lugar de eventos de scroll síncronos
const observerOptions = {
    root: null,
    rootMargin: '-200px 0px -50% 0px', // Aproximación a la lógica top - 200 y evitando activación doble
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
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
            }
            currentActiveId = newActiveId;
        }
    });
}, observerOptions);

// Observar cada sección
sections.forEach(section => {
    observer.observe(section);
});
// Intersection Observer para animar elementos cuando son visibles
const observerOptionsAnim = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const animObserver = new IntersectionObserver((entries, animObserver) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
      animObserver.unobserve(entry.target);
    }
  });
});

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { initScrollCoordinator, handleScroll };
}

// Navegación Activa en Scroll
const domSections = document.querySelectorAll('section');

// Caché de posiciones de secciones
let sectionOffsets = [];

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
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
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

});

// ========== STICKY NAVBAR ==========
function initStickyNavbar() {
    const stickyNav = document.getElementById('main-nav');
    if (!stickyNav) return () => {};
    let lastScrollTop = 0;

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            stickyNav.classList.add('hidden');
        } else {
            stickyNav.classList.remove('hidden');
        }
        lastScrollTop = scrollTop;

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

function isMobileDevice() {
    return window.innerWidth < 768;


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
        youtubePlayer.src = 'https://www.youtube.com/embed/' + encodeURIComponent(videoId) + '?autoplay=1';
        modal.classList.add("show");
      }
    });
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

function validateContactForm(name, email, message) {
  const cleanName = (typeof name === 'string' ? name : (name == null ? "" : String(name))).trim();
  const cleanEmail = (typeof email === 'string' ? email : (email == null ? "" : String(email))).trim();
  const cleanMessage = (typeof message === 'string' ? message : (message == null ? "" : String(message))).trim();

  // Validación básica
  if (!cleanName || !cleanEmail || !cleanMessage) {
    return { isValid: false, error: "Por favor completa todos los campos" };
  }

  // Validación de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
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
