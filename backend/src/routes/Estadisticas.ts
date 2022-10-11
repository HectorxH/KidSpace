import express from 'express';
import _ from 'lodash';
import Estudiante from '../models/Estudiante';
import ActividadLog, { IActividadLog } from '../models/ActividadLog';
import Curso from '../models/Curso';

const router = express.Router();

const RespuestasCorrectas: {[key: string]: string[]} = {
  Diagramas: ['gráficos', 'una tabla'],
  Diseños: ['función', 'textura'],
  Materiales: ['centro', 'lote'],
};

router.get('/curso/:id/tiempo', async (req, res) => {
  try {
    const { id } = req.params;
    const logs = await ActividadLog.find({ curso: id, tipo: 'clase' });
    const logsByActividad = _.groupBy(logs, 'actividad');
    const avergeTimeByActividad = _.mapValues(
      logsByActividad,
      (o) => _.meanBy(o, (x) => Number(x.duracion)),
    );
    res.json({ tiempo: avergeTimeByActividad });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/curso/:id/countCorrectasQuiz', async (req, res) => {
  try {
    const { id } = req.params;
    const logs = await ActividadLog.find({ curso: id, tipo: 'clase' });
    const respuestas = _.map(logs, (o) => ({
      actividad: o.actividad,
      respuestas: _.map(o.quizFinal, 'respuesta'),
    }));
    const byActividad = _.groupBy(respuestas, 'actividad');
    const respuestasByActividad = _.mapValues(byActividad, (oArray) => _.map(oArray, 'respuestas'));
    const correctas = _.mapValues(
      respuestasByActividad,
      // eslint-disable-next-line no-shadow
      (v, k) => _.flatMap(v, (respuestas) => ([
        respuestas[0] === RespuestasCorrectas[k][0] ? 'Correctas' : 'Incorrectas',
        respuestas[1] === RespuestasCorrectas[k][1] ? 'Correctas' : 'Incorrectas',
      ])),
    );
    const countCorrectas = _.mapValues(
      correctas,
      (o) => _.mapValues(_.groupBy(o, _.identity), (x) => x.length),
    );
    res.json({ countCorrectas });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/curso/:id/%curso', async (req, res) => {
  try {
    const { id } = req.params;
    const curso = await Curso.findById(id);
    const nEstudiantes = curso?.estudiantes?.length || 0;
    const logs = await ActividadLog.find({ curso: id, tipo: 'clase' });

    const logsByActividad = _.groupBy(logs, 'actividad');
    const estudiantesByActividad = _.mapValues(logsByActividad, (o) => _.map(o, 'estudiante'));
    const uniqueEstudiantesByActividad = _.mapValues(
      estudiantesByActividad,
      (o) => _.uniq(o).length / nEstudiantes,
    );
    res.json({ actividadesCurso: uniqueEstudiantesByActividad });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/curso/:id/%individual', async (req, res) => {
  try {
    const { id } = req.params;
    const curso = await Curso.findById(id);
    const nEstudiantes = curso?.estudiantes?.length || 0;
    const logs = await ActividadLog.find({ curso: id, tipo: 'individual' });

    const logsByActividad = _.groupBy(logs, 'actividad');
    const estudiantesByActividad = _.mapValues(logsByActividad, (o) => _.map(o, 'estudiante'));
    const uniqueEstudiantesByActividad = _.mapValues(
      estudiantesByActividad,
      (o) => _.uniq(o).length / nEstudiantes,
    );
    res.json({ actividadesIndividual: uniqueEstudiantesByActividad });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/curso/:id/rank', async (req, res) => {
  try {
    const { id } = req.params;
    const logs = await ActividadLog.find({ curso: id });

    const logsByEstudiante = _.groupBy(logs, 'estudiante');
    const countByEstudiantePromise = _.mapValues(logsByEstudiante, async (logArray) => {
      const estudianteId = logArray[0].estudiante;
      const estudiante = await Estudiante.findById(estudianteId).populate('user');
      if (!estudiante) return null;
      return { estudiante, cantidad: logArray.length };
    });
    const countByEstudiante = await Promise.all(Object.values(countByEstudiantePromise));
    const rank = Object.values(_.omitBy(countByEstudiante, (o) => !o || !o.estudiante));
    res.json({ rank });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

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
      const timeline = _.map(logs, (log) => ({ y: 1, x: new Date(log.fecha) }));
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

router.post('/log', async (req, res) => {
  try {
    const user = req.user?._id;
    const {
      tipo, actividad, unidad, steam, curso, quizFinal, duracion, fecha,
    } = req.body;

    const estudiante = await Estudiante.findOne({ user });
    if (!estudiante) throw Error('Tipo de cuenta invalida');

    const log = new ActividadLog({
      tipo, actividad, unidad, steam, curso, quizFinal, duracion, fecha,
    });
    log.estudiante = estudiante;
    await log.save();

    if (tipo === 'individual' && estudiante) {
      await Estudiante.findByIdAndUpdate(estudiante._id, {
        [`actividadesIndividuales.${actividad}`]: estudiante.actividadesIndividuales[actividad] + 1,
      });
    } else if (tipo === 'clase' && estudiante) {
      await Estudiante.findByIdAndUpdate(estudiante._id, {
        [`actividadesClase.${actividad}`]: estudiante.actividadesClase[actividad] + 1,
      });
    }

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;
