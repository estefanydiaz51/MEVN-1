import express from 'express';
const router = express.Router();

import Nota from '../models/nota';
import { verificarAuth, verificarAuthAdmin } from '../middlewares/autenticacion'

// Agregar una nota
router.post('/nueva-nota', verificarAuth,  async(req, res)=> {
  const body = req.body;
  body.userId = req.usuario._id
  try{
    const notaDB = await Nota.create(body)
    res.status(200).json(notaDB)
  }catch(error){
    return res.status(500).json({
      mensaje: 'Ocuriio un error',
      error
    })
  }
})


// Get con parámetros
router.get('/nota/:id', async(req, res) => {
  const _id = req.params.id;

  try{
    const notaDB = await Nota.findOne({_id})
    res.json(notaDB)
  }catch(error){
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
} )

// Get con todos los documentos

// router.get('/notas', verificarAuth, async(req, res) => {
//   const userId = req.usuario._id
//   try{
//     const notaDB = await Nota.find({userId});
//     res.json(notaDB)
//   }catch ( error){
//     return res.status(400).json({
//       mensaje: 'Ocurrio un error',
//       error
//     })
//   }
// })


// Delete elmininar una nota
router.delete('/nota/:id', async(req, res) => {

  const _id = req.params.id
  try{

    const notaDB = await Nota.findByIdAndDelete({_id});
    if (!notaDB){
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
    res.json(notaDB)
  }catch(error){
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
})

// Put actualizar
router.put('/nota/:id', async(req, res) => {
  const _id = req.params.id
  const body = req.body
  try{
    const notaDB = await Nota.findByIdAndUpdate(_id,body, { new: true});
    res.json(notaDB)
  } catch(error){
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
})


// GET CON PÁGINACIÓN

router.get('/notas', verificarAuth, async(req, res) => {
  const userId = req.usuario._id
  const limite = Number(req.query.limite) || 5
  const skip = Number(req.query.skip) || 0
  console.log(limite)
  try{
    const notaDB = await Nota.find({userId})
      .limit(limite).skip(skip)
      const totalNotas = await Nota.find({userId}).countDocuments()
    res.json({notaDB, totalNotas})
  }catch ( error){
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
})
module.exports = router;