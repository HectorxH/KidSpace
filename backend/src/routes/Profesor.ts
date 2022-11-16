/* eslint-disable camelcase */
import express from 'express';
import _ from 'lodash';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv-safe';
import { readFileSync } from 'fs';
import path from 'path';
import Profesor from '../models/Profesor';
import { IFavoritaRequest } from '../types/teacher';
import User from '../models/User';
import Representante from '../models/Representante';

dotenv.config();

const router = express.Router();

const emailTemplate = readFileSync(path.join(__dirname, '../../assets/email/profesor.html')).toString();

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

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const profesor = await Profesor.findById(id).populate(['user', 'cursos']);
    if (profesor) {
      res.json({ profesor });
    } else {
      res.send(500);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombres, apellidos, email } = req.body;
    const profesor = await Profesor.findById(id);
    await User.findByIdAndUpdate(profesor?.user, { $set: { nombres, apellidos, email } });
    if (profesor) {
      profesor.populate('user');
      res.json({ profesor });
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
    const profesor = await Profesor.findById(id).populate('user');

    await transporter.sendMail({
      from: 'Kidspace.cl',
      to: profesor?.user.email,
      subject: 'Credenciales de acceso Kidspace', // Subject
      html: emailTemplate.format(profesor?.user.username, profesor?.password),
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
    const user = req.user?._id;
    const { id } = req.params;
    const profesor = await Profesor.findById(id);
    await Representante.findOneAndUpdate({ user }, { $pull: { profesores: id } });
    await User.findByIdAndDelete(profesor?.user);
    await Profesor.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/favoritas', async (req, res) => {
  try {
    const user = req.user?._id;
    const profesor = await Profesor.findOne({ user });
    res.json({ favoritas: profesor?.favoritas });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post('/favoritas', async (req:IFavoritaRequest, res) => {
  try {
    const user = req.user?._id;
    const {
      nunidad, nactividad, del,
    } = req.body;
    const favorita = { nunidad, nactividad };
    if (_.some(favorita, _.isNil) || del === null) {
      res.sendStatus(404);
    }

    if (del) {
      await Profesor.updateOne({ user }, { $pull: { favoritas: favorita } });
    } else {
      await Profesor.updateOne({ user }, { $addToSet: { favoritas: favorita } });
    }

    const profesor = await Profesor.findOne({ user });
    res.json({ favoritas: profesor?.favoritas });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/planificadas', async (req, res) => {
  try {
    const user = req.user?._id;
    const profesor = await Profesor.findOne({ user }).populate({ path: 'planificadas', populate: { path: 'curso' } });

    if (profesor === null) {
      res.sendStatus(404);
    } else {
      res.json({ planificadas: profesor.planificadas });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post('/planificadas', async (req, res) => {
  try {
    const user = req.user?._id;
    const {
      _id, nunidad, nactividad, curso, fecha, del,
    } = req.body;
    const planificada = {
      nunidad, nactividad, curso, fecha, del,
    };

    if (_.some(planificada, _.isNil) || del === null) {
      res.sendStatus(404);
    }

    if (del) {
      await Profesor.updateOne({ user }, { $pull: { planificadas: { _id } } });
    } else {
      await Profesor.updateOne({ user }, { $addToSet: { planificadas: planificada } });
    }

    const profesor = await Profesor.findOne({ user });
    res.json({ favoritas: profesor?.planificadas });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;
