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
        youtubePlayer.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1';
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
  const cleanName = (typeof name === 'string' ? name : String(name || "")).trim();
  const cleanEmail = (typeof email === 'string' ? email : String(email || "")).trim();
  const cleanMessage = (typeof message === 'string' ? message : String(message || "")).trim();

  // Validación básica
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

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    document.addEventListener("DOMContentLoaded", () => {
        initStickyNavbar();
        changeLanguage("es");
    });
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    validateContactForm,
    updateActiveNavLink,
    handleParallaxScroll,
    isMobileDevice,
    updateSectionOffsets,
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

if (typeof module !== 'undefined') {
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

