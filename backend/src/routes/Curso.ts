import express from 'express';
import { Types } from 'mongoose';
/* eslint-disable camelcase */
import Curso from '../models/Curso';
import Estudiante from '../models/Estudiante';
import Profesor from '../models/Profesor';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const user = req.user?._id;
    const { nombre } = req.body;
    const profesor = await Profesor.findOne({ user });
    const curso = await new Curso({ nombre, profesor: profesor?._id });
    await curso.save();
    profesor?.cursos?.push(curso._id);
    await profesor?.save();
    res.json(curso);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/', async (req, res) => {
  try {
    const user = req.user?._id;
    const tipo = req.user?.tipo;
    if (tipo === 'profesor') {
      const profesor = await Profesor.findOne({ user }).populate('cursos');
      const cursos = profesor?.cursos;
      res.json({ cursos });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const curso = await Curso.findById(id).populate({ path: 'estudiantes', populate: { path: 'user' } });
    res.json({ curso });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const curso = await Curso.findById(id).populate('estudiantes');
    if (curso) {
      curso.nombre = nombre;
      await curso.save();
      res.json({ curso });
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = req.user?._id;
    const { id } = req.params;
    await Profesor.findOneAndUpdate({ user }, {
      $pull:
      { planificadas: { cursoId: new Types.ObjectId(id) } },
    });
    await Estudiante.deleteMany({ curso: id });
    await Curso.deleteOne({ _id: id });
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// router.post('/:id/inscribir', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = req.user?._id;
//     const tipo = req.user?.tipo;
//     if (tipo === 'estudiante') {
//       const estudiante = await Estudiante.findOne({ user });
//       await Curso.findByIdAndUpdate(id, { $addToSet: { estudiantes: estudiante?._id } });
//       if (estudiante) {
//         estudiante.curso = id;
//         await estudiante?.save();
//       }
//     }
//     res.send(200);
//   } catch (e) {
//     console.log(e);
//     res.sendStatus(500);
//   }
// });

export default router;
