/* eslint-disable camelcase */
import express from 'express';
import { IFavoritePostRequest } from '../types/teacher.d';
import Teacher from '../models/Teacher';
import ClassActivity from '../models/ClassActivity';

const router = express.Router();

router.get('/favorites/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findById(id);

    if (teacher === null) {
      res.send(404);
    } else {
      res.json({ favorites: teacher?.favorites });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post('/favorites/:id', async (req:IFavoritePostRequest, res) => {
  try {
    console.log('POST: /favorites/:id');
    const { id } = req.params;
    const { activity_id, favorite } = req.body;
    const teacher = await Teacher.findById(id);
    const activity = await ClassActivity.findById(activity_id);

    if (activity === null || teacher == null) {
      res.sendStatus(404);
    } else if (favorite === true) {
      teacher.favorites.addToSet(activity._id);
      await teacher.save();
      res.json({ favorites: teacher.favorites });
    } else if (favorite === false) {
      teacher.favorites.pull(activity._id);
      await teacher.save();
      res.json({ favorites: teacher.favorites });
    } else {
      res.sendStatus(400);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;
