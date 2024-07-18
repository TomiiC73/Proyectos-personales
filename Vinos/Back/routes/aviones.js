const express = require('express');
const router = express.Router();
const Libro = require('../models/libro');
const { buscarTipoAvionPorId } = require('../services/functions.services');
const { Op } = require('sequelize');
const Avion = require('../models/avion');

// Endpoint para obtener todos los aviones
router.get('/aviones', async (req, res) => {
    try {
        const aviones = await Avion.findAll();
        res.json(aviones);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los aviones' });
    }
});

// Endpoint para obtener avion por nombre
router.get('/aviones/buscar/:nombre', async (req, res) => {
    const nombre = req.params.nombre;

    if (!nombre) {
        return res.status(400).send('Nombre es requerido')
    }

    try {
        const aviones = await Avion.findAll({
            where: {
                nombre:
                    { [Op.like]: `%${nombre}%` }
            }
        });

        if (aviones.length === 0) {
            res.status(404).send('No se encontraron aviones con ese nombre.')
        } else {
            res.json(aviones)
        };
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar aviones' })
    }
});

// Endpoint para obtener un avion por ID
router.get('/aviones/:id', async (req, res) => {
    try {
        const idAvion = req.params.id

        if (isNaN(idAvion)) {
            return res.status(400).send('El ID debe ser un numero')
        };

        if (parseInt(idAvion) < 1) {
            return res.status(400).send('El ID debe ser igual o mayor a 1')
        };

        const aviones = await Avion.findAll({
            where: {
                id: idAvion
            }
        });

        if (aviones.length === 0) {
            return res.status(404).send('No se encontro el libro con el id especificado')
        } else {
            res.json(aviones)
        };

    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el avion '});
    }
});

// Endpoint para crear un avion
router.post('/aviones', async (req, res) => {
    const { nombre, costoMantenimientoPorHora, fechaCreacion, cantidadPasajeros, idTipoAvion } = req.body;

    if (!nombre || !costoMantenimientoPorHora < 0 || !fechaCreacion || cantidadPasajeros < 0 || idTipoAvion < 0 || 
        isNaN(parseInt(idTipoAvion))) {
            return res.status(400).send('Datos de entrada invalidos')
    };

    const fechaCreacionDate = new Date(fechaCreacion);
    const fechaActual = new Date();

    if (isNaN(fechaCreacionDate.getTime) || fechaCreacionDate > fechaActual) {
        return req.status(400).send('La fecha de creacion no es valida')
    };

    const tipoAvion = await buscarTipoAvionPorId(idTipoAvion)
    if (!tipoAvion) {
        return res.status(400).send('El tipo de avion referenciado no existe');
    };

    try {
        const nuevoAvion = await Avion.create({
            nombre, 
            costoMantenimientoPorHora,
            fechaCreacion,
            cantidadPasajeros,
            idTipoAvion
        });
        res.status(201).json(nuevoAvion);

    } catch (error) {
        res.status(500).send('Error al crear el avion');
    }
});

// Endpoint para actualizar un avion
