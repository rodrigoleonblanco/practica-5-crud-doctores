const express = require('express');
const router = express.Router();
const { Doctor } = require('../db');

// GET
router.get('/', async (req, res) => {
  try {
    const doctores = await Doctor.find();
    res.json(doctores);
  } catch (err) {
    console.error('Error al listar doctores:', err.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET /doctores/:id
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor no encontrado' });
    }
    res.json(doctor);
  } catch (err) {
    console.error('Error al obtener doctor:', err.message);
    res.status(400).json({ error: 'ID inválido o error en la consulta' });
  }
});

// POST /doctores
router.post('/', async (req, res) => {
  try {
    const { nombre, especialidad, telefono, activo } = req.body;

    if (!nombre || !especialidad) {
      return res
        .status(400)
        .json({ error: 'nombre y especialidad son obligatorios' });
    }

    const doctor = new Doctor({
      nombre,
      especialidad,
      telefono,
      activo,
    });

    const nuevo = await doctor.save();
    res.status(201).json(nuevo);
  } catch (err) {
    console.error('Error al crear doctor:', err.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// PUT /doctores/:id
router.put('/:id', async (req, res) => {
  try {
    const { nombre, especialidad, telefono, activo } = req.body;

    const actualizado = await Doctor.findByIdAndUpdate(
      req.params.id,
      { nombre, especialidad, telefono, activo },
      { new: true, runValidators: true }
    );

    if (!actualizado) {
      return res.status(404).json({ error: 'Doctor no encontrado' });
    }

    res.json(actualizado);
  } catch (err) {
    console.error('Error al actualizar doctor:', err.message);
    res.status(400).json({ error: 'ID inválido o error en la actualización' });
  }
});

// DELETE /doctores/:id
router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await Doctor.findByIdAndDelete(req.params.id);

    if (!eliminado) {
      return res.status(404).json({ error: 'Doctor no encontrado' });
    }

    res.json({ message: 'Doctor eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar doctor:', err.message);
    res.status(400).json({ error: 'ID inválido o error al eliminar' });
  }
});

module.exports = router;
