
/**
 * @file script.js
 * @description Production-grade DOM scroll & section tracker with cached offsets.
 */

// Memory Cache for section coordinates to avoid expensive getBoundingClientRect layout thrashing
let cachedOffsets = null;

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

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return { isValid: false, error: "Por favor completa todos los campos" };
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

    if (!name || !email || !message) {
      window.alert("Por favor completa todos los campos");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      window.alert("Por favor ingresa un email válido");
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
}

function setupVideoModal(modalId, closeBtnSelector, triggerSelector, config) {
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

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
        brandPlayer1.src = "https://www.youtube.com/embed/" + video1Id;
        brandPlayer1.style.display = 'block';

        if (video2Id) {
            brandPlayer2.src = "https://www.youtube.com/embed/" + video2Id;
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
