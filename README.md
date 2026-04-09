# 15 Vueltas al Sol — Galería Privada Familiar
## Olympus Studio

---

## Estructura de archivos en el servidor

```
/tu-dominio/
│
├── index.html          ← Página principal
├── styles.css          ← Estilos
├── app.js              ← Lógica de la galería
├── api.php             ← Backend PHP (lee carpetas)
│
├── logo-olympus.png    ← (OPCIONAL) Pon aquí tu logo PNG
│                           luego en index.html reemplaza el <svg class="logo-svg"...>
│                           con: <img src="logo-olympus.png" alt="Olympus Studio" class="logo-img"/>
│
└── fotos/
    ├── CATERING/
    │   ├── foto1.jpg
    │   ├── foto2.jpg
    │   └── ...
    ├── CEREMONIA/
    ├── DECORACIÓN/         ← Con tilde o sin tilde, igual que el nombre en CATS_DEF de app.js
    ├── FIESTA/
    ├── FOTOS PASTEL/
    ├── INVITADOS/
    └── PRE-FIESTA/
```

---

## Requisitos del servidor

- PHP 7.4+ (la mayoría de hostings lo incluyen)
- Apache o Nginx con lectura de directorios habilitada
- Sin base de datos necesaria

---

## Formatos de foto soportados

JPG · JPEG · PNG · WEBP (mayúsculas y minúsculas)

Las fotos de 3600×4800 px (6×8 pulgadas a 600 ppi) se mostrarán perfectamente.
El navegador las escala automáticamente.

---

## Uso del logo

1. Coloca tu archivo `logo-olympus.png` en la raíz del proyecto.
2. En `index.html`, busca el comentario:
   ```
   <!-- PARA USAR TU LOGO: -->
   ```
3. Reemplaza el bloque `<svg class="logo-svg"...></svg>` por:
   ```html
   <img src="logo-olympus.png" alt="Olympus Studio" class="logo-img"/>
   ```

---

## Personalización rápida

| Qué cambiar | Dónde |
|---|---|
| Nombre de categorías | `app.js` → `CATS_DEF[].label` |
| Nombres de carpetas | `app.js` → `CATS_DEF[].name` (debe coincidir con la carpeta real) |
| Link de Google Drive | `app.js` → `CFG.DRIVE_LINK` |
| Colores principales | `styles.css` → sección `:root {}` |

---

## Funcionalidades incluidas

- ✅ Sistema solar animado con 15 planetas en órbita
- ✅ Canvas de estrellas y nebulosas en tiempo real
- ✅ Galería masonry estilo Pinterest
- ✅ Lightbox con animación deslizante entre fotos
- ✅ Barra de miniaturas (tira de contacto) en el lightbox
- ✅ Descarga directa de cada fotografía
- ✅ Navegación por teclado (← → Esc)
- ✅ Swipe táctil en móvil
- ✅ Responsive: 2 col móvil / 3 tablet / 5 escritorio
- ✅ Enlace a Google Drive en header y footer
- ✅ Espacio para logo PNG de Olympus Studio
