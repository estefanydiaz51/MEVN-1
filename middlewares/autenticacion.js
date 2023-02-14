
import jwt from 'jsonwebtoken'

const verificarAuth = (req, res, next) => {
  const token = req.get('token')
	jwt.verify(token, 'secret', (error, decoded) => {
		if(error){
			return res.status(400).json({
				mensaje: 'Usuario no valido',
				error
			})
		}
		req.usuario = decoded.data
		next()
	})
}

const verificarAuthAdmin = (req, res, next) => {
	const role = req.usuario.role
	if(role === 'ADMIN'){
		next()
	}else {
		return res.status(401).json({
			mensaje: 'Usuario no válido'
		})
	}
}

module.exports = {verificarAuth, verificarAuthAdmin}