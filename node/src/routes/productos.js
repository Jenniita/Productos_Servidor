const express    = require("express");
const router     = express.Router();
const controller = require("../controllers/productosController");

// /           → listado de productos
// /producto/3 → detalle del producto con id 3
router.get("/",              controller.listar);
router.get("/producto/:id",  controller.detalle);


//Cuando el navegador pida la api/productos, express llamará a la función listaJson del controlador
router.get("/api/productos", controller.listarJson);
//Cuando el navegador pida la web. La funcion controller lista obtiene los productos de la base de datos y muestra la plantilla web
router.get("/web", controller.listar);
module.exports = router;
