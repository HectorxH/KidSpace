/* eslint-disable camelcase */
import express from 'express';
import Estudiante from '../models/Estudiante';
import User from '../models/User';

const router = express.Router();

router.post('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombres, apellidos } = req.body;
    const estudiante = await Estudiante.findById(id);
    const uid = estudiante?.uid;
    const user = await User.findById(uid);
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
    const uid = estudiante?.uid;
    await Estudiante.findByIdAndDelete(id);
    await User.findByIdAndDelete(uid);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
  }
});

export default router;
