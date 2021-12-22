const mongoose = require('../db/database')

const Schema = mongoose.Schema

const prediosSchema = new Schema({

    codigo: Number,
    nombre: String,
    cedula: Number,
    areat: Number,
    areac: Number,
    direccion: String,
    barrio: String,
    asociado: Boolean,
    vm2: Number, 
    valpredial: Number,
    pagado: Boolean,
    pagoatrasado: Boolean,
    tienedescuento: Boolean,

    
})

const predios = mongoose.model('predios', prediosSchema) 

module.exports = predios