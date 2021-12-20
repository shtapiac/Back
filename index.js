const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser') // esto es para poder pasar peticiones post a mongo - //para poder escribir datos post a la base de datos


const app = express()
const puerto = 8000

const rutas = require('./routes/Rutas')

const cors_config = {
    origin: '*' //aqui se coloca la URL a la que se le da permiso para acceder (desde donde viene la petición). si se coloca * todo el mundo puede acceder
}

var jsonParser = bodyParser.json() //para poder escribir datos post a la base de datos

//ruta principal /la ruta cambia según lo que esté escrito donde dice api
app.use('/api', cors(cors_config), jsonParser, rutas) 


app.listen(puerto, () =>{

console.log("Servidor iniciado");

})