const express = require('express');
const router = express.Router();
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
router.put('/aviones/:id', async (req, res) => {
    const id = req.params.id;
    const { nombre, costoMantenimientoPorHora, fechaCreacion, cantidadPasajeros, idTipoAvion } = req.body;

    if (isNaN(id) || parseInt(id) < 1) {
        return res.status(400).send('El ID debe ser un número mayor o igual a 1');
    }

    // Validaciones similares a las del método POST
    if (!nombre || !costoMantenimientoPorHora < 0 || !fechaCreacion || cantidadPasajeros < 0 || idTipoAvion < 0 || 
        isNaN(parseInt(idTipoAvion))) {
            return res.status(400).send('Datos de entrada invalidos')
    };

    const fechaCreacionDate = new Date(fechaCreacion);
    const fechaActual = new Date();

    if (isNaN(fechaCreacionDate.getTime())) {
        return res.status(400).send('La fecha de creacion no es válida');
    };

    if (fechaCreacionDate > fechaActual) {
        return res.status(400).send('La fecha de creacion no puede ser mayor a la fecha actual');
    };

    const tipoAvion = await buscarTipoAvionPorId(idTipoAvion)
    if (!tipoAvion) {
        return res.status(400).send('El tipo de avion referenciado no existe');
    };

    try {
        const [updated] = await Avion.update({
            nombre, 
            costoMantenimientoPorHora,
            fechaCreacion,
            cantidadPasajeros,
            idTipoAvion
        }, {
            where: {
                id: id
            }
        });

        if (updated) {
            const avionActualizado = await Avion.findOne({ where: { id: id } });
            res.json(avionActualizado);
        } else {
            res.status(404).json({ error: 'Avion no encontrado' });
        }
    } catch (error) {
        res.status(500).send('Error al actualizar el avion');
    }
});

// Endpoint para eliminar un avion
router.delete('/aviones/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id < 1) {
        return res.status(400).send('El ID debe ser un número mayor o igual a 1');
    };

    try {
        const avionEliminado = await Avion.destroy({ where: { id } });
        if (avionEliminado) {
            res.status(200).send();
        } else {
            res.status(404).json({ error: 'El avion no existe' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el avion' });
    };
});

