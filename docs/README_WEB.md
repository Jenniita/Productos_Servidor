# Página web de productos

Esta guía explica cómo mostrar en el navegador una página de tienda con los
productos guardados en PostgreSQL. La aplicación Node.js usa Express para
atender la ruta y EJS para generar el HTML.

## Cómo funciona

```text
Navegador → ruta /web → controlador listar → modelo → PostgreSQL
Navegador ← página HTML ← plantilla index.ejs ← productos
```

La ruta `/web` muestra la tienda como una página HTML. La ruta
`/api/productos`, en cambio, devuelve los productos en formato JSON.

## Piezas del proyecto

### Ruta

En `node/src/routes/productos.js` está definida la ruta:

```js
router.get("/web", controller.listar);
```

Esta línea indica que Express debe ejecutar `listar` cuando el navegador pide
`/web`. El archivo de rutas se monta desde `node/app.js` en la raíz de la
aplicación.

### Controlador

En `node/src/controllers/productosController.js`, la función `listar` obtiene
los productos mediante el modelo y los envía a la plantilla:

```js
async function listar(req, res) {
    try {
        const productos = await productoModel.obtenerTodos();
        res.render("index", { productos });
    } catch (error) {
        console.error("Error al cargar los productos:", error);
        res.status(500).send("No se pudieron cargar los productos");
    }
}
```

### Modelo y plantilla

El modelo `node/src/models/productoModel.js` consulta la tabla `productos` de
PostgreSQL. La plantilla `node/src/views/index.ejs` recibe la lista en la
variable `productos` y muestra cada producto en una tarjeta, con su nombre,
precio, stock y enlace al detalle.

Los estilos de esas tarjetas están en `node/src/public/css/estilos.css`.

## Cómo abrir la tienda

1. Inicia Docker Desktop.
2. Desde PowerShell, sitúate en la carpeta raíz del proyecto y ejecuta:

   ```powershell
   docker compose up -d
   ```

3. Si acabas de modificar los archivos de Node, reinicia el servicio para que
   cargue los cambios:

   ```powershell
   docker compose restart node
   ```

4. Abre esta dirección en el navegador:

   ```text
   http://localhost:3000/web
   ```

La página muestra los registros disponibles en la tabla `productos`. Si la
tabla está vacía, no aparecerán tarjetas.

## Si no aparecen los productos

- Comprueba que los servicios están en ejecución con `docker compose ps`.
- Comprueba que la tabla `productos` contiene registros.
- Revisa los mensajes de Node con:

  ```powershell
  docker compose logs node
  ```

- Revisa que la conexión a PostgreSQL esté configurada con los valores de
  `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER` y `DB_PASS` en `docker-compose.yml`.
