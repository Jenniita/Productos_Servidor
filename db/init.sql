-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id        SERIAL PRIMARY KEY,
    nombre    VARCHAR(100) NOT NULL,
    precio    NUMERIC(10, 2) NOT NULL,
    stock     INTEGER DEFAULT 0,
    imagen    VARCHAR(255),
    categoria VARCHAR(50)
);

-- Datos de ejemplo
INSERT INTO productos (nombre, precio, stock, imagen, categoria) VALUES
    ('Camiseta basica',       19.99,  50, 'camiseta.jpg',   'Ropa'),
    ('Pantalon vaquero',      49.99,  30, 'pantalon.jpg',   'Ropa'),
    ('Zapatillas running',    59.99,  20, 'zapatillas.jpg', 'Calzado'),
    ('Mochila 30L',           34.99,  15, 'mochila.jpg',    'Accesorios'),
    ('Gorra',                  9.99, 100, 'gorra.jpg',      'Accesorios'),
    ('Chaqueta impermeable',  79.99,  10, 'chaqueta.jpg',   'Ropa');
