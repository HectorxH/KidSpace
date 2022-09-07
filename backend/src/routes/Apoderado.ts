/* eslint-disable camelcase */
import express from 'express';
import Apoderado from '../models/Apoderado';
import User from '../models/User';

const router = express.Router();

router.post('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombres, apellidos, email } = req.body;
    const apoderado = await Apoderado.findById(id);
    const user = await User.findById(apoderado?.user);
    await user?.update({ nombres, apellidos, email });
    await user?.save();
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const apoderado = await Apoderado.findById(id);
    const user = apoderado?.user;
    await Apoderado.findByIdAndDelete(id);
    await User.findByIdAndDelete(user);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
  }
});

export default router;
