# public/

Esta carpeta contiene **archivos estaticos**: CSS, Javascript del navegador e imagenes.

La diferencia con el resto de la aplicacion es que estos archivos **Node no los procesa**:
el navegador los descarga directamente tal cual estan guardados.

## Subcarpetas

| Carpeta | Contenido                                                        |
|---------|------------------------------------------------------------------|
| `css/`  | Hojas de estilo de la tienda (`estilos.css`, etc.)              |
| `js/`   | Javascript que se ejecuta en el navegador (no en el servidor)   |
| `img/`  | Imagenes de productos, logo de la tienda, etc.                  |

## Como se usan en las vistas EJS

```html
<!-- Enlazar el CSS -->
<link rel="stylesheet" href="/css/estilos.css">

<!-- Mostrar una imagen -->
<img src="/img/<%= producto.imagen %>" alt="<%= producto.nombre %>">

<!-- Enlazar un JS del navegador -->
<script src="/js/main.js"></script>
```

## Regla

Todo lo que pongas aqui es publico y accesible desde el navegador directamente.
No pongas aqui archivos con informacion sensible (contraseñas, configuracion, etc.).
