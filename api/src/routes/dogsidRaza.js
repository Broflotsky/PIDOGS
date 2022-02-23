const { APIKEY } = process.env;
const axios = require('axios');
const { Dog , Temperaments } =  require ('../db');
const { traecompleteDogs } = require('./dogs')


const getRaza = async (req, res) => {
    const { idRaza } = req.params;
    const complinfo = await traecompleteDogs();

    if(idRaza) {
        const perro = await complinfo.filter(c => c.id == idRaza)
        if(perro.length>0) { res.status(200).json(perro) }
        res.status(404).send('La raza no a sido encontrada por el ID suministrado.')
    }
}

module.exports = {
    getRaza,
};