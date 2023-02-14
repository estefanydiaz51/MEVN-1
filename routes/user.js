import express from 'express'
import User from '../models/user'
import bcrypt from 'bcrypt'
import _ from 'underscore'
import { verificarAuth, verificarAuthAdmin } from '../middlewares/autenticacion'

const router = express.Router()
const saltRounds = 10;

router.post('/nuevo-usuario', async(req,res) => {
  const body = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role
  }

  body.pass  = bcrypt.hashSync(req.body.pass, saltRounds)
  try{
    const usuarioDB = await User.create(body)
    res.json(usuarioDB)
  }catch(error){
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
})
router.put('/usuario/:id', [verificarAuth, verificarAuthAdmin], async(req,res) => {
  const _id = req.params.id
  const body = _.pick(req.body, ['name', 'email', 'pass', 'active' ])
  if(body.pass){
    body.pass  = bcrypt.hashSync(req.body.pass, saltRounds)
  }
  try{
    const usuarioDB = await User
    .findByIdAndUpdate(_id, body,
      { new: true,
      runValidators: true
    })
    return res.json(usuarioDB)
  }catch(error){
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
})

module.exports = router;