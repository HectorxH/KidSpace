/* eslint-disable camelcase */
import express from 'express';
import Apoderado from '../models/Apoderado';
import User from '../models/User';

const router = express.Router();

router.post('/:id', async (req, res) => {
  try {
    const { id } = req.query;
    const { nombres, apellidos, email } = req.body;
    const apoderado = await Apoderado.findById(id);
    const uid = apoderado?.uid;
    const user = await User.findById(uid);
    await user?.update({ nombres, apellidos, email });
    await user?.save();
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.query;
    const apoderado = await Apoderado.findById(id);
    const uid = apoderado?.uid;
    await Apoderado.findByIdAndDelete(id);
    await User.findByIdAndDelete(uid);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
  }
});

export default router;
