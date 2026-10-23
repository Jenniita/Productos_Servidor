# TiendaProductos — Estructura del Proyecto

Proyecto de tienda online con renderizado en servidor, implementado en **Node.js (EJS)** y **PHP**, desplegado con **Docker** y base de datos **PostgreSQL**.

---

## Estructura

```
TiendaProductos/
├── docs/                          # Documentacion del proyecto
│   └── README.md
│
├── node/                          # Implementacion Node.js + EJS
│   ├── src/
│   │   ├── routes/                # (1) Define las URLs de la tienda
│   │   ├── controllers/           # (2) Decide que hacer cuando llega una peticion
│   │   ├── models/                # (3) Habla con la base de datos
│   │   ├── views/                 # (4) Las paginas HTML que ve el usuario (EJS)
│   │   │   ├── partials/          # Trozos reutilizables: cabecera, pie de pagina
│   │   │   ├── index.ejs          # Pagina principal: listado de productos
│   │   │   └── producto.ejs       # Pagina de detalle de un producto
│   │   └── public/               # Archivos estaticos: no los procesa Node
│   │       ├── css/               # Estilos
│   │       ├── js/                # Javascript del navegador
│   │       └── img/               # Imagenes
│   ├── app.js                     # Arranque del servidor Express
│   ├── package.json
│   └── .env                       # Contrasenas y configuracion (no subir a git)
│
├── php/                           # Implementacion PHP
│   ├── controllers/               # Logica de negocio
│   ├── models/                    # Acceso a datos (PDO/queries)
│   ├── views/                     # Plantillas PHP
│   │   ├── partials/              # Cabecera, pie de pagina, etc.
│   │   ├── index.php
│   │   └── producto.php
│   ├── public/                    # Estaticos servidos por Apache/Nginx
│   │   ├── css/
│   │   ├── js/
│   │   └── img/
│   └── config/
│       └── db.php                 # Configuracion conexion PostgreSQL
│
├── db/                            # Base de datos
│   └── init.sql                   # Script de creacion de tablas y datos
│
├── volumes/                       # Volumenes Docker (montados localmente)
│   ├── postgres/                  # Datos persistentes de PostgreSQL
│   └── pgadmin/                   # Datos persistentes de pgAdmin
│
└── docker-compose.yml             # Orquestacion de todos los servicios
```

---

## Como fluye una peticion en Node.js

Cuando el usuario abre `http://localhost:3000/productos` en el navegador, ocurre esto en orden:

```
Navegador → routes/ → controllers/ → models/ → Base de datos
                                             ↓
Navegador ← views/  ← controllers/ ←────────┘
```

### (1) `routes/` — Las URLs de la tienda

Aqui solo se dice "cuando alguien entre a esta URL, llama a esta funcion".
No hay logica, solo el mapa de la tienda.

```js
// routes/productos.js
router.get('/productos', productosController.listar);
router.get('/productos/:id', productosController.detalle);
```

### (2) `controllers/` — Que hacer cuando llega la peticion

Aqui esta la logica: pide los datos al model, y luego le dice a la view que los pinte.
Es el intermediario entre la URL y la base de datos.

```js
// controllers/productosController.js
async function listar(req, res) {
    const productos = await ProductoModel.obtenerTodos(); // pide datos
    res.render('index', { productos });                   // pinta la pagina
}
```

### (3) `models/` — Hablar con la base de datos

Aqui van las consultas SQL. El controller no sabe nada de SQL; le pide al model
los datos y el model se los devuelve ya listos.

```js
// models/productoModel.js
async function obtenerTodos() {
    const resultado = await db.query('SELECT * FROM productos');
    return resultado.rows;
}
```

### (4) `views/` — Lo que ve el usuario

Son los archivos `.ejs`: HTML normal con pequeños trozos de Javascript
para meter los datos que llegan del controller.

```html
<!-- views/index.ejs -->
<% productos.forEach(p => { %>
    <div class="producto">
        <h2><%= p.nombre %></h2>
        <p><%= p.precio %> €</p>
    </div>
<% }) %>
```

