/* eslint-disable camelcase */
import express from 'express';
import Curso from '../models/Curso';
import Estudiante from '../models/Estudiante';
import User from '../models/User';

const router = express.Router();

router.post('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombres, apellidos } = req.body;
    const estudiante = await Estudiante.findById(id);
    const user = await User.findById(estudiante?.user);
    await user?.update({ nombres, apellidos });
    await user?.save();
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const estudiante = await Estudiante.findById(id);
    const user = estudiante?.user;
    await Curso.findByIdAndUpdate(estudiante?.curso, { $pullAll: { estudiantes: [id] } });
    await Estudiante.findByIdAndDelete(id);
    await User.findByIdAndDelete(user);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
  }
});

export default router;
