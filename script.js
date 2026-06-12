// Call changeLanguage('es') on load as user wants Spanish
// Execute immediately since the script is deferred and DOM is ready

let cachedOffsets = null;
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

function getSectionOffsets() {
    return sectionOffsets;
}

function setSectionOffsets(val) {
    sectionOffsets = val;
}

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
