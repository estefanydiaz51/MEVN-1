import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
const  mongoose = require('mongoose');

const app = express();

// Conexion a DB
const uri = 'mongodb://localhost:27017/udemy';
const options = {
  autoIndex: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4
}
mongoose.set('strictQuery', true);

mongoose.connect(uri, options).then(
  () => console.log('Conectado a mongoDB'),
  error => error
)


app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}))


// Rutas
// app.get('/', function(req, res){
//   res.send('Hola mundo');
// })

app.use('/api', require('./routes/nota'))

//Middleware para vue.js router mdo history
const history = require('connect-history-api-fallback');
app.use(history())
app.use(express.static(path.join(__dirname, 'public')));



app.set('puerto', process.env.PORT || 3000)
app.listen(app.get('puerto'), function(){
  console.log('Escuchando en el puerto', app.get('puerto'));
})