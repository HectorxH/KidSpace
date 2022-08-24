/* eslint-disable camelcase */
import express from 'express';
import _ from 'lodash';
import { IFavoritaRequest, IPlanificadaRequest } from '../types/teacher';
import Profesor from '../models/Profesor';

const router = express.Router();

router.get('/favoritas', async (req, res) => {
  try {
    const id = req.user?._id;
    const profesor = await Profesor.findById(id);

    if (profesor === null) {
      res.send(404);
    } else {
      res.json({ favoritas: profesor.favoritas });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post('/favoritas', async (req:IFavoritaRequest, res) => {
  try {
    const id = req.user?._id;
    const {
      nunidad, nactividad, titulo,
    } = req.body;
    const profesor = await Profesor.findById(id);
    const favorita = { nunidad, nactividad, titulo };

    if (_.some(favorita, _.isNil) || profesor === null) {
      res.sendStatus(404);
    } else {
      profesor.favoritas.addToSet(favorita);
      await profesor.save();
      res.json({ favoritas: profesor.favoritas });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.delete('/favoritas', async (req:IFavoritaRequest, res) => {
  try {
    const id = req.user?._id;
    const { nunidad, nactividad, titulo } = req.body;
    const profesor = await Profesor.findById(id);
    const favorita = { nunidad, nactividad, titulo };

    if (_.some(favorita, _.isNil) || profesor === null) {
      res.sendStatus(404);
    } else {
      profesor.favoritas.pull(favorita);
      await profesor.save();
      res.json({ favoritas: profesor.favoritas });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/planificadas', async (req, res) => {
  try {
    const id = req.user?._id;
    const profesor = await Profesor.findById(id);

    if (profesor === null) {
      res.send(404);
    } else {
      res.json({ planificadas: profesor.planificadas });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post('/planificadas', async (req:IPlanificadaRequest, res) => {
  try {
    const id = req.user?._id;
    const {
      nunidad, nactividad, curso, fecha,
    } = req.body;
    const profesor = await Profesor.findById(id);
    const planificada = {
      nunidad, nactividad, curso, fecha,
    };

    if (_.some(planificada, _.isNil) || profesor === null) {
      res.sendStatus(404);
    } else {
      profesor.planificadas.addToSet(planificada);
      await profesor.save();
      res.json({ planificadas: profesor.planificadas });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.delete('/planificadas', async (req:IPlanificadaRequest, res) => {
  try {
    const id = req.user?._id;
    const {
      nunidad, nactividad, curso, fecha,
    } = req.body;
    const profesor = await Profesor.findById(id);
    const planificada = {
      nunidad, nactividad, curso, fecha,
    };

    if (_.some(planificada, _.isNil) || profesor === null) {
      res.sendStatus(404);
    } else {
      profesor.planificadas.pull(planificada);
      await profesor.save();
      res.json({ planificadas: profesor.planificadas });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;
