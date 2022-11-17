/* eslint-disable camelcase */
import express from 'express';
import _ from 'lodash';
import ActividadLog from '../models/ActividadLog';
import Apoderado from '../models/Apoderado';
import Curso from '../models/Curso';
import Estudiante from '../models/Estudiante';
import User from '../models/User';

const router = express.Router();

router.get('/monedas', async (req, res) => {
  try {
    const user = req.user?._id;
    const estudiante = await Estudiante.findOne({ user });
    res.json({ monedas: estudiante?.monedas });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post('/addMonedas', async (req, res) => {
  try {
    const user = req.user?._id;
    const { cantMonedas } = req.body;
    const estudiante = await Estudiante.findOne({ user });
    if (estudiante) {
      estudiante.monedas += cantMonedas;
      await estudiante.save();
      res.sendStatus(200);
    } else {
      throw Error();
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/personaje', async (req, res) => {
  try {
    const user = req.user?._id;
    const estudiante = await Estudiante.findOne({ user });
    res.json({ personaje: estudiante?.personaje });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post('/personaje', async (req, res) => {
  try {
    const user = req.user?._id;
    const { personaje } = req.body;
    await Estudiante.findOneAndUpdate({ user }, { personaje });
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/compras', async (req, res) => {
  try {
    const user = req.user?._id;
    const estudiante = await Estudiante.findOne({ user });
    res.json({ compras: estudiante?.compras });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post('/compras', async (req, res) => {
  try {
    const user = req.user?._id;
    const { compras } = req.body;
    await Estudiante.findOneAndUpdate({ user }, { compras });
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/actividades', async (req, res) => {
  try {
    const user = req.user?._id;
    const estudiante = await Estudiante.findOne({ user });
    res.json({
      actividadesIndividuales: estudiante?.actividadesIndividuales,
      actividadesClase: estudiante?.actividadesClase,
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/compas', async (req, res) => {
  try {
    const user = req.user?._id;
    const est = await Estudiante.findOne({ user });
    const curso = await Curso.findById(est?.curso).populate({ path: 'estudiantes', populate: { path: 'user' } });
    const estudiantes = curso?.estudiantes;
    if (!curso || !estudiantes) throw Error('Curso invalido');
    const compas = _.map(estudiantes, (estudiante) => ({
      nombres: estudiante.user.nombres,
      apellidos: estudiante.user.apellidos,
      personaje: estudiante.personaje,
      actividadesIndividuales: estudiante.actividadesIndividuales,
    }));
    res.json({ compas });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const estudiante = await Estudiante
      .findById(id)
      .populate([
        'user',
        { path: 'apoderados', populate: { path: 'user' } },
        { path: 'curso', select: '_id nombre' },
      ]);
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
    await Curso.findByIdAndUpdate(estudiante?.curso, { $pull: { estudiantes: id } });
    await ActividadLog.deleteMany({ estudiante });
    if (estudiante) {
      // eslint-disable-next-line no-restricted-syntax
      for (const apoderadoId of estudiante.apoderados) {
        // eslint-disable-next-line no-await-in-loop
        await Apoderado.findByIdAndUpdate(apoderadoId, { $pull: { estudiantes: id } });
        // eslint-disable-next-line no-await-in-loop
        const apoderado = await Apoderado.findById(apoderadoId);
        if (apoderado?.estudiantes.length === 0) {
          // eslint-disable-next-line no-await-in-loop
          await Apoderado.findByIdAndDelete(apoderadoId);
        }
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
    res.sendStatus(500);
  }
});

router.put('/:id/apoderados', async (req, res) => {
  try {
    const { id } = req.params;
    const { apoderadoId } = req.body;
    await Estudiante.findByIdAndUpdate(id, { $addToSet: { apoderados: apoderadoId } });
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;
