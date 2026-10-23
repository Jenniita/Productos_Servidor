# db/

Esta carpeta contiene el **script SQL que crea la base de datos** al arrancar Docker.

## Como funciona

Cuando Docker levanta el contenedor de PostgreSQL por primera vez, ejecuta
automaticamente todos los archivos `.sql` que encuentre en la carpeta
`/docker-entrypoint-initdb.d/` del contenedor. En el `docker-compose.yml`
se mapea esta carpeta `db/` a esa ruta, por lo que `init.sql` se ejecuta solo.

Esto significa que **no tienes que crear la base de datos a mano**.

## init.sql

Este archivo crea las tablas y mete los datos iniciales de la tienda.

```sql
-- Crea la tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id        SERIAL PRIMARY KEY,       -- id autoincremental
    nombre    VARCHAR(100) NOT NULL,    -- nombre del producto
    precio    NUMERIC(10, 2) NOT NULL,  -- precio con 2 decimales
    stock     INTEGER DEFAULT 0,        -- unidades disponibles
    imagen    VARCHAR(255),             -- nombre del archivo de imagen
    categoria VARCHAR(50)               -- categoria del producto
);

-- Datos de ejemplo
INSERT INTO productos (nombre, precio, stock, categoria) VALUES
    ('Camiseta', 19.99, 50, 'Ropa'),
    ('Zapatillas', 59.99, 30, 'Calzado'),
    ('Mochila', 34.99, 20, 'Accesorios');
```

## Regla

`init.sql` solo se ejecuta automaticamente la primera vez que postgres arranca
con la carpeta `volumes/postgres` vacia. Si ya hay datos, postgres lo ignora.

## Actualizar la base de datos sin borrar los datos

Para añadir tablas o columnas nuevas sin perder los datos existentes:

**1. Escribe los cambios en `init.sql` usando sentencias seguras:**

```sql
-- Tabla nueva (no falla si ya existe)
CREATE TABLE IF NOT EXISTS categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50)
);

-- Columna nueva en tabla existente (no falla si ya existe)
ALTER TABLE productos ADD COLUMN IF NOT EXISTS descripcion TEXT;

-- Datos nuevos sin duplicar
INSERT INTO productos (nombre, precio)
SELECT 'Nuevo producto', 9.99
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Nuevo producto');
```

**2. Ejecuta el script manualmente contra la BD existente:**

```powershell
docker exec -i tienda_postgres psql -U postgres -d tienda < db/init.sql
```

Esto aplica los cambios sobre los datos existentes sin borrar nada.

## Resetear la base de datos desde cero

Solo necesario si quieres empezar de cero (pierdes todos los datos):

```powershell
docker compose down
# Borra manualmente el contenido de volumes/postgres
docker compose up -d
```

## Agregar datos desde la terminal

También puedes conectarte directamente a PostgreSQL desde PowerShell y ejecutar
consultas SQL. Primero, asegúrate de que los contenedores estén iniciados:

```powershell
docker compose up -d
```

Después, abre una sesión de `psql` dentro del contenedor de PostgreSQL:

```powershell
docker compose exec postgres psql -U TU_DB_USER -d TU_DB_NAME
```

Sustituye `TU_DB_USER` y `TU_DB_NAME` por los valores de `DB_USER` y `DB_NAME`
de tu archivo `.env`. En el comando:

- `docker compose exec postgres` ejecuta un programa en el servicio `postgres`
  definido en `docker-compose.yml`.
- `psql` es la herramienta de PostgreSQL para trabajar desde la terminal.
- `-U` indica el usuario y `-d` indica la base de datos.

Cuando aparezca el indicador de `psql`, puedes crear una tabla y agregar datos.
Por ejemplo, para guardar clientes de la tienda:

```sql
CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    telefono VARCHAR(20),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO clientes (nombre, email, telefono)
VALUES ('Ana Pérez', 'ana@example.com', '600123456');
```

Para comprobar la tabla y consultar sus registros:

```sql
\dt
SELECT * FROM clientes;
```

Para salir de `psql`, escribe:

```text
\q
```

Las consultas modifican la base de datos activa y PostgreSQL guarda los cambios
en su almacenamiento persistente. No edites directamente los archivos de
`volumes/postgres`.
