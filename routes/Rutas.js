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
  




rutas.post("/calcularpredial", async (req, res) => { //probablemente tenga que ser cambiado a PUT, post para hacer troubleshoot
   
  //https://lineadecodigo.com/mongodb/recorrer-un-cursor-en-mongodb/
    //https://es.stackoverflow.com/questions/112317/c%C3%B3mo-recorrer-un-conjunto-de-documentos-de-mongodb-en-c

    



  })
  
  
  ;










module.exports = rutas