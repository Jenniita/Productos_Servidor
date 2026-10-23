# views/

Esta carpeta contiene **las paginas HTML que ve el usuario**.

En PHP las vistas son archivos `.php` con HTML normal. Para meter datos dinamicos
simplemente abres `<?php ?>` donde necesites y escribes el valor.

## Sintaxis basica

```php
<!-- Imprimir un valor -->
<h1><?= $producto['nombre'] ?></h1>

<!-- Recorrer una lista -->
<?php foreach ($productos as $p): ?>
    <div><?= $p['nombre'] ?> — <?= $p['precio'] ?> €</div>
<?php endforeach; ?>

<!-- Incluir un partial -->
<?php include 'partials/cabecera.php'; ?>
```

## Que archivos crear aqui

| Archivo / Carpeta          | Para que sirve                                      |
|----------------------------|-----------------------------------------------------|
| `index.php`                | Pagina principal: muestra el listado de productos   |
| `producto.php`             | Pagina de detalle de un producto concreto           |
| `partials/cabecera.php`    | Cabecera HTML reutilizable                          |
| `partials/pie.php`         | Pie de pagina reutilizable                          |

## Regla

Las views no hacen consultas SQL ni tienen logica de negocio.
Solo muestran los datos que les llegan del controller.
