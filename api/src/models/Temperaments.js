const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('temperaments', {
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
};


// Creo models de temperaments, dejo ID default (revisar de ser necesario)