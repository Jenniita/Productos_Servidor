const pool = require("./db");

// Devuelve todos los productos de la tabla
async function obtenerTodos() {
    const resultado = await pool.query("SELECT * FROM productos ORDER BY nombre");
    return resultado.rows;
}

// Devuelve un unico producto buscado por su id
async function obtenerPorId(id) {
    const resultado = await pool.query("SELECT * FROM productos WHERE id = $1", [id]);
    return resultado.rows[0];
}

module.exports = { obtenerTodos, obtenerPorId };
