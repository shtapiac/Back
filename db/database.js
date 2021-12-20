const mongoose = require('mongoose')

const usuario = 'proyecto10'
const pass = 'proyecto102021'
const nombre_bd = 'Proyecto10'
const uri_bd = `mongodb+srv://${usuario}:${pass}@proyecto.gbjza.mongodb.net/${nombre_bd}?retryWrites=true&w=majority`

mongoose.connect(uri_bd)
.then( () => {console.log("base de datos lista")} )
.catch( (e) => {console.log("Error", e)} )

module.exports = mongoose