# controllers/

Esta carpeta decide **que hace el servidor cuando llega una peticion**.

Funciona igual que en Node: recibe la peticion, pide datos al model y pasa esos datos
a la view para que los pinte.

## Ejemplo

```php
<?php
// productosController.php

require_once '../models/productoModel.php';

function listar() {
    $productos = obtenerTodos();        // pide datos al model
    require '../views/index.php';       // carga la vista y le pasa los datos
}

function detalle($id) {
    $producto = obtenerPorId($id);      // busca el producto por id
    require '../views/producto.php';    // carga la vista de detalle
}
```

## Que archivos crear aqui

| Archivo                    | Para que sirve                          |
|----------------------------|-----------------------------------------|
| `productosController.php`  | Gestiona listado y detalle de productos |

## Regla

El controller no escribe SQL ni HTML.
Solo coordina: pide datos al model y se los da a la view.
