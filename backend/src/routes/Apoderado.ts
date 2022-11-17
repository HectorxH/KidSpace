/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv-safe';
import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';
import Estudiante, { IEstudiante } from '../models/Estudiante';
import Apoderado from '../models/Apoderado';
import User, { IUser } from '../models/User';

dotenv.config();

const router = express.Router();

const emailTemplate = readFileSync(path.join(__dirname, '../../assets/email/apoderado.html')).toString();
const estudianteEmail = '<li>{0}</li>';

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
      res.sendStatus(500);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post('/:id/sendCredentials', async (req, res) => {
  try {
    const { id } = req.params;
    const apoderado = await Apoderado.findById(id).populate([
      'user',
      { path: 'estudiantes', populate: { path: 'user' } },
    ]);

    const nombres = _.map(
      apoderado?.estudiantes,
      (e: IEstudiante) => estudianteEmail.format(`${e.user?.nombres} ${e.user?.apellidos}`),
    );

    await transporter.sendMail({
      from: 'Kidspace.cl',
      to: apoderado?.user.email,
      subject: 'Credenciales de acceso Kidspace', // Subject
      html: emailTemplate.format(apoderado?.user.username, apoderado?.password, nombres.join('')),
      attachments: [{
        filename: 'image-1.png',
        path: path.join(__dirname, '../../assets/email/images/image-1.png'),
        cid: 'templateEmailImage@Kidspace',
      }],
    });
    res.sendStatus(200);
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
          { $pull: { estudiantes: id } },
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

router.delete('/:id/estudiante/:estudianteId', async (req, res) => {
  try {
    const { id, estudianteId } = req.params;
    await Apoderado.findByIdAndUpdate(id, { $pull: { estudiantes: estudianteId } });
    const apoderado = await Apoderado.findById(id);
    if (apoderado?.estudiantes.length === 0) {
      await Apoderado.findByIdAndDelete(id);
    }
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/mispupilos', async (req, res) => {
  try {
    const user = req.user?._id;
    const apoderado = await Apoderado.findOne({ user }).populate({ path: 'estudiantes', populate: ['user', 'curso'] });
    res.json({ estudiantes: apoderado?.estudiantes });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;
