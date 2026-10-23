# models/

Esta carpeta contiene **las consultas a la base de datos**.

El model es el unico que sabe SQL en toda la aplicacion. El controller le pide datos
en castellano ("dame todos los productos") y el model se los devuelve ya listos,
sin que el controller tenga que saber como se guardan en la base de datos.

## Ejemplo

```js
// productoModel.js

// Devuelve todos los productos de la tabla
async function obtenerTodos() {
    const resultado = await db.query('SELECT * FROM productos ORDER BY nombre');
    return resultado.rows; // devuelve un array de productos
}

// Devuelve un solo producto por su id
async function obtenerPorId(id) {
    const resultado = await db.query('SELECT * FROM productos WHERE id = $1', [id]);
    return resultado.rows[0]; // devuelve un objeto con los datos del producto
}
```

## Que archivos crear aqui

| Archivo             | Para que sirve                              |
|---------------------|---------------------------------------------|
| `productoModel.js`  | Consultas SQL de la tabla productos         |
| `db.js`             | Configuracion de la conexion a PostgreSQL   |

## Regla

Los models solo hablan con la base de datos. No renderizan HTML ni conocen las URLs.
Si necesitas hacer una consulta SQL, siempre es aqui.
