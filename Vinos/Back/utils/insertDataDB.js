const Avion = require('../models/avion');
const TipoAvion = require('../models/TipoAvion');
const Aeropuerto = require('../models/aeropuerto');
const Ciudad = require('../models/ciudad');
const Piloto = require('../models/piloto');
const Nacionalidad = require('../models/nacionalidad');

async function insertData() {
    try {
        const aviones = [
            {
                id: 1,
                nombre: 'Airbus A220',
                costoMantenimientoPorHora: 100,
                fechaCreacion: new Date(2008, 7, 13),
                cantidadPasajeros: 200,
                idTipoAvion: 1
            },
            {
                id: 2,
                nombre: 'Antonov An-148/An-158',
                costoMantenimientoPorHora: 2000,
                fechaCreacion: new Date(2004, 5, 2),
                cantidadPasajeros: 11,
                idTipoAvion: 2
            },
            {
                id: 3,
                nombre: 'Boeing 737',
                costoMantenimientoPorHora: 2500,
                fechaCreacion: new Date(1967, 3, 4),
                cantidadPasajeros: 7,
                idTipoAvion: 3
            },
            {
                id: 4,
                nombre: 'Comac ARJ21 Xiangfeng',
                costoMantenimientoPorHora: 3000,
                fechaCreacion: new Date(2008, 11, 28),
                cantidadPasajeros: 15,
                idTipoAvion: 4
            },
            {
                id: 5,
                nombre: 'Tupolev Tu-204/Tu-214',
                costoMantenimientoPorHora: 4000,
                fechaCreacion: new Date(1990, 12, 1),
                cantidadPasajeros: 20,
                idTipoAvion: 5
            },
            {
                id: 6,
                nombre: 'Sukhoi Superjet SSJ100',
                costoMantenimientoPorHora: 2500,
                fechaCreacion: new Date(2013, 6, 1),
                cantidadPasajeros: 12,
                idTipoAvion: 6
            },
            {
                id: 7,
                nombre: 'Ilyushin Il-96',
                costoMantenimientoPorHora: 2000,
                fechaCreacion: new Date(1988, 9, 28),
                cantidadPasajeros: 42,
                idTipoAvion: 7
            },
            {
                id: 8,
                nombre: 'Embraer E-Jet E2 family',
                costoMantenimientoPorHora: 3000,
                fechaCreacion: new Date(2013, 6, 16),
                cantidadPasajeros: 45,
                idTipoAvion: 8
            },
            {
                id: 9,
                nombre: 'Comac C919',
                costoMantenimientoPorHora: 1000,
                fechaCreacion: new Date(2015, 11, 2),
                cantidadPasajeros: 20,
                idTipoAvion: 91
            },
            {
                id: 10,
                nombre: 'Boeing 787 Dreamliner',
                costoMantenimientoPorHora: 11239,
                fechaCreacion: new Date(2009, 12, 1),
                cantidadPasajeros: 3,
                idTipoAvion: 100
            },
            {
                id: 11,
                nombre: 'Airbus A350 XWB',
                costoMantenimientoPorHora: 1500,
                fechaCreacion: new Date(2000, 8, 17),
                cantidadPasajeros: 171,
                idTipoAvion: 11
            }
        ];
        for (const avion of aviones) {
            try {
                await Avion.create(avion);

            } catch (error) {
                console.error('Error creando el avion:', error);
            }
        }

        const tiposAviones = [
            { id: 1, nombre: 'Jet de pasajeros de cuerpo estrecho' },
            { id: 2, nombre: 'Jet de pasajeros de fuselaje ancho' },
            { id: 3, nombre: 'Jet regional' },
            { id: 4, nombre: 'Avion de pasajeros de tamaño medio' },
            { id: 5, nombre: 'Avion ligeros de pasajeros' },
            { id: 6, nombre: 'Turbohélices de pasajeros' },
            { id: 7, nombre: 'Avion de carga' },
            { id: 8, nombre: 'Avion de negocios ligeros' },
            { id: 9, nombre: 'Avion de negocios de tamaño medio' },
            { id: 10, nombre: 'Avion de negocios pesados' },
            { id: 11, nombre: 'Avion de combate' }
        ];

        for (const tipoAvion of tiposAviones) {
            try {
                await TipoAvion.create(tipoAvion);
            } catch (error) {
                console.error('Error creando el tipo de avion: ', error)
            }
        }

        const pilotos = [
            {
                id: 1,
                nombre: 'Juan Pérez',
                numeroLicencia: 123456789012,
                fechaAlta: new Date(2023, 1, 15),
                idNacionalidad: 1
            },
            {
                id: 2,
                nombre: 'Juan Pérez',
                numeroLicencia: 123456789012,
                fechaAlta: new Date(2023, 2, 15),
                idNacionalidad: 1
            },
            {
                id: 3,
                nombre: 'María García',
                numeroLicencia: '234567890123',
                fechaAlta: new Date(2022, 5, 20),
                idNacionalidad: 2
            },
            {
                id: 4,
                nombre: 'Carlos Fernández',
                numeroLicencia: '345678901234',
                fechaAlta: new Date(2021, 7, 30),
                idNacionalidad: 3
            },
            {
                id: 5,
                nombre: 'Lucía Rodríguez',
                numeroLicencia: '456789012345',
                fechaAlta: new Date(2020, 2, 10),
                idNacionalidad: 4
            },
            {
                id: 6,
                nombre: 'Miguel Sánchez',
                numeroLicencia: '567890123456',
                fechaAlta: new Date(2019, 9, 25),
                idNacionalidad: 5
            },
            {
                id: 7,
                nombre: 'Laura González',
                numeroLicencia: '678901234567',
                fechaAlta: new Date(2018, 11, 13),
                idNacionalidad: 6
            },
            {
                id: 8,
                nombre: 'David López',
                numeroLicencia: '789012345678',
                fechaAlta: new Date(2017, 4, 18),
                idNacionalidad: 7
            },
            {
                id: 9,
                nombre: 'Ana Martínez',
                numeroLicencia: '890123456789',
                fechaAlta: new Date(2016, 6, 22),
                idNacionalidad: 8
            },
            {
                id: 10,
                nombre: 'José Díaz',
                numeroLicencia: '901234567890',
                fechaAlta: new Date(2015, 3, 29),
                idNacionalidad: 9
            },
            {
                id: 11,
                nombre: 'Elena Torres',
                numeroLicencia: '012345678901',
                fechaAlta: new Date(2014, 8, 5),
                idNacionalidad: 10
            }
        ];

        for (const piloto of pilotos) {
            try {
                await Piloto.create(piloto);
            } catch (error) {
                console.error('Error al crear el piloto: ', error)
            }
        };

        const nacionalidades = [
            { id: 1, nombre: 'Argentina' },
            { id: 2, nombre: 'Australia' },
            { id: 3, nombre: 'Brasil' },
            { id: 4, nombre: 'Canadá' },
            { id: 5, nombre: 'Chile' },
            { id: 6, nombre: 'China' },
            { id: 7, nombre: 'Colombia' },
            { id: 8, nombre: 'Corea del Sur' },
            { id: 9, nombre: 'España' },
            { id: 10, nombre: 'Estados Unidos' },
            { id: 11, nombre: 'Francia' },
            { id: 12, nombre: 'Alemania' },
            { id: 13, nombre: 'India' },
            { id: 14, nombre: 'Italia' },
            { id: 15, nombre: 'Japón' },
            { id: 16, nombre: 'México' },
            { id: 17, nombre: 'Nueva Zelanda' },
            { id: 18, nombre: 'Países Bajos' },
            { id: 19, nombre: 'Perú' },
            { id: 20, nombre: 'Portugal' },
            { id: 21, nombre: 'Reino Unido' },
            { id: 22, nombre: 'Rusia' },
            { id: 23, nombre: 'Sudáfrica' },
            { id: 24, nombre: 'Suecia' },
            { id: 25, nombre: 'Suiza' },
            { id: 26, nombre: 'Turquía' },
            { id: 27, nombre: 'Ucrania' },
            { id: 28, nombre: 'Uruguay' },
            { id: 29, nombre: 'Venezuela' },
            { id: 30, nombre: 'Vietnam' }
        ];

        for (const nacionalidad of nacionalidades) {
            try {
                await Nacionalidad.create(nacionalidad)
            } catch (error) {
                console.error('Error al crear la nacionalidad: ', error)
            }
        }

        const aeropuertos = [
            {
                id: 1,
                nombre: 'Aeropuerto Internacional Sol de Oriente',
                cantidadAviones: 123,
                fechaInauguracion: new Date(1930, 1, 15),
                idCiudad: 1
            },
            {
                id: 2,
                nombre: 'Aeropuerto Ciudad Esmeralda',
                cantidadAviones: 80,
                fechaInauguracion: new Date(2002, 5, 20),
                idCiudad: 2
            },
            {
                id: 3,
                nombre: 'Aeropuerto de las Colinas Verdes',
                cantidadAviones: 300,
                fechaInauguracion: new Date(1945, 7, 30),
                idCiudad: 3
            },
            {
                id: 4,
                nombre: 'Aeropuerto Internacional Río Dorado',
                cantidadAviones: 222,
                fechaInauguracion: '2010-02-10',
                idCiudad: 4
            },
            {
                id: 5,
                nombre: 'Aeropuerto del Valle Sereno',
                cantidadAviones: 100,
                fechaInauguracion: '1980-09-25',
                idCiudad: 5
            },
            {
                id: 6,
                nombre: 'Aeropuerto Costa de Cristal',
                cantidadAviones: 30,
                fechaInauguracion: '1999-11-13',
                idCiudad: 6
            },
            {
                id: 7,
                nombre: 'Aeropuerto Internacional Puerta del Cielo',
                cantidadAviones: 170,
                fechaInauguracion: '2012-04-18',
                idCiudad: 7
            },
            {
                id: 8,
                nombre: 'Aeropuerto Horizonte Azul',
                cantidadAviones: 100,
                fechaInauguracion: '1962-06-22',
                idCiudad: 8
            },
            {
                id: 9,
                nombre: 'Aeropuerto de la Bahía Azul',
                cantidadAviones: 120,
                fechaInauguracion: '1986-03-29',
                idCiudad: 9
            },
            {
                id: 10,
                nombre: 'Aeropuerto Internacional Vista del Mar',
                cantidadAviones: 50,
                fechaInauguracion: '2001-08-05',
                idCiudad: 10
            }
        ];

        for (const aeropuerto of aeropuertos) {
            try {
                await Aeropuerto.create(aeropuerto);
            } catch (error) {
                console.error('Error al crear el aeropuerto: ', error)
            }
        };

        const ciudades = [
            { id: 1, nombre: 'Argentina' },
            { id: 2, nombre: 'Australia' },
            { id: 3, nombre: 'Brasil' },
            { id: 4, nombre: 'Canadá' },
            { id: 5, nombre: 'Chile' },
            { id: 6, nombre: 'China' },
            { id: 7, nombre: 'Colombia' },
            { id: 8, nombre: 'Corea del Sur' },
            { id: 9, nombre: 'España' },
            { id: 10, nombre: 'Estados Unidos' },
            { id: 11, nombre: 'Francia' },
            { id: 12, nombre: 'Alemania' },
            { id: 13, nombre: 'India' },
            { id: 14, nombre: 'Italia' },
            { id: 15, nombre: 'Japón' },
            { id: 16, nombre: 'México' },
            { id: 17, nombre: 'Nueva Zelanda' },
            { id: 18, nombre: 'Países Bajos' },
            { id: 19, nombre: 'Perú' },
            { id: 20, nombre: 'Portugal' },
            { id: 21, nombre: 'Reino Unido' },
            { id: 22, nombre: 'Rusia' },
            { id: 23, nombre: 'Sudáfrica' },
            { id: 24, nombre: 'Suecia' },
            { id: 25, nombre: 'Suiza' },
            { id: 26, nombre: 'Turquía' },
            { id: 27, nombre: 'Ucrania' },
            { id: 28, nombre: 'Uruguay' },
            { id: 29, nombre: 'Venezuela' },
            { id: 30, nombre: 'Vietnam' }
        ];

        for (const ciudad of ciudades) {
            try {
                await Ciudad.create(ciudad);
            } catch (error) {
                console.error('Error al crear la ciudad: ', error);
            };
        };

    } catch (error) {
        console.error('Error insertando los datos: ', error);
    }
};

module.exports = { insertData };