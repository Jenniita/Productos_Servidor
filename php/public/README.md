# public/

Esta carpeta contiene **archivos estaticos**: CSS, Javascript del navegador e imagenes.

El servidor web (Apache o Nginx dentro de Docker) los sirve directamente sin procesarlos.

## Subcarpetas

| Carpeta | Contenido                                                      |
|---------|----------------------------------------------------------------|
| `css/`  | Hojas de estilo de la tienda                                   |
| `js/`   | Javascript que se ejecuta en el navegador (no en el servidor)  |
| `img/`  | Imagenes de productos, logo, etc.                              |

## Como se usan en las vistas PHP

```html
<link rel="stylesheet" href="/public/css/estilos.css">
<img src="/public/img/<?= $producto['imagen'] ?>" alt="<?= $producto['nombre'] ?>">
<script src="/public/js/main.js"></script>
```

## Regla

Todo lo que pongas aqui es accesible publicamente desde el navegador.
No pongas archivos con informacion sensible aqui.
