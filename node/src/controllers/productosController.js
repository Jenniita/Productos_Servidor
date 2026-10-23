const productoModel = require("../models/productoModel");

// Muestra el listado de todos los productos (pagina principal)
async function listar(req, res) {
    try {
        const productos = await productoModel.obtenerTodos();
        res.render("index", { productos });
    } catch (error) {
        console.error("Error al cargar los productos:", error);
        res.status(500).send("No se pudieron cargar los productos");
    }
}

// Muestra el detalle de un producto concreto
async function detalle(req, res) {
    const producto = await productoModel.obtenerPorId(req.params.id);
    if (!producto) return res.status(404).send("Producto no encontrado");
    res.render("producto", { producto });
}

//Función para lista los Json
async function listarJson(req, res) {
    try {
        const productos = await productoModel.obtenerTodos();
        res.json(productos);
    } catch (error) {
        console.error("Error al consultar los productos:", error);
        res.status(500).json({ error: "No se pudieron consultar los productos" });
    }
}

//Esto hace que se exporten las funciones
module.exports = { listar, detalle, listarJson };
