const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Ciudad = require('./ciudad')

class Aeropuerto extends Model { }

Aeropuerto.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: DataTypes.STRING,
    cantidadAviones: DataTypes.INTEGER,
    fechaInauguracion: DataTypes.DATEONLY,
    idCiudad: {
        type: DataTypes.INTEGER,
        references: {
            model: Ciudad, // Nombre del modelo referenciado
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    sequelize,
    modelName: 'Aeropuerto'
});

Aeropuerto.belongsTo(Ciudad, { foreignKey: 'idCiudad' });

module.exports = Aeropuerto;