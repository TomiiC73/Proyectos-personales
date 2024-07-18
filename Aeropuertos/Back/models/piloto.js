const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Nacionalidad = require('./nacionalidad')

class Piloto extends Model { }

Piloto.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: DataTypes.STRING,
    numeroLicencia: DataTypes.INTEGER,
    fechaAlta: DataTypes.DATEONLY,
    idNacionalidad: {
        type: DataTypes.INTEGER,
        references: {
            model: Nacionalidad, // Nombre del modelo referenciado
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
},{
    sequelize,
    modelName: 'Piloto'
});

Piloto.belongsTo(Nacionalidad, { foreignKey: 'idNacionalidad'})

module.exports = Piloto;