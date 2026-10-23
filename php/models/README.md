# models/

Esta carpeta contiene **las consultas a la base de datos**.

En PHP se usa **PDO** para conectarse a PostgreSQL y hacer consultas SQL.
PDO es la forma estandar y segura de hablar con bases de datos en PHP.

## Ejemplo

```php
<?php
// productoModel.php

require_once '../config/db.php'; // carga la conexion

// Devuelve todos los productos
function obtenerTodos() {
    global $pdo;
    $stmt = $pdo->query('SELECT * FROM productos ORDER BY nombre');
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Devuelve un producto por su id
function obtenerPorId($id) {
    global $pdo;
    $stmt = $pdo->prepare('SELECT * FROM productos WHERE id = ?');
    $stmt->execute([$id]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}
```

## Que archivos crear aqui

| Archivo              | Para que sirve                            |
|----------------------|-------------------------------------------|
| `productoModel.php`  | Consultas SQL de la tabla productos       |

## Regla

Los models solo hablan con la base de datos.
No generan HTML ni conocen las URLs.
