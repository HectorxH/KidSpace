import express from 'express';
import _ from 'lodash';
import ActividadLog, { IActividadLog } from '../models/ActividadLog';
import Estudiante from '../models/Estudiante';

const router = express.Router();

router.get('/estudiante/:id/steam', async (req, res) => {
  try {
    const { id } = req.params;
    const logs : IActividadLog[] = await ActividadLog.find({ estudiante: id });
    if (logs && logs.length > 0) {
      const steams = _.map(logs, (a) => a.steam);
      const total = _.reduce(steams, (a, b) => _.zipWith(a, b, _.add), [0, 0, 0, 0, 0]);
      res.json({ steam: total });
    } else {
      res.json({ steam: [0, 0, 0, 0, 0] });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/estudiante/:id/timeline', async (req, res) => {
  try {
    const { id } = req.params;
    const logs : IActividadLog[] = await ActividadLog.find({ estudiante: id });
    if (logs) {
      const timeline = _.map(logs, (log) => ({ x: 1, y: new Date(log.fecha) }));
      res.json({ timeline });
    } else {
      res.json({ timeline: [] });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/estudiante/:id/historial', async (req, res) => {
  try {
    const { id } = req.params;
    const historial : IActividadLog[] = await ActividadLog.find({ estudiante: id });
    if (historial) {
      res.json({ historial });
    } else {
      res.json({ historial: [] });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/estudiante/:id/actividades', async (req, res) => {
  try {
    const { id } = req.params;
    const estudiante = await Estudiante.findById(id);
    res.json({
      actividadesIndividuales: estudiante?.actividadesIndividuales,
      actividadesClase: estudiante?.actividadesClase,
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;
