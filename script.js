/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Diccionario centralizado de traducciones (Único origen de verdad)
const translations = {
  en: {
    title: "Welcome to the Lab",
    description: "Multi-Performance tracking systems initialized.",
    nav_home: "Home",
    nav_features: "Features",
    nav_analytics: "Analytics"
  },
  es: {
    title: "Bienvenido al Laboratorio",
    description: "Sistemas de seguimiento de micro-rendimiento inicializados.",
    nav_home: "Inicio",
    nav_features: "Características",
    nav_analytics: "Analítica"
  }
};

let currentLanguage = 'en';
let sectionOffsets = [];

/**
 * Calcula con precisión las coordenadas verticales de cada sección del documento.
 */
function updateSectionOffsets() {
  const sections = document.querySelectorAll('section');
  sectionOffsets = Array.from(sections).map(section => {
    const rect = section.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      id: section.id,
      top: rect.top + scrollTop,
      bottom: rect.bottom + scrollTop
    };
  });
}

/**
 * Encuentra el identificador de la sección activa de acuerdo con la posición del scroll.
 * @param {number} scrollPos - Posición actual de desplazamiento del scroll de la ventana
 * @returns {string|null} ID de la sección correspondiente o null
 */
function determineActiveSection(scrollPos) {
  const offsetBuffer = 100; // Margen de holgura para mejor fluidez visual
  const active = sectionOffsets.find(section =>
    scrollPos >= (section.top - offsetBuffer) &&
    scrollPos < (section.bottom - offsetBuffer)
  );
  return active ? active.id : null;
}

/**
 * Traduce el contenido dinámicamente de forma limpia eliminando cualquier duplicación.
 * @param {string} lang - Código de lenguaje de destino ('en' o 'es')
 */
function changeLanguage(lang) {
  if (!translations[lang]) return;
  currentLanguage = lang;

  // Modificación del DOM en un único recorrido limpio
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang][key]) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translations[lang][key];
      } else {
        element.textContent = translations[lang][key];
      }
    }
  });

  // Actualización de clases visuales en selectores de idioma
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

/**
 * Vinculación de eventos generales del DOM
 */
function initializeScrollSpy() {
  const navItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('resize', updateSectionOffsets);
  updateSectionOffsets();

  window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    const activeSectionId = determineActiveSection(scrollPos);

    if (activeSectionId) {
      navItems.forEach(item => {
        if (item.getAttribute('href') === `#${activeSectionId}`) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  });
}

// Exportación segura para Suite de Pruebas (Jest)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    translations,
    currentLanguage,
    sectionOffsets,
    updateSectionOffsets,
    determineActiveSection,
    changeLanguage,
    initializeScrollSpy
  };
}
