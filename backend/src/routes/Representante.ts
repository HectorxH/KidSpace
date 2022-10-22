import express from 'express';
import dotenv from 'dotenv-safe';
import Representante from '../models/Representante';
import Profesor from '../models/Profesor';

dotenv.config();

const router = express.Router();

router.post('/agregarProfesor', async (req, res) => {
  try {
    const user = req.user?._id;
    const profesorUser = req.body.user;
    const representante = await Representante.findOne({ user });
    const profesor = await Profesor.findOne({ user: profesorUser });
    if (!representante) throw Error('Error en la cuenta');
    if (!profesor) throw Error('No existe el profesor indicado');
    profesor.validado = true;
    representante.profesores.push(profesor);
    await profesor.save();
    await representante.save();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post('/plan', async (req, res) => {
  try {
    const user = req.user?._id;
    const { plan } = req.body;
    await Representante.findOneAndUpdate({ user }, { plan });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;
