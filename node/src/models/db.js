const { Pool } = require("pg");

// Pool = grupo de conexiones reutilizables a PostgreSQL.
// Las credenciales vienen de las variables de entorno del docker-compose.
const pool = new Pool({
    host:     process.env.DB_HOST || "localhost",
    port:     process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || "tienda",
    user:     process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "password123",
});

module.exports = pool;
