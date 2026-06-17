# 🎨 Portfolio Personal - Template Profesional

Un template moderno, responsivo y completamente funcional para tu portfolio personal. ¡Perfecto para mostrar tus proyectos y habilidades!

## ✨ Características

- ✅ **Totalmente Responsivo** - Diseño mobile-first que funciona en cualquier dispositivo
- ✅ **Moderno y Profesional** - Gradientes atractivos y animaciones suaves
- ✅ **Fácil de Personalizar** - Solo necesitas cambiar texto, colores y enlaces
- ✅ **Funcional** - Menú hamburguesa, validación de formulario y animaciones
- ✅ **SEO Friendly** - Estructura HTML semántica
- ✅ **Rápido** - Sin dependencias externas (solo Font Awesome para iconos)

## 📦 Archivos Incluidos

```
.
├── index.html       # Estructura HTML con todas las secciones
├── styles.css       # Estilos responsivos y animaciones
├── script.js        # Funcionalidad interactiva
└── README.md        # Este archivo
```

## 🚀 Inicio Rápido

### 1. Clonar o descargar el repositorio
```bash
git clone https://github.com/santiagovallerosso/portfolio.git
cd portfolio
```

### 2. Abrir en navegador
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

O simplemente abre `index.html` con tu navegador favorito.

## 📝 Personalización

### Cambiar Información Personal

En `index.html`, reemplaza:

```html
<!-- Nombre -->
<h1 class="hero-title">Hola, soy <span class="highlight">TU NOMBRE</span></h1>

<!-- Descripción -->
<p class="hero-subtitle">Tu descripción profesional aquí</p>

<!-- Email -->
<a href="mailto:tu-email@example.com">tu-email@example.com</a>

<!-- Redes Sociales -->
<a href="https://github.com/tuusuario" target="_blank" rel="noopener noreferrer">
<a href="https://www.linkedin.com/in/tuusuario" target="_blank" rel="noopener noreferrer">
```

### Cambiar Colores

En `styles.css`, modifica las variables CSS en la sección `:root`:

```css
:root {
    --primary-color: #6366f1;        /* Color principal */
    --secondary-color: #8b5cf6;      /* Color secundario */
    --accent-color: #ec4899;         /* Color de acento */
    --text-dark: #1f2937;            /* Texto oscuro */
    --text-light: #6b7280;           /* Texto claro */
    --bg-light: #f9fafb;             /* Fondo claro */
}
```

### Agregar/Editar Proyectos

En `index.html`, busca la sección de proyectos y duplica este bloque:

```html
<div class="project-card">
    <div class="project-image">
        <div class="placeholder-project">
            <i class="fas fa-icon-aqui"></i>
        </div>
    </div>
    <div class="project-info">
        <h3>Nombre del Proyecto</h3>
        <p>Descripción del proyecto...</p>
        <div class="project-tags">
            <span class="tag">Tecnología1</span>
            <span class="tag">Tecnología2</span>
        </div>
        <a href="tu-enlace.com" class="project-link">Ver proyecto <i class="fas fa-arrow-right"></i></a>
    </div>
</div>
```

### Actualizar Habilidades

En `index.html`, modifica las listas de habilidades:

```html
<div class="skill-category">
    <h3>Categoría</h3>
    <ul class="skill-list">
        <li>Habilidad 1</li>
        <li>Habilidad 2</li>
        <li>Habilidad 3</li>
    </ul>
</div>
```

## 📧 Integración de Formulario

El formulario de contacto está preconfigurado con validación básica. Para enviar emails realmente, elige una opción:

### Opción 1: Formspree (Recomendado - Gratuito)

1. Ve a [formspree.io](https://formspree.io)
2. Regístrate y crea un nuevo formulario
3. Copia tu ID del formulario
4. En `script.js`, dentro del manejador del formulario, agrega el siguiente código:

```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
});
```

### Opción 2: EmailJS

1. Ve a [emailjs.com](https://www.emailjs.com)
2. Regístrate y obtén tu clave pública
3. En `script.js`, dentro del manejador del formulario, agrega y configura el siguiente código:

```javascript
emailjs.init('YOUR_PUBLIC_KEY');
// Configurar template IDs
```

### Opción 3: Backend Personalizado

Crea un endpoint en tu servidor para procesar los formularios.

## 🎨 Iconos Disponibles

El template usa [Font Awesome 6.4.0](https://fontawesome.com/icons). Algunos iconos útiles:

- `fas fa-code` - Programación
- `fas fa-globe` - Web
- `fas fa-mobile-alt` - Móvil
- `fas fa-chart-line` - Analytics
- `fas fa-envelope` - Email
- `fab fa-github` - GitHub
- `fab fa-linkedin` - LinkedIn
- `fab fa-twitter` - Twitter

## 📱 Responsive Breakpoints

El diseño es responsivo en estos puntos de quiebre:

- **320px** - Móviles pequeños
- **480px** - Móviles grandes
- **768px** - Tablets
- **1200px+** - Desktops

## 🚀 Deployment

### GitHub Pages (Gratuito)

1. Sube los archivos a tu repositorio
2. Ve a Settings → Pages
3. Selecciona "main branch" como source
4. Tu portfolio estará en: `https://username.github.io/portfolio`

### Vercel (Gratuito)

1. Ve a [vercel.com](https://vercel.com)
2. Importa tu repositorio de GitHub
3. ¡Listo! Se desplegará automáticamente con cada push

### Netlify (Gratuito)

1. Ve a [netlify.com](https://www.netlify.com)
2. Arrastra y suelta tu carpeta o conecta tu repositorio
3. Tu sitio estará en vivo en segundos

## 📚 Recursos Útiles

- [Font Awesome Icons](https://fontawesome.com/icons)
- [Google Fonts](https://fonts.google.com)
- [CSS Tricks](https://css-tricks.com)
- [MDN Web Docs](https://developer.mozilla.org)

## 🎯 Próximos Pasos

- [ ] Personalizar con tu información
- [ ] Agregar tus proyectos reales
- [ ] Cambiar colores a tu preferencia
- [ ] Configurar email del formulario
- [ ] Agregar tu foto/avatar
- [ ] Desplegar a internet
- [ ] Compartir con el mundo 🌍

## 💡 Tips

- Usa imágenes de alta calidad para tus proyectos
- Mantén el contenido conciso y relevante
- Actualiza regularmente tus proyectos
- Asegúrate de que los enlaces funcionan correctamente
- Prueba en diferentes dispositivos

## 📄 Licencia

Libre para usar, modificar y distribuir. ¡Úsalo como quieras!

## 🤝 Soporte

Si tienes preguntas o encuentras problemas, abre un issue en el repositorio.

---

**¡Espero que disfrutes tu nuevo portfolio! 🎉**

Hecho con ❤️ por [Santiago Vallerosso](https://github.com/santiagovallerosso)
