const sequelize = require('./config/database');
const cors = require('cors');
const express = require('express');
const { insertData } = require('./utils/insertDataDB');

const app = express();
app.use(express.json());
app.use(cors());

function startServer() {
    return syncDatabase().then(() => {
        const server = app.listen(3000, () => {
            console.log('Servidor iniciado en http://localhost:4000');
        });
        return server;
    });
}

async function syncDatabase() {
    try {
        await sequelize.sync({ force: true }); // force: true elimina y recrea las tablas
        await insertData();
    } catch (error) {
        console.error('Error sincronizando la base de datos:', error);
    }
}


app.get("/", (req, res) => {
    res.send("Servidor de aeropuertos funcionando correctamente.");
});

const aeropuertosRouter = require('./routes/aeropuertos');
app.use(aeropuertosRouter);

const pilotosRouter = require('./routes/pilotos');
app.use(pilotosRouter);

const avionesRouter = require('./routes/aviones');
app.use(avionesRouter);

const nacionalidadesRouter = require('./routes/nacionalidades');
app.use(nacionalidadesRouter);

const ciudadesRoutes = require('./routes/ciudades');
app.use(ciudadesRoutes);

const tiposAvionesRoutes = require('./routes/tiposAviones');
app.use(tiposAvionesRoutes);

module.exports = { app, startServer }