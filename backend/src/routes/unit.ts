import express from 'express';
import Unit from '../models/Unit';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const units = await Unit.find().populate('activities');
    res.json(units);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;
