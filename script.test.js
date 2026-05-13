// --- Mocks para el DOM requeridos por script.js ---
global.document = {
  querySelector: jest.fn(() => null),
  querySelectorAll: jest.fn(() => []),
  createElement: jest.fn(() => ({ textContent: '' })),
  head: { appendChild: jest.fn() },
  body: { classList: { add: jest.fn(), remove: jest.fn() } },
  getElementById: jest.fn(() => null)
};

global.window = {
  addEventListener: jest.fn(),
  pageYOffset: 0,
  scrollY: 0,
  scrollTo: jest.fn()
};

global.navigator = {
  userAgent: 'node.js'
};

// Cargar la función a probar
const { validateContactForm } = require('./script');

describe('Validación de Formulario de Contacto (validateContactForm)', () => {

  test('debe retornar válido para un formulario correcto', () => {
    const result = validateContactForm('Juan Perez', 'juan@example.com', 'Hola, quiero contactarte.');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  test('debe fallar si los campos están vacíos', () => {
    const result = validateContactForm('', '', '');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Por favor completa todos los campos');
  });

  test('debe fallar si solo hay espacios en blanco (trim function)', () => {
    const result = validateContactForm('   ', '   ', '   ');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Por favor completa todos los campos');
  });

  test('debe fallar si falta el nombre', () => {
    const result = validateContactForm('', 'juan@example.com', 'Mensaje de prueba');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Por favor completa todos los campos');
  });

  test('debe fallar si falta el correo electrónico', () => {
    const result = validateContactForm('Juan Perez', '', 'Mensaje de prueba');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Por favor completa todos los campos');
  });

  test('debe fallar si falta el mensaje', () => {
    const result = validateContactForm('Juan Perez', 'juan@example.com', '');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Por favor completa todos los campos');
  });

  test('debe fallar con un correo electrónico inválido (sin @)', () => {
    const result = validateContactForm('Juan Perez', 'juanexample.com', 'Mensaje de prueba');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Por favor ingresa un email válido');
  });

  test('debe fallar con un correo electrónico inválido (sin dominio)', () => {
    const result = validateContactForm('Juan Perez', 'juan@', 'Mensaje de prueba');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Por favor ingresa un email válido');
  });

  test('debe validar correctamente correos con subdominios', () => {
    const result = validateContactForm('Juan Perez', 'juan@mail.example.com', 'Mensaje de prueba');
    expect(result.isValid).toBe(true);
  });

});
