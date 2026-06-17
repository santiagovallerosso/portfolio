
// Performance optimization: Throttling de scroll usando requestAnimationFrame
let isScrolling = false;

function throttledScrollHandler(originalHandler) {
  return function(event) {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        originalHandler(event);
        isScrolling = false;
      });
      isScrolling = true;
    }
  };
}

let sectionOffsets = [];
let cachedOffsets = null;
let cachedEntries = null;

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
  cachedEntries = Object.entries(offsets);
  return offsets;
}

function getSectionOffsets(sectionIds) {
  if (!cachedOffsets) {
    return updateSectionOffsets(sectionIds);
  }
  return cachedOffsets;
}

function determineActiveSection(scrollY, offsets, entries) {
  if (!offsets) return null;

  // Use the pre-calculated entries if provided (from cachedEntries), otherwise fallback to the slower Object.entries for ad-hoc usage
  const iterationTarget = entries || Object.entries(offsets);

  if (iterationTarget.length === 0) return null;

  let activeSection = null;
  const threshold = 100;

  for (let i = 0; i < iterationTarget.length; i++) {
    const id = iterationTarget[i][0];
    const offset = iterationTarget[i][1];
    if (scrollY >= offset - threshold) {
      activeSection = id;
    }
  }
  return activeSection;
}

function invalidateOffsetCache() {
  cachedOffsets = null;
  cachedEntries = null;
}

function validateContactForm(name, email, message) {
    if (name === null || email === null || message === null ||
        name === undefined || email === undefined || message === undefined) {
        return { isValid: false, error: 'Por favor completa todos los campos' };
    }

    const strName = String(name).trim();
    const strEmail = String(email).trim();
    const strMessage = String(message).trim();

    if (!strName || !strEmail || !strMessage) {
        return { isValid: false, error: 'Por favor completa todos los campos' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(strEmail)) {
        return { isValid: false, error: 'Por favor ingresa un email válido' };
    }

    return { isValid: true };
}

if (typeof module !== 'undefined') {
    module.exports = {
        validateContactForm,
        updateSectionOffsets,
        getSectionOffsets,
        determineActiveSection,
        invalidateOffsetCache,
        setSectionOffsets: (val) => { sectionOffsets = val; },
        throttledScrollHandler
    };
}
