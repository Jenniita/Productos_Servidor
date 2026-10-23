# views/

Esta carpeta contiene **las paginas HTML que ve el usuario**.

Los archivos `.ejs` son HTML normal, pero tienen una sintaxis especial para meter
datos dinamicos que vienen del controller (nombres de productos, precios, etc.).

## Sintaxis EJS basica

```html
<!-- Imprimir un valor -->
<h1><%= producto.nombre %></h1>

<!-- Recorrer una lista -->
<% productos.forEach(function(p) { %>
    <div><%= p.nombre %> — <%= p.precio %> €</div>
<% }) %>

<!-- Incluir un partial (cabecera, pie...) -->
<%- include('partials/cabecera') %>
```

## Que archivos crear aqui

| Archivo / Carpeta       | Para que sirve                                      |
|-------------------------|-----------------------------------------------------|
| `index.ejs`             | Pagina principal: muestra el listado de productos   |
| `producto.ejs`          | Pagina de detalle de un producto concreto           |
| `partials/cabecera.ejs` | Cabecera HTML reutilizable (se incluye en todas)    |
| `partials/pie.ejs`      | Pie de pagina reutilizable                          |

## Que son los partials

Son trozos de HTML que se repiten en varias paginas (cabecera, menu, pie).
En lugar de copiar y pegar, los metes en `partials/` y los incluyes con `include()`.

## Regla

Las views no hacen consultas a la base de datos ni tienen logica de negocio.
Solo pintan los datos que les llegan del controller.
