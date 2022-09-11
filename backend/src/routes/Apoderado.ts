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
    await User.findByIdAndUpdate(apoderado?.user, { $set: { nombres, apellidos, email } });
    if (apoderado) {
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
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: 'Kidspace.cl',
      to: apoderado?.user.email,
      subject: 'Credenciales de acceso Kidspace', // Subject
      html: `<b>Nombre de usuario:</b> ${apoderado?.user.username} <b>Contraseña:</b> ${apoderado?.user.password}`, // html body
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

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
