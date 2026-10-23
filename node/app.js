const express  = require('express');
const path     = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// Motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Archivos estaticos (CSS, JS, imagenes)
app.use(express.static(path.join(__dirname, 'src/public')));

// Rutas de la tienda
const productosRouter = require('./src/routes/productos');
app.use('/', productosRouter);

app.listen(PORT, () => {
    console.log(`Servidor arrancado en http://localhost:${PORT}`);
});
