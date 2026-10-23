# routes/

Esta carpeta define **las URLs de la tienda**.

Aqui no se hace nada, solo se dice:
> "Cuando el usuario vaya a esta URL, llama a esta funcion del controller."

Es como el indice de un libro: dice donde esta cada cosa, pero no contiene el contenido.

## Ejemplo

```js
// productos.js
router.get('/productos', productosController.listar);
// → Cuando alguien entre a /productos, ejecuta la funcion "listar"

router.get('/productos/:id', productosController.detalle);
// → Cuando alguien entre a /productos/3, ejecuta la funcion "detalle" con id=3
```

## Que archivos crear aqui

| Archivo          | Para que sirve                              |
|------------------|---------------------------------------------|
| `productos.js`   | Rutas del listado y detalle de productos    |

## Regla

Las rutas solo llaman a funciones del controller. Nada mas.
Si te encuentras escribiendo logica aqui, muevela al controller.
