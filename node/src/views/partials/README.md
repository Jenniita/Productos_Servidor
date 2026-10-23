# views/partials/

Esta carpeta guarda **trozos de HTML reutilizables**.

Un partial es una parte de pagina que aparece en varias vistas: la cabecera con el
menu, el pie de pagina, una tarjeta de producto, etc. En lugar de repetir el mismo
HTML en cada archivo, lo escribes una vez aqui y lo incluyes donde lo necesites.

## Como incluir un partial en una vista

```html
<!-- Al principio de index.ejs o producto.ejs -->
<%- include('partials/cabecera') %>

<!-- Tu contenido aqui -->
<main>...</main>

<!-- Al final -->
<%- include('partials/pie') %>
```

## Que archivos crear aqui

| Archivo         | Para que sirve                          |
|-----------------|-----------------------------------------|
| `cabecera.ejs`  | La cabecera HTML con el menu de la tienda |
| `pie.ejs`       | El pie de pagina                        |
