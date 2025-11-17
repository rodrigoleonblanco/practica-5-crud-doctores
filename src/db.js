const mongoose = require('mongoose');

const APP_ENV = process.env.APP_ENV || 'local';
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('Falta la variable de entorno MONGO_URI');
}

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      // opciones modernas, mongoose 7+ ya ajusta varias por defecto
    });
    console.log(`Conectado a MongoDB en ${MONGO_URI} (env=${APP_ENV})`);
  } catch (err) {
    console.error('Error conectando a MongoDB:', err.message);
    process.exit(1);
  }
}

/**
 * Definimos el esquema de Doctor.
 * Puedes agregar campos según gustes.
 */
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

// Nombre colección según ambiente: doctores_local o doctores_prod
const collectionName = `doctores_${APP_ENV}`;

// Tercer parámetro = nombre exacto 
const Doctor = mongoose.model('Doctor', doctorSchema, collectionName);

module.exports = {
  connectDB,
  Doctor,
};
