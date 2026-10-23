# config/

Esta carpeta contiene la **configuracion de la conexion a la base de datos**.

## db.php

Es el unico archivo que necesitas aqui. Crea la conexion PDO a PostgreSQL
usando las variables del entorno Docker.

```php
<?php
// config/db.php

$host   = getenv('DB_HOST') ?: 'postgres';
$port   = getenv('DB_PORT') ?: '5432';
$dbname = getenv('DB_NAME') ?: 'tienda';
$user   = getenv('DB_USER') ?: 'postgres';
$pass   = getenv('DB_PASS') ?: 'password';

$pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $pass);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
```

Todos los models hacen `require_once '../config/db.php'` para usar esta conexion.

## Regla

Las credenciales reales van en el `docker-compose.yml` como variables de entorno,
no hardcodeadas aqui. Asi el mismo codigo funciona en local y en produccion.
