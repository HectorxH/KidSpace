import express from 'express';
import _ from 'lodash';
import Estudiante, { IEstudiante } from '../models/Estudiante';
import ActividadLog, { IActividadLog } from '../models/ActividadLog';
import Curso from '../models/Curso';
import Profesor from '../models/Profesor';
import DocenteLog from '../models/DocenteLog';

const router = express.Router();

const RespuestasCorrectas: {[key: string]: string[]} = {
  Diagramas: ['Gráficos', 'Una tabla'],
  Diseños: ['Función', 'Textura'],
  Materiales: ['Norte', 'Material'],
  Reciclaje: ['Inorgánicas', 'Reutilizar'],
  'Soluciones Tecnológicas': ['Necesidad', 'Evolución'],
};

router.post('/profesor/:id/historialDocente', async (req, res) => {
  try {
    const { id } = req.params;
    const historial = await DocenteLog.find({ profesor: id });
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

router.get('/curso/:id/individual/:actividad/resultados', async (req, res) => {
  try {
    const { id } = req.params;
    const actividad = decodeURIComponent(req.params.actividad);
    const logs = await ActividadLog.find({ curso: id, tipo: 'individual', actividad }).populate({ path: 'estudiante', populate: { path: 'user' } });
    const filteredLogs = _.filter(_.map(logs, (o) => {
      const estudiante = o.estudiante as IEstudiante;
      return {
        fecha: o.fecha,
        duracion: o.duracion,
        nombre: estudiante ? `${estudiante.user.nombres} ${estudiante.user.apellidos}` : null,
      };
    }), (o) => o.nombre !== null);
    const resultados = _.mapValues(_.groupBy(filteredLogs, 'nombre'), (logsArray) => _.maxBy(logsArray, 'fecha'));
    res.json({ resultados });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/curso/:id/individual/:actividad', async (req, res) => {
  try {
    const { id } = req.params;
    const actividad = decodeURIComponent(req.params.actividad);
    const logs = await ActividadLog.find({ curso: id, tipo: 'individual', actividad }).populate({ path: 'estudiante', populate: { path: 'user' } });
    const noNulls = _.filter(logs, (o) => o.estudiante !== null);
    const noDups = _.map(_.groupBy(noNulls, 'estudiante'), (o) => _.maxBy(o, 'fecha')?.estudiante);
    res.json({ nLogs: logs.length, completadas: noDups });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/curso/:id/docente/:actividad/resultados', async (req, res) => {
  try {
    const { id, actividad } = req.params;
    const logs = await ActividadLog.find({ curso: id, tipo: 'clase', actividad }).populate({ path: 'estudiante', populate: { path: 'user' } });
    const filteredLogs = _.filter(_.map(logs, (o) => {
      const estudiante = o.estudiante as IEstudiante;
      return {
        fecha: o.fecha,
        respuesta1: o.quizFinal ? o.quizFinal[0].respuesta : null,
        respuesta2: o.quizFinal ? o.quizFinal[1].respuesta : null,
        nombre: estudiante ? `${estudiante.user.nombres} ${estudiante.user.apellidos}` : null,
      };
    }), (o) => o.nombre !== null);
    const logsByEstudiante = _.groupBy(filteredLogs, 'nombre');
    const resultados = _.mapValues(logsByEstudiante, (logsArray) => _.maxBy(logsArray, 'fecha'));
    res.json({ resultados });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/curso/:id/docente/:actividad', async (req, res) => {
  try {
    const { id, actividad } = req.params;
    const logs = await ActividadLog.find({ curso: id, tipo: 'clase', actividad }).populate({ path: 'estudiante', populate: { path: 'user' } });
    const noNulls = _.filter(logs, (o) => o.estudiante !== null);
    const noDups = _.map(_.groupBy(noNulls, 'estudiante'), (o) => _.maxBy(o, 'fecha'));
    const logsRespuestas = _.map(noDups, (o) => _.map(o?.quizFinal, 'respuesta'));
    const checkeadas = _.map(logsRespuestas, (respuestas) => ([
      respuestas[0] === RespuestasCorrectas[actividad][0] ? 'Correctas' : 'Incorrectas',
      respuestas[1] === RespuestasCorrectas[actividad][1] ? 'Correctas' : 'Incorrectas',
    ]));
    const groupRespuestas = _.zip(...checkeadas);
    const counts = _.map(
      groupRespuestas,
      (o) => _.mapValues(_.groupBy(o, _.identity), (x) => x.length),
    );
    res.json({
      nLogs: logs.length,
      counts: counts.length > 0
        ? counts
        : [{ Correctas: 0, Incorrectas: 0 }, { Correctas: 0, Incorrectas: 0 }],
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post('/profesor/:id/tiempo', async (req, res) => {
  try {
    const { id } = req.params;
    const { dateRange } = req.body;
    const profesor = await Profesor.findById(id);
    const logs = await ActividadLog.find({
      curso: { $in: profesor?.cursos },
      fecha: { $gte: dateRange[0], $lt: dateRange[1] },
    });
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

router.post('/profesor/:id/countCorrectasQuiz', async (req, res) => {
  try {
    const { id } = req.params;
    const { dateRange } = req.body;
    const profesor = await Profesor.findById(id);
    const logs = await ActividadLog.find({
      curso: { $in: profesor?.cursos },
      tipo: 'clase',
      fecha: { $gte: dateRange[0], $lt: dateRange[1] },
    });
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

router.post('/profesor/:id/%curso', async (req, res) => {
  try {
    const { id } = req.params;
    const { dateRange } = req.body;
    const profesor = await Profesor.findById(id).populate('cursos');
    const nEstudiantes = _.reduce(profesor?.cursos, (prev, curr) => prev + curr.length, 0);
    const logs = await ActividadLog.find({
      curso: { $in: profesor },
      tipo: 'clase',
      fecha: { $gte: dateRange[0], $lt: dateRange[1] },
    });

    const logsByActividad = _.groupBy(logs, 'actividad');
    const estudiantesByActividad = _.mapValues(logsByActividad, (o) => _.uniqWith(_.map(o, 'estudiante'), _.isEqual));
    const uniqueEstudiantesByActividad = _.mapValues(
      estudiantesByActividad,
      (o) => o.length / nEstudiantes,
    );
    res.json({ actividadesCurso: uniqueEstudiantesByActividad });
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
    const estudiantesByActividad = _.mapValues(logsByActividad, (o) => _.uniqWith(_.map(o, 'estudiante'), _.isEqual));
    const uniqueEstudiantesByActividad = _.mapValues(
      estudiantesByActividad,
      (o) => o.length / nEstudiantes,
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
    const estudiantesByActividad = _.mapValues(logsByActividad, (o) => _.uniqWith(_.map(o, 'estudiante'), _.isEqual));
    const uniqueEstudiantesByActividad = _.mapValues(
      estudiantesByActividad,
      (o) => o.length / nEstudiantes,
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
    const curso = await Curso.findById(id).populate({ path: 'estudiantes', populate: { path: 'user' } });
    if (!curso) throw Error('El curso no existe');
    const { estudiantes } = curso;
    const rankPromise = _.map(estudiantes, async (estudiante) => ({
      estudiante,
      cantidad: await ActividadLog.countDocuments({ estudiante: estudiante._id }),
    }));
    const rank = await Promise.all(rankPromise);
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
