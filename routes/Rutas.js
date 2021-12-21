const express = require('express')
const rutas = express.Router()
const usuarios = require('../models/usuarios')
const predios = require('../models/predios')
const variables = require('../models/variables')


/*rutas.get('/test', (req, res) => {
    res.json({
        mensaje: "Hola mundo"
    })
})
*/


const todosusuarios = async () => {
    const datos = await usuarios.find() // esta función devuelve todo lo que hay en la tabla usuarios, se usa en la ruta de mas abajo
    return(datos)

}


//obtener todos los usuarios
rutas.get('/allusers', async (req, res) => {
    res.json(await todosusuarios() ) 
})

//obtener todos los predios
rutas.get('/allpredios', async (req, res) => {
  const pred = await predios.find()
  res.json(pred ) 
})


//obtener un usuario específico por ID
rutas.get('/allusers/:id', async (req, res) => {

    let usuarioid = req.params.id
    let usuario = await usuarios.findById(usuarioid)
    res.json(usuario) 
})

//ver los predios asociados a un usuario específico

rutas.post('/prediosasociados', async (req, res) => {
    
    const cedulausuario = req.body.cedula //lee la cedula que manda el front

    const prediosasc = await predios.find({cedula: cedulausuario, asociado:true}) //busca predios que tengan la cedula del usuario y que hayan sido asociados previamente

    res.json(prediosasc) //devuelve los predios asociados

})


//creación de usuario
rutas.post('/crearusuario', async (req, res) => {
    
    let datospost = await req.body
    
    let usuario = new usuarios(datospost)

    await usuario.save() //grabamos los datos de la petición post

    //res.json(usuario) //devuelve lo que se grabó
})

rutas.post('/crearpredio', async (req, res) => {
    
    let datospost = await req.body
    
    let predio = new crearpredios(datospost)

    await predio.save() //grabamos los datos de la petición post

    //res.json(usuario) //devuelve lo que se grabó
})




rutas.post("/login", async (req, res) => {
    let correo = req.body.correo;
  
    let usuario = await usuarios.findOne({ correo: correo });
  
    if (!usuario) {
      return res.json({
        mensaje: "el usuario no existe",
      });
    } else {
      if(req.body.password != usuario.password){
        return res.json({mensaje: "contraseña incorrecta"})
        }
        else{
            datosenviar = {
            nivelacceso: usuario.nivelacceso,
            cedula: usuario.cedula,
            correoycontrasena: true

            }
            return res.json(datosenviar)
        }
     
  
     
    }
  
  
   
  })
  
  rutas.put("/asociarpredio", async (req, res) => {
    
    let predioabuscar = req.body.predio

    let predio = await predios.findOne({ codigo: predioabuscar});
  
    if (!predio) {
      return res.json({
        mensaje: "el predio no existe",
      });
    } else {
      if(req.body.cedula != predio.cedula){
        return res.json({mensaje: "el predio no pertenece al usuario"})
        }
        else{
            predio.asociado = true
            
            await predio.save()

            res.json({mensaje: "predio asociado"})
        }
     
  
     
    }
  
     
  })
  




rutas.get("/calcularpredial", async (req, res) => { //probablemente tenga que ser cambiado a PUT, get para hacer troubleshoot
                                                    //como comentario adicional, realmente funciona bien con get, quizas no sea necesario cambiar a put
  //https://mongoosejs.com/docs/queries.html#streaming
  //https://stackoverflow.com/questions/492994/compare-two-dates-with-javascript

 

     var cont = 0

    for await (const predio of predios.find() ) { //for await of --> map no funciona en ciclos async, toca con este comando

    predio.valpredial = 0 // funciona bien y si está colocando el mismo valor a todos los campos de la coleccion
    await predio.save()   // se guarda lo anterior

    }

    return res.json(cont) //debug para que en postman salga el valor de cont cuando se mande el req

    //});
  
  
  
  
  
  })
  
  
  ;










module.exports = rutas