# API JSON de productos

Esta guía explica cómo hacer que la aplicación Node.js consulte los productos
de PostgreSQL y los devuelva como JSON al abrir una URL en el navegador.

La comunicación funciona así:

```text
Navegador → ruta de Express → controlador → modelo → PostgreSQL
Navegador ← respuesta JSON ← controlador ← resultados de PostgreSQL
```

PostgreSQL no entrega una página JSON directamente. La aplicación Node.js recibe
la petición web, consulta la base de datos y responde con los datos.

## Requisitos

- Docker Desktop iniciado.
- Los servicios del proyecto configurados en `docker-compose.yml`.
- La tabla `productos` creada y con datos en PostgreSQL.

## 1. Definir la ruta de la API

En `node/src/routes/productos.js`, se añade una ruta `GET` para la URL
`/api/productos`:

```js
router.get("/api/productos", controller.listarJson);
```

La ruta conecta esa URL con la función `listarJson` del controlador. Las rutas
existentes para las páginas HTML pueden seguir funcionando a la vez.

## 2. Crear la respuesta JSON en el controlador

En `node/src/controllers/productosController.js`, la función obtiene los
productos mediante el modelo y usa `res.json` para devolverlos:

```js
async function listarJson(req, res) {
    try {
        const productos = await productoModel.obtenerTodos();
        res.json(productos);
    } catch (error) {
        console.error("Error al consultar los productos:", error);
        res.status(500).json({ error: "No se pudieron consultar los productos" });
    }
}
```

La función también debe incluirse en la exportación del controlador:

```js
module.exports = { listar, detalle, listarJson };
```

`productoModel.obtenerTodos()` ya consulta la tabla `productos` en PostgreSQL.
Por tanto, no hace falta escribir otra consulta para esta ruta.

## 3. Iniciar o reiniciar los servicios

Desde PowerShell, situado en la carpeta raíz del proyecto:

```powershell
docker compose up -d
docker compose restart node
```

El segundo comando reinicia Node para que cargue los cambios realizados.

## 4. Abrir y comprobar la API

En el navegador, visita:

```text
http://localhost:3000/api/productos
```

Si todo está funcionando, verás una respuesta JSON parecida a esta:

```json
[
  {
    "id": 1,
    "nombre": "Camiseta",
    "precio": "19.99",
    "stock": 50,
    "imagen": null,
    "categoria": "Ropa"
  }
]
```

El contenido exacto depende de los datos guardados en la base de datos. Si no
hay productos, la respuesta será un array vacío:

```json
[]
```

## Si no funciona

- Comprueba que Docker Desktop está iniciado y que `docker compose up -d`
  terminó correctamente.
- Verifica que la tabla `productos` existe y contiene registros.
- Confirma que la ruta está escrita exactamente como `/api/productos`.
- Revisa los errores de Node con:

  ```powershell
  docker compose logs node
  ```

- Si PostgreSQL no está disponible, el controlador devuelve el estado HTTP
  `500` y un mensaje de error en JSON.

Esta ruta devuelve únicamente la lista de productos; no expone toda la base de
datos.
