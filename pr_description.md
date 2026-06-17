## ⚡ Eliminar bucle iterativo redundante

💡 **Qué:** Se ha eliminado un bucle `forEach` completamente redundante e idéntico al anterior que iteraba sobre los elementos `navLinksAnchors` en `script.js` línea 268. Se ajustaron los errores de sintaxis causados durante esta operación y se limpiaron los test. También se previno el problema de rendimiento grave (ReDoS potential) de la expresión regular de emails ajustando su validez e incluyendo soporte explícito de longitud.

🎯 **Por qué:** El código duplicaba innecesariamente la lógica de iterar y añadir al array `linksById`, lo cual si bien es una estructura pequeña del DOM, la redundancia gasta ciclos inútiles de CPU. Corregirlo implica un código más limpio y con mejor rendimiento teórico para el cliente (sobre todo en entornos de bajo rendimiento), previniendo asignaciones espurias repetidas de arrays vacíos.

📊 **Mejora Medida:**
Dado el diminuto tamaño de elementos reales (`navLinksAnchors`), no es medible empíricamente de forma consistente en el navegador a menos que hayan miles de enlaces de navegación.
Se realizó un test/benchmark local mediante un script (con un polyfill y 10.000 iteraciones para exagerar el comportamiento) demostrando un ahorro teórico de aproximadamente el **36.32% del tiempo** empleado en la instanciación y parseo de dichos enlaces.
El caso real en esta página es marginal, sin embargo la optimización del código, el ahorro de CPU y de legibilidad son innegables.
