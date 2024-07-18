const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const TipoAvion = require('./TipoAvion');

class Avion extends Model { }

Avion.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: DataTypes.STRING,
    costoMantenimientoPorHora: DataTypes.FLOAT,
    fechaCreacion: DataTypes.DATEONLY,
    cantidadPasajeros: DataTypes.INTEGER,
    idTipoAvion: {
        type: DataTypes.INTEGER,
        references: {
            model: TipoAvion, // Nombre del modelo referenciado
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
}, {
    sequelize,
    modelName: 'Avion'
});

Avion.belongsTo(TipoAvion, { foreignKey: 'idTipoAvion'});

module.exports = Avion;
