/* eslint-disable camelcase */
import express from 'express';
import { IFavoritePostRequest } from '../../types/teacher.d';
import Teacher from '../models/Teacher';
import ClassActivity from '../models/ClassActivity';

const router = express.Router();

router.get('/favorites/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findById(id);
    res.json(teacher?.favorites);
  } catch (e) {
    console.log(e);
    res.sendStatus(404);
  }
});

router.post('/favorites/:id', async (req:IFavoritePostRequest, res) => {
  try {
    const { id } = req.params;
    const { activity_id, favorite } = req.body;
    const teacher = await Teacher.findById(id);
    const activity = await ClassActivity.findById(activity_id);

    if (activity === null || teacher == null) {
      res.sendStatus(404);
    } else if (favorite) {
      teacher.favorites.addToSet(activity._id);
    } else {
      teacher.favorites.pull(activity._id);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(404);
  }
});

export default router;
