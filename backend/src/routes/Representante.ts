import express from 'express';
import dotenv from 'dotenv-safe';
import Representante from '../models/Representante';

dotenv.config();

const router = express.Router();

router.post('/plan', async (req, res) => {
  try {
    const user = req.user?._id;
    const { plan } = req.body;
    await Representante.findOneAndUpdate({ user }, { plan });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/', async (req, res) => {
  try {
    const user = req.user?._id;
    const representante = await Representante.findOne({ user }).populate({ path: 'profesores', populate: { path: 'user' } });
    res.json({ representante });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;
