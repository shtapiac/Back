const mongoose = require('../db/database')

const Schema = mongoose.Schema

const usuariosSchema = new Schema({

    nombre: String,
    correo: String,
    cedula: Number,
    password: String,
    nivelacceso: Number,
})

const usuarios = mongoose.model('usuarios', usuariosSchema) 

module.exports = usuarios