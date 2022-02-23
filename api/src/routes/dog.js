const { APIKEY } = process.env;
const axios = require('axios');
const { Dog , Temperaments } =  require ('../db');


// REVISAR LA CREACIÓN ERRONEA 
const createDog = async (req , res) =>{
    const {name, img, height, weight, añosdevida, temperaments} = req.body;

    if(!name || !img || !height || !weight) return res.status(400).send('Campo obligatorio (*) sin rellenar.');

    const newDog = await Dog.create({
        name,
        img,
        height,
        weight,
        añosdevida,
        temperaments,
    });

    const searchTemperaments = await Temperaments.findAll({
        where: {
            name: temperaments
        }
    })

    newDog.addTemperaments(searchTemperaments);
    res.status(200).send('Raza de perro creada correctamente.');

    
}

module.exports = {
    createDog,
};