const mongoose = require('../db/database')

const Schema = mongoose.Schema

const variablesSchema = new Schema({

    fechanow: Date,
    fechadescuento: Date,
    fechalimite: Date,
    porcentajecobro: Number,
    porcentajedescuento: Number,
    porcentajemulta: Number,
})

const variables = mongoose.model('variables', variablesSchema) 

module.exports = variables