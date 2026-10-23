# php/

Esta carpeta contiene toda la implementacion de la tienda en **PHP**.

PHP es un lenguaje que se ejecuta en el servidor igual que Node.js: recibe una peticion
del navegador, consulta la base de datos y devuelve una pagina HTML ya construida.

La estructura es la misma que en Node: routes, controllers, models y views.
La diferencia es que en PHP no necesitas un framework para las rutas basicas:
cada archivo `.php` ya es una URL accesible directamente.

## Que hay aqui

```
php/
├── controllers/  → Que hace el servidor cuando alguien entra a una URL
├── models/       → Las consultas a la base de datos (con PDO)
├── views/        → Las paginas HTML que se mandan al navegador
│   └── partials/ → Trozos reutilizables: cabecera, pie de pagina
├── public/       → CSS, JS e imagenes
└── config/
    └── db.php    → Configuracion de la conexion a PostgreSQL
```

## Orden en el que trabajar

1. Configura la conexion en `config/db.php`
2. Escribe las consultas SQL en `models/`
3. Escribe los controllers en `controllers/`
4. Crea las vistas HTML en `views/`
5. Añade el CSS en `public/css/`
