/* eslint-disable camelcase */
import express from 'express';
import ActividadLog from '../models/ActividadLog';
import Apoderado from '../models/Apoderado';
import Curso from '../models/Curso';
import Estudiante from '../models/Estudiante';
import User from '../models/User';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const estudiante = await Estudiante.findById(id).populate(['user', { path: 'apoderados', populate: { path: 'user' } }]);
    res.json({ estudiante });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

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
    res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const estudiante = await Estudiante.findById(id);
    const user = estudiante?.user;
    await Curso.findByIdAndUpdate(estudiante?.curso, { $pull: { estudiantes: [id] } });
    if (estudiante) {
      // eslint-disable-next-line no-restricted-syntax
      for (const apoderadoId of estudiante.apoderados) {
        // eslint-disable-next-line no-await-in-loop
        await Apoderado.findByIdAndUpdate(apoderadoId, { $pull: { estudiantes: [id] } });
      }
    }
    await Estudiante.findByIdAndDelete(id);
    await User.findByIdAndDelete(user);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/:id/apoderados', async (req, res) => {
  try {
    const { id } = req.params;
    const estudiante = await Estudiante.findById(id).populate({ path: 'apoderados', populate: { path: 'user' } });
    res.json({ apoderados: estudiante?.apoderados });
  } catch (e) {
    console.log(e);
    res.send(500);
  }
});

router.put('/:id/apoderados', async (req, res) => {
  try {
    const { id } = req.params;
    const { apoderadoId } = req.body;
    await Estudiante.findByIdAndUpdate(id, { $addToSet: { apoderados: apoderadoId } });
  } catch (e) {
    console.log(e);
    res.send(500);
  }
});

router.post('/log', async (req, res) => {
  try {
    const {
      tipo, actividad, unidad, categoria, estudiante, curso, quizFinal, duracion, fecha,
    } = req.body;
    const log = new ActividadLog({
      tipo, actividad, unidad, categoria, estudiante, curso, quizFinal, duracion, fecha,
    });
    log.save();
  } catch (e) {
    console.log(e);
    res.send(500);
  }
});

router.get('/:id/monedas', async (req, res) => {
  try {
    const { id } = req.params;
    const estudiante = await Estudiante.findById(id);
    res.json(estudiante?.monedas);
  } catch (e) {
    console.log(e);
    res.send(500);
  }
});

router.post('/:id/monedas', async (req, res) => {
  try {
    const { id } = req.params;
    const { monedas } = req.body;
    await Estudiante.findByIdAndUpdate(id, { monedas });
  } catch (e) {
    console.log(e);
    res.send(500);
  }
});

router.get('/:id/personaje', async (req, res) => {
  try {
    const { id } = req.params;
    const estudiante = await Estudiante.findById(id);
    res.json(estudiante?.personaje);
  } catch (e) {
    console.log(e);
    res.send(500);
  }
});

router.post('/:id/personaje', async (req, res) => {
  try {
    const { id } = req.params;
    const { personaje } = req.body;
    await Estudiante.findByIdAndUpdate(id, { personaje });
  } catch (e) {
    console.log(e);
    res.send(500);
  }
});

export default router;
