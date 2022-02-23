const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getDogs } = require('./dogs');
const { getTemperaments } = require('./temperaments')
const { createDog } = require('./dog')
const { getRaza } = require('./dogsidRaza')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//EMPIEZO LAS RUTAS !!OJOOOO, ORGANIZAR DESPUES¡¡
router.get('/dogs', getDogs)

router.get('/temperament', getTemperaments)

router.get('/dogs/:idRaza', getRaza)

router.post('/dog', createDog)


module.exports = router;
