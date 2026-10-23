# views/partials/

Esta carpeta guarda **trozos de HTML reutilizables**.

Funciona igual que en Node/EJS: en lugar de repetir la cabecera y el pie en cada pagina,
los escribes una vez aqui y los incluyes con `include`.

## Como incluir un partial

```php
<!-- Al principio de index.php o producto.php -->
<?php include 'partials/cabecera.php'; ?>

<!-- Tu contenido aqui -->
<main>...</main>

<!-- Al final -->
<?php include 'partials/pie.php'; ?>
```

## Que archivos crear aqui

| Archivo         | Para que sirve                            |
|-----------------|-------------------------------------------|
| `cabecera.php`  | La cabecera HTML con el menu de la tienda |
| `pie.php`       | El pie de pagina                          |
