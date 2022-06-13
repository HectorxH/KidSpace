import express from 'express';
import Unit from '../models/Unit';

const router = express.Router();

router.get('/', async (req, resp) => {
  try {
    const units = await Unit.find().populate('activities');
    resp.json(units);
  } catch (e) {
    console.log(e);
  }
});

export default router;
