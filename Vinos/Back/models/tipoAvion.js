const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class TipoAvion extends Model { }

TipoAvion.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'TipoAvion'
});

module.exports = TipoAvion;