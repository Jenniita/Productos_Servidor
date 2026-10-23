# node/

Esta carpeta contiene toda la implementacion de la tienda en **Node.js**.

Node.js es el servidor: es el programa que se queda escuchando peticiones del navegador
y devuelve paginas HTML ya construidas (renderizado por servidor).

Usamos **Express** como framework (el que gestiona las URLs y peticiones)
y **EJS** como motor de plantillas (el que mezcla HTML con datos de la base de datos).

## Que hay aqui

```
node/
├── src/
│   ├── routes/       → Las URLs que tiene la tienda
│   ├── controllers/  → Que hace el servidor cuando alguien entra a una URL
│   ├── models/       → Las consultas a la base de datos
│   ├── views/        → Las paginas HTML que se mandan al navegador
│   └── public/       → CSS, JS e imagenes que el navegador descarga directamente
├── app.js            → El archivo que arranca el servidor
└── .env              → Configuracion privada (contraseña de la BD, puerto, etc.)
```

## Orden en el que trabajar

1. Configura `app.js` para arrancar Express
2. Escribe las rutas en `routes/`
3. Escribe los controllers en `controllers/`
4. Escribe las consultas SQL en `models/`
5. Crea las vistas HTML en `views/`
6. Añade el CSS en `public/css/`