---

## Servicios Docker

| Servicio   | Descripcion                        | Puerto por defecto |
|------------|------------------------------------|--------------------|
| `postgres` | Base de datos PostgreSQL           | 5432               |
| `pgadmin`  | Interfaz grafica para PostgreSQL   | 8080               |
| `node`     | Servidor Node.js + EJS             | 3000               |
| `php`      | Servidor PHP (Apache/Nginx)        | 8000               |

---

## Base de datos

La tabla principal `productos` se inicializa mediante `db/init.sql`.

```sql
-- Ejemplo de estructura
CREATE TABLE productos (
    id        SERIAL PRIMARY KEY,
    nombre    VARCHAR(100) NOT NULL,
    precio    NUMERIC(10, 2) NOT NULL,
    stock     INTEGER DEFAULT 0,
    imagen    VARCHAR(255),
    categoria VARCHAR(50)
);
```

---

## Volumenes Docker

Los volumenes de PostgreSQL y pgAdmin se montan en `./volumes/` para persistir los datos entre reinicios del contenedor.

```yaml
# Fragmento docker-compose.yml
volumes:
  postgres_data:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: ./volumes/postgres
  pgadmin_data:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: ./volumes/pgadmin
```

---

## Reproducir el proyecto desde cero

Esta seccion resume los pasos para volver a montar el entorno (en este u otro
equipo). El objetivo final es **renderizar en el servidor una pagina web con los
productos de la base de datos**.

### Requisitos

- Docker Desktop instalado y arrancado
- El proyecto descargado en local
- Archivo `.env` presente (si no existe, copiar `.env.example` a `.env`)

### Pasos

**1. Comprobar que existe el `.env`**

```powershell
# Si no existe:
Copy-Item .env.example .env
```

**2. Levantar todos los contenedores**

```powershell
docker compose up --build -d
```

El `--build` solo es necesario la primera vez o si cambian los `Dockerfile`.
Comprueba que los cuatro servicios quedan `Up`:

```powershell
docker compose ps
```

**3. Comprobar que la base de datos tiene la tabla y los datos**

Si `volumes/postgres` estaba vacia, `db/init.sql` se ejecuta solo y crea la
tabla `productos`. Si no aparece, hay que vaciar `volumes/postgres` y volver a
levantar (ver `db/README.md`).

**4. Abrir pgAdmin y conectar con la base de datos**

- URL: `http://localhost:8080`
- Email: el valor de `PGADMIN_EMAIL` en `.env`
- Password: el valor de `PGADMIN_PASS` en `.env`

Dentro, registrar un servidor:

| Campo                | Valor      |
|----------------------|------------|
| Host name/address    | `postgres` |
| Port                 | `5432`     |
| Maintenance database | `postgres` |
| Username             | `postgres` |
| Password             | `password123` |

Si el nombre `postgres` no resuelve, usar la IP del contenedor:

```powershell
docker inspect tienda_postgres
# buscar "IPAddress" dentro de "Networks"
```

**5. Ver el resultado renderizado en el servidor**

- Node.js + EJS: `http://localhost:3000`
- PHP + Apache: `http://localhost:8000`

Aqui se ve la pagina ya renderizada en el servidor: el controller pide los
productos al model, el model consulta PostgreSQL y la view los pinta en HTML.

### Incidencias ya encontradas

- **pgAdmin: `failed to resolve host 'postgres'`**: los contenedores habian
  arrancado sin red asignada (`"Networks": {}`). Se soluciono bajando y
  volviendo a levantar (`docker compose down` + `docker compose up -d`).
- **La tabla no aparecia en pgAdmin**: el volumen ya tenia datos y por eso
  `init.sql` no se ejecutaba. Solucion: parar, vaciar `volumes/postgres` y
  volver a levantar.
- **Actualizar el esquema sin perder datos**: ver la seccion correspondiente en
  `db/README.md`.
