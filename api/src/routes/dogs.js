// const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { APIKEY } = process.env;
const axios = require('axios');
const { Dog , Temperaments } =  require ('../db');

const traeinfoApi = async () => {
    const urlApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${APIKEY}`)
    const infoApi = await urlApi.data.map(c => {
        return {
            id: c.id,             // AGREGADO PARA IDRAZA
            name: c.name,
            img: c.img,
            altura: c.height.metric,
            peso: c.weight.metric,
            añosdevida: c.life_span,
            temperaments: c.temperament,
        }
    })
    return infoApi;
}

const traeinfoDb = async () => {
    return await Dog.findAll({
        include: {
            model: Temperaments,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })

}

const traecompleteDogs = async () => {
    const infoApi = await traeinfoApi();
    const infoDb = await traeinfoDb();
    const infoComplete = infoApi.concat(infoDb);
    return infoComplete;
}


const getDogs = async (req,res) => {
    const name = req.query.name
    let dogsComplete = await traecompleteDogs();
    if(name) {
        let dogName = await dogsComplete.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        dogName.length ? 
        res.status(200).send(dogName) :
        res.status(404).send('No se encontró la raza del perro.')
    } else {
        res.status(200).send(dogsComplete)
    }
}

module.exports = {
    getDogs,
    traecompleteDogs
}