# controllers/

Esta carpeta decide **que hace el servidor cuando llega una peticion**.

El controller es el intermediario: recibe la peticion del navegador, le pide los datos
al model, y luego le dice a la view que pinte la pagina con esos datos.

## Flujo

```
Peticion del navegador
        |
        v
   controller        ← estas aqui
   /         \
  model      view
  (datos)   (HTML)
```

## Ejemplo

```js
// productosController.js

async function listar(req, res) {
    // 1. Pide todos los productos a la base de datos
    const productos = await ProductoModel.obtenerTodos();

    // 2. Renderiza la pagina index.ejs pasandole los productos
    res.render('index', { productos });
}

async function detalle(req, res) {
    const id = req.params.id;                          // coge el id de la URL
    const producto = await ProductoModel.obtenerPorId(id); // busca ese producto
    res.render('producto', { producto });              // pinta la pagina de detalle
}
```

## Que archivos crear aqui

| Archivo                   | Para que sirve                        |
|---------------------------|---------------------------------------|
| `productosController.js`  | Gestiona listado y detalle de productos |

## Regla

El controller no escribe SQL. Para eso esta el model.
El controller no escribe HTML. Para eso estan las views.
Solo coordina.
