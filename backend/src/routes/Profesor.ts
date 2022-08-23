/* eslint-disable camelcase */
import express from 'express';
import { IFavoritaPostRequest } from '../types/teacher';
import Profesor from '../models/Profesor';

const router = express.Router();

router.get('/favoritas/:id', async (req, res) => {
  try {
    const { id } = req.params;
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

router.post('/favoritas/:id', async (req:IFavoritaPostRequest, res) => {
  try {
    console.log('POST: /favorites/:id');
    const { id } = req.params;
    const {
      nunidad, nactividad, titulo, favorita,
    } = req.body;
    const profesor = await Profesor.findById(id);
    const fav = { nunidad, nactividad, titulo };

    if (nunidad === null || nactividad == null || titulo === null || profesor === null) {
      res.sendStatus(404);
    } else if (favorita === true) {
      profesor.favoritas.addToSet(fav);
      await profesor.save();
      res.json({ favoritas: profesor.favoritas });
    } else if (favorita === false) {
      profesor.favoritas.pull(fav);
      await profesor.save();
      res.json({ favoritas: profesor.favoritas });
    } else {
      res.sendStatus(400);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;
