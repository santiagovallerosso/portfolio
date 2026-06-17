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
    }
  });
  cachedOffsets = offsets;
  return offsets;
}

// ========== MENÚ HAMBURGUESA ==========
if (typeof document !== 'undefined') {
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
}

// ========== SMOOTH SCROLL ==========
if (typeof document !== 'undefined') {
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
}

function setupContactForm(formElement) {
  if (!formElement) return;

  const nameInput = formElement.querySelector('#name');
  const emailInput = formElement.querySelector('#email');
  const messageInput = formElement.querySelector('#message');
  const submitBtn = formElement.querySelector('button[type="submit"]');

  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const validation = validateContactForm(
        nameInput ? nameInput.value : '',
        emailInput ? emailInput.value : '',
        messageInput ? messageInput.value : ''
      );

      if (!validation.isValid) {
        alert(validation.error);
        return;
      }

      // Simulated success
      const originalText = submitBtn.textContent;
      const originalBg = submitBtn.style.background;

      submitBtn.textContent = '¡Enviado!';
      submitBtn.style.background = '#10b981';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = originalBg;
        submitBtn.disabled = false;
        formElement.reset();
      }, 3000);
    });
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector(".contact-form");
    setupContactForm(contactForm);
  });
}

// ========== EFECTO PARALLAX SIMPLE ==========
let hero = null;
let heroCinematic = null;
let cinematicVideo = null;

if (typeof document !== 'undefined') {
  document.addEventListener("DOMContentLoaded", () => {
    hero = document.querySelector(".hero");
    heroCinematic = document.querySelector(".hero-cinematic");
    cinematicVideo = document.querySelector(".hero-video");
  });
}

function handleParallaxScroll() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const scrollPosition = window.pageYOffset;
  const scrollHero = document.querySelector('.hero');
  const scrollHeroCinematic = document.querySelector('.hero-cinematic');
  const scrollCinematicVideo = document.querySelector('.hero-video');

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
    // Template Literal String Fix applied here
    scrollHero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
  } else if (scrollHeroCinematic && scrollCinematicVideo) {
    // Template Literal String Fix applied here
    scrollCinematicVideo.style.transform = `translateX(-50%) translateY(calc(-50% + ${scrollPosition * 0.3}px))`;
  }
}

function determineActiveSection(scrollY, offsets) {
  if (!offsets || Object.keys(offsets).length === 0) return null;
  let activeSection = null;
  const threshold = 100;

  for (const [id, offset] of Object.entries(offsets)) {
    if (scrollY >= offset - threshold) {
      activeSection = id;
    }
  }
  return activeSection;
}

if (typeof window !== 'undefined') {
  window.addEventListener('scroll', handleParallaxScroll);
}

function updateActiveNavLink(newActiveId) {
  if (typeof document === 'undefined') return;
  const scrollNavItems = document.querySelectorAll('.nav-links a');
  if (scrollNavItems && scrollNavItems.length > 0) {
    scrollNavItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === '#' + newActiveId) {
        item.classList.add('active');
      }
    });
  }
}

function isMobileDevice() {
  if (typeof navigator === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function invalidateOffsetCache() {
  cachedOffsets = null;
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
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

    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease-in-out';
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);

    if (isMobileDevice()) {
      document.body.classList.add('is-mobile');
    }
  });
}

function initStickyNavbar() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return () => {};
  let lastScrollTop = 0;
  const stickyNav = document.querySelector('.sticky-nav');

  if (stickyNav) {
    stickyNav.classList.add('hidden');

    const handleScroll = () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const heroSection = document.querySelector('.hero') || document.querySelector('.hero-cinematic');
      const heroBottom = heroSection ? heroSection.offsetHeight : 0;

      if (scrollTop > heroBottom) {
        stickyNav.classList.remove('hidden');
        if (scrollTop > lastScrollTop) {
          stickyNav.style.transform = 'translateY(-100%)';
        } else {
          stickyNav.style.transform = 'translateY(0)';
        }
      } else {
        stickyNav.classList.add('hidden');
      }
      lastScrollTop = scrollTop;
    };

    window.addEventListener('scroll', handleScroll);

    const heroSection = document.querySelector('.hero') || document.querySelector('.hero-cinematic');
    const heroBottom = heroSection ? heroSection.offsetHeight : 0;
    if (window.pageYOffset > heroBottom) {
      stickyNav.classList.remove("hidden");
    } else {
      stickyNav.classList.add("hidden");
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }
  return () => {};
}

function setupVideoModal(modalId, closeBtnSelector, triggerSelector, config) {
  if (typeof document === 'undefined') return;
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

if (typeof document !== 'undefined') {
  document.addEventListener("DOMContentLoaded", () => {
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

    setupVideoModal('video-modal', '.close-modal', '.portfolio-card', {
      players: [{ id: 'youtube-player', dataAttribute: 'data-youtube-id', autoplay: true }]
    });

    setupVideoModal('brand-modal', '.close-brand-modal', '.brand-card', {
      players: [
        { id: 'brand-player-1', dataAttribute: 'data-video-1', autoplay: false },
        { id: 'brand-player-2', dataAttribute: 'data-video-2', autoplay: false }
      ]
    });
  });

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
}

// ========== VALIDACIÓN DE FORMULARIO ==========
function validateContactForm(name, email, message) {
  const cleanName = (typeof name === 'string' ? name : String(name || "")).trim();
  const cleanEmail = (typeof email === 'string' ? email : String(email || "")).trim();
  const cleanMessage = (typeof message === 'string' ? message : String(message || "")).trim();

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return { isValid: false, error: "Por favor completa todos los campos" };
  }

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (cleanEmail.length > 254 || !emailRegex.test(cleanEmail)) {
    return { isValid: false, error: "Por favor ingresa un email válido" };
  }

  return { isValid: true };
}

function getSectionOffsets() {
    return cachedOffsets || {};
}

function setSectionOffsets(val) {
    cachedOffsets = val;
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  document.addEventListener("DOMContentLoaded", () => {
    initStickyNavbar();
  });
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    initStickyNavbar,
    updateActiveNavLink,
    handleParallaxScroll,
    isMobileDevice,
    validateContactForm,
    updateSectionOffsets,
    getSectionOffsets,
    setSectionOffsets,
    determineActiveSection,
    invalidateOffsetCache
  };
}
