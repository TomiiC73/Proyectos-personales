const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Ciudad extends Model { }

Ciudad.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'Ciudad'
});

module.exports = Ciudad;