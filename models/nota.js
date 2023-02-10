import mongoose from "mongoose";

const schema = mongoose.Schema;

const notaSchema = new schema({
  name: {
    type: String,
    required: [true, 'Nombre obligatorio']
  },
  description: String,
  userId: String,
  date: {
    type: Date,
    default: Date.now()
  },
  active: {
    type: Boolean,
    default: true
  }
})

// convertir a modelo
const Nota = mongoose.model('Nota', notaSchema)

export default Nota;
