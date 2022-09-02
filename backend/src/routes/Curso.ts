import express from 'express';
/* eslint-disable camelcase */
import Curso from '../models/Curso';
import Estudiante from '../models/Estudiante';
import Profesor from '../models/Profesor';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const uid = req.user?._id;
    const { nombre } = req.body;
    const profesor = await Profesor.findOne({ uid });
    const curso = await new Curso({ nombre, profesor: profesor?._id });
    await curso.save();
    res.json(curso);
  } catch (e) {
    console.log(e);
  }
});

router.get('/', async (req, res) => {
  try {
    const uid = req.user?._id;
    const tipo = req.user?.tipo;
    if (tipo === 'profesor') {
      const profesor = await Profesor.findOne({ uid }).populate('cursos');
      const cursos = profesor?.cursos;
      res.json(cursos);
    }
  } catch (e) {
    console.log(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.query;
    const curso = await Curso.findById(id).populate('estudiantes');
    res.json(curso);
  } catch (e) {
    console.log(e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.query;
    await Curso.deleteOne({ _id: id });
    res.send(200);
  } catch (e) {
    console.log(e);
  }
});

router.post('/inscribir/:id', async (req, res) => {
  try {
    const { id } = req.query;
    const uid = req.user?._id;
    const tipo = req.user?.tipo;
    if (tipo === 'estudiante') {
      const estudiante = await Estudiante.findOne({ uid });
      const curso = await Curso.findById(id);
      await curso?.estudiantes?.push(estudiante?.id);
      await curso?.save();
    }
    res.send(200);
  } catch (e) {
    console.log(e);
  }
});

export default router;
