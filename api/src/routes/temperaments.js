const { APIKEY } = process.env;
const axios = require('axios');
const { Temperaments } =  require ('../db');


const getTemperaments = async (req, res) => {
    const temperamentApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${APIKEY}`);
    const temperament = temperamentApi.data.map(c => c.temperament);
    
    const secMap = temperament.toString('').split(', ');
    const tirMap = secMap.toString('').split(',');
    //console.log(secMap)

    tirMap.forEach( (e) => {
        Temperaments.findOrCreate({
            where: {name: e}
        });
    })

    const allTemperaments = await Temperaments.findAll();
    res.send(allTemperaments);

}

module.exports = {
    getTemperaments,
};