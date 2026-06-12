/**
 * @jest-environment jsdom
 */
const {
  translations,
  currentLanguage,
  determineActiveSection,
  changeLanguage,
  sectionOffsets
} = require('./script');

describe('Code Health & ScrollSpy Tests', () => {
  beforeEach(() => {
    // Configuración limpia del DOM Mock
    document.body.innerHTML = `
      <nav class="nav-links">
        <a href="#home" class="active">Home</a>
        <a href="#features">Features</a>
        <a href="#analytics">Analytics</a>
      </nav>
      <section id="home" style="height: 500px;"></section>
      <section id="features" style="height: 600px;"></section>
      <section id="analytics" style="height: 480px;"></section>

      <button class="lang-btn" data-lang="en">EN</button>
      <button class="lang-btn" data-lang="es">ES</button>

      <h1 data-i18n="title">Welcome to the Lab</h1>
      <p data-i18n="description">Multi-Performance tracking systems initialized.</p>
    `;

    // Inyección de offsets fijos para aislamiento del entorno de pruebas
    sectionOffsets.length = 0;
    sectionOffsets.push(
      { id: 'home', top: 0, bottom: 500 },
      { id: 'features', top: 500, bottom: 1100 },
      { id: 'analytics', top: 1100, bottom: 1580 }
    );
  });

  test('determineActiveSection returns current visible ID at coordinate', () => {
    expect(determineActiveSection(50)).toBe('home');
    expect(determineActiveSection(650)).toBe('features');
    expect(determineActiveSection(1200)).toBe('analytics');
    expect(determineActiveSection(2000)).toBeNull();
  });

  test('changeLanguage translates page elements correctly and sets active states', () => {
    changeLanguage('es');

    const title = document.querySelector('[data-i18n="title"]');
    const desc = document.querySelector('[data-i18n="description"]');

    expect(title.textContent).toBe('Bienvenido al Laboratorio');
    expect(desc.textContent).toBe('Sistemas de seguimiento de micro-rendimiento inicializados.');

    const activeBtn = document.querySelector('.lang-btn[data-lang="es"]');
    expect(activeBtn.classList.contains('active')).toBe(true);
  });

  test('changeLanguage gracefully handles unsupported translation keys', () => {
    changeLanguage('en');
    const title = document.querySelector('[data-i18n="title"]');
    expect(title.textContent).toBe('Welcome to the Lab');
  });
});
