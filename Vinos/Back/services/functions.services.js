const Avion = require('../models/avion');
const Aeropuerto = require('../models/aeropuerto');
const Piloto = require('../models/piloto');
const TipoAvion = require('../models/TipoAvion');
const Nacionalidad = require('../models/nacionalidad');

// Funcion para buscar un avion que exista
async function buscarAvionPorId(idAvion) {
    try {
        const avion = await Avion.findOne({
            where: {
                id: idAvion
            }
        });
        return avion

    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Funcion para buscar un piloto que exista
async function buscarPilotoPorId(idPiloto) {
    try {
        const piloto = await Piloto.findOne({
            where: {
                id: idPiloto
            }
        });
        return piloto

    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Funcion para buscar un aeropuerto que exista
async function buscarAeropuertoPorId(idAeropuerto) {
    try {
        const aeropuerto = await Aeropuerto.findOne({
            where: {
                id: idAeropuerto
            }
        });
        return aeropuerto

    } catch (error) {
        console.error(error);
        throw error;
    }
};

async function buscarTipoAvionPorId(idTipoAvion) {
    try {
        const tipoAvion = await TipoAvion.findOne({
            where: {
                id: idTipoAvion
            }
        });
        return tipoAvion

    } catch (error) {
        console.error(error);
        throw error;
    }
};

async function buscarCiudadPorId(idCiudad) {
    try {
        const ciudad = await Ciudad.findOne({
            where: {
                id: idCiudad
            }
        });
        return ciudad

    } catch (error) {
        console.error(error);
        throw error;
    }
};

async function buscarNacionalidadPorId(idNacionalidad) {
    try {
        const nacionalidad = await Nacionalidad.findOne({
            where: {
                id: idNacionalidad
            }
        });
        return nacionalidad

    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = { buscarAvionPorId, buscarPilotoPorId, buscarAeropuertoPorId };