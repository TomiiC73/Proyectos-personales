const { Sequelize } = require('sequelize');
const path = require('path');

// Configura Sequelize para usar SQLite y crear un archivo .db
const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,  // Para que no muestre mensajes de log en la consola
    storage: path.join(__dirname, '.', 'database.sqlite'),
    dialectOptions: {
        // Habilitar las claves foráneas en SQLite
        foreign_keys: true
    }
});

module.exports = sequelize;
