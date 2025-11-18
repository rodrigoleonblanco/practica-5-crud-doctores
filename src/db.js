const mongoose = require('mongoose');

const APP_ENV = process.env.APP_ENV || 'local';
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('Falta la variable de entorno MONGO_URI');
}

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
    });
    console.log(`Conectado a MongoDB en ${MONGO_URI} (env=${APP_ENV})`);
  } catch (err) {
    console.error('Error conectando a MongoDB:', err.message);
    process.exit(1);
  }
}

const doctorSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    especialidad: { type: String, required: true },
    telefono: { type: String },
    activo: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const collectionName = `doctores_${APP_ENV}`;

const Doctor = mongoose.model('Doctor', doctorSchema, collectionName);

module.exports = {
  connectDB,
  Doctor,
};
