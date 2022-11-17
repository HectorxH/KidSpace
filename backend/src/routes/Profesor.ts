/* eslint-disable camelcase */
import express from 'express';
import _ from 'lodash';
import { IFavoritaRequest } from '../types/teacher';
import Profesor from '../models/Profesor';

const router = express.Router();

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
