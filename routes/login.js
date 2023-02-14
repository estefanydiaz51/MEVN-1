import express from 'express'
const router = express.Router()

import User from '../models/user'
import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'

const saltRounds = 10;

router.post('/', async(req, res)=> {
  const body = req.body
  try {
    const usuarioDB = await User.findOne({email: body.email})
    if(!usuarioDB){
      return res.status(400).json({
        mensaje: 'Email no encontrado'
      })
    }
    const validation = bcrypt.compareSync(body.pass, usuarioDB.pass)
    if(!validation) {
      return res.status(400).json({
        mensaje: 'Contraseña incorrecta'
      })
    }

    // generar token
    const token = jwt.sign({
      data: usuarioDB
    }, 'secret', { expiresIn: 60 * 60 * 24 *30 })
    res.json({
      usuarioDB,
      token
    })
  } catch(error){
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
})

module.exports = router;