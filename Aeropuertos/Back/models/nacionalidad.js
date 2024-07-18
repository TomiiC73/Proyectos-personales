const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Nacionalidad extends Model { }

Nacionalidad.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'Nacionalidad'
});

module.exports = Nacionalidad;