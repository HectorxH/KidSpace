/* eslint-disable camelcase */
import express from 'express';
import Apoderado from '../models/Apoderado';
import Estudiante from '../models/Estudiante';
import User from '../models/User';

const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombres, apellidos, email } = req.body;
    const apoderado = await Apoderado.findById(id);
    if (apoderado) {
      const user = await User.findById(apoderado.user);
      await user?.update({ nombres, apellidos, email });
      await user?.save();
      apoderado.populate('user');
      res.json({ apoderado });
    } else {
      res.send(500);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post('/:id/sendCredentials', async (req, res) => {
  try {
    const { id } = req.params;
    const apoderado = await Apoderado.findById(id).populate('user');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'cosmosphere.tech@gmail.com', // Cambiar
        pass: 'f3r14k1dsp4c3*',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: 'Kidspace.cl',
      to: email,
      subject: 'Credenciales de acceso Kidspace', // Subject
      text: 'Bienvenido a la plataforma Kidspace', // plain text
      html: '<b>Hello world?</b>', // html body
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const apoderado = await Apoderado.findById(id);
    const user = apoderado?.user;
    if (apoderado) {
      // eslint-disable-next-line no-restricted-syntax
      for (const estudianteId of apoderado.estudiantes) {
        // eslint-disable-next-line no-await-in-loop
        await Estudiante.findByIdAndUpdate(
          estudianteId,
          { $pull: { estudiantes: [id] } },
        );
      }
    }
    await Apoderado.findByIdAndDelete(id);
    await User.findByIdAndDelete(user);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;
