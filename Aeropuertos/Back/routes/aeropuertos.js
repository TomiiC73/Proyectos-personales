const express = require('express');
const router = express.Router();
const Libro = require('../models/libro');
const { buscarAeropuertoPorId, buscarCiudadPorId } = require('../services/functions.services');
const { Op } = require('sequelize');
const Aeropuerto = require('../models/aeropuerto');
const Ciudad = require('../models/ciudad');


// Endpoint para obtener todos los aeropuertos
router.get('/aeropuertos', async (req, res) => {
    try {
        const aeropuerto = await Aeropuerto.findAll();
        res.json(aeropuerto);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los aeropuertos' });
    }
});

// Endpoint para obtener aeropuerto por nombre
router.get('/aeropuertos/buscar/:nombre', async (req, res) => {
    const nombre = req.params.nombre;

    if (!nombre) {
        return res.status(400).send('Nombre es requerido')
    }

    try {
        const aeropuertos = await Aeropuerto.findAll({
            where: {
                nombre:
                    { [Op.like]: `%${nombre}%` }
            }
        });

        if (aeropuertos.length === 0) {
            res.status(404).send('No se encontraron aeropuertos con ese nombre.')
        } else {
            res.json(aeropuertos)
        };
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar aviones' })
    }
});

// Endpoint para obtener un aeropuerto por ID
router.get('/aeropuertos/:id', async (req, res) => {
    try {
        const idAeropuerto = req.params.id

        if (isNaN(idAeropuerto)) {
            return res.status(400).send('El ID debe ser un numero')
        };

        if (parseInt(idAeropuerto) < 1) {
            return res.status(400).send('El ID debe ser igual o mayor a 1')
        };

        const aeropuertos = await Aeropuerto.findAll({
            where: {
                id: idAeropuerto
            }
        });

        if (aeropuertos.length === 0) {
            return res.status(404).send('No se encontro el aeropuerto con el id especificado')
        } else {
            res.json(aeropuertos)
        };

    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el aeropuerto '});
    }
});

// Endpoint para crear un aeropuerto
router.post('/aeropuertos', async (req, res) => {
    const { nombre, cantidadAviones, fechaInauguracion, idCiudad } = req.body;

    if (!nombre || !cantidadAviones < 0 || !fechaInauguracion || idCiudad < 0 || 
        isNaN(parseInt(idCiudad))) {
            return res.status(400).send('Datos de entrada invalidos')
    };

    const fechaInauguracionDate = new Date(fechaInauguracion);
    const fechaActual = new Date();

    if (isNaN(fechaInauguracionDate.getTime) || fechaInauguracionDate > fechaActual) {
        return req.status(400).send('La fecha de inauguracion no es valida')
    };

    const ciudad = await buscarCiudadPorId(idCiudad)
    if (!ciudad) {
        return res.status(400).send('La ciudad referenciada no existe');
    };

    try {
        const nuevoAeropuerto = await Aeropuerto.create({
            nombre, 
            cantidadAviones, 
            fechaInauguracion, 
            idCiudad
        });
        res.status(201).json(nuevoAeropuerto);

    } catch (error) {
        res.status(500).send('Error al crear el aeropuerto');
    }
});

// Endpoint para actualizar un aeropuerto
router.put('/aeropuertos/:id', async (req, res) => {
    const id = req.params.id;
    const { nombre, costoMantenimientoPorHora, fechaInauguracion, idCiudad } = req.body;

    if (isNaN(id) || parseInt(id) < 1) {
        return res.status(400).send('El ID debe ser un número mayor o igual a 1');
    }

    // Validaciones similares a las del método POST
    if (!nombre || !costoMantenimientoPorHora < 0 || !fechaInauguracion || idCiudad < 0 || 
        isNaN(parseInt(idCiudad))) {
            return res.status(400).send('Datos de entrada invalidos')
    };

    const fechaInauguracionDate = new Date(fechaInauguracion);
    const fechaActual = new Date();

    if (isNaN(fechaInauguracionDate.getTime())) {
        return res.status(400).send('La fecha de inauguracion no es válida');
    };

    if (fechaInauguracionDate > fechaActual) {
        return res.status(400).send('La fecha de inauguracion no puede ser mayor a la fecha actual');
    };

    const ciudad = await buscarCiudadPorId(idCiudad)
    if (!ciudad) {
        return res.status(400).send('La ciudad referenciada no existe');
    };

    try {
        const [updated] = await Aeropuerto.update({
            nombre, 
            cantidadAviones, 
            fechaInauguracion, 
            idCiudad
        }, {
            where: {
                id: id
            }
        });

        if (updated) {
            const aeropuertoActualizado = await Aeropuerto.findOne({ where: { id: id } });
            res.json(aeropuertoActualizado);
        } else {
            res.status(404).json({ error: 'Aeropuerto no encontrado' });
        }
    } catch (error) {
        res.status(500).send('Error al actualizar el aeropuerto');
    }
});

// Endpoint para eliminar un aeropuerto
router.delete('/aeropuertos/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id < 1) {
        return res.status(400).send('El ID debe ser un número mayor o igual a 1');
    };

    try {
        const aeropuertoEliminado = await Aeropuerto.destroy({ where: { id } });
        if (aeropuertoEliminado) {
            res.status(200).send();
        } else {
            res.status(404).json({ error: 'El aeropuerto no existe' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el aeropuerto' });
    };
});

