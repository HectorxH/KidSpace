/* eslint-disable camelcase */
import express from 'express';
import Apoderado from '../models/Apoderado';
import User from '../models/User';

const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombres, apellidos, email } = req.body;
    const apoderado = await Apoderado.findById(id);
    const uid = apoderado?.uid;
    const user = await User.findById(uid);
    await user?.update({ nombres, apellidos, email });
    await user?.save();
    res.sendStatus(200);

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
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const apoderado = await Apoderado.findById(id);
    const uid = apoderado?.uid;
    await Apoderado.findByIdAndDelete(id);
    await User.findByIdAndDelete(uid);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
  }
});

export default router;
