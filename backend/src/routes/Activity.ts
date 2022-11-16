import express from 'express';
import Pusher from 'pusher';
import dotenv from 'dotenv-safe';
import Profesor from '../models/Profesor';
import DocenteLog from '../models/DocenteLog';

dotenv.config();

const config = {
  appId: process.env.PUSHER_APPID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
};

const pusher = new Pusher(config);

const router = express.Router();

router.post('/message', async (req, res) => {
  try {
    const user = req.user?._id;
    const profesor = await Profesor.findOne({ user });
    if (profesor) {
      profesor.actividades[req.body.msg.titulo] = true;
      profesor.save();
      console.log(`${req.body.msg.nunidad}->${req.body.msg.titulo}`);
      pusher.trigger('channel', 'message', {
        message: req.body.msg,
        curso: req.body.curso,
      });
      console.log('ok');
      const log = new DocenteLog({
        actividad: req.body.msg.titulo,
        curso: req.body.curso,
        profesor: profesor._id,
      });
      await log.save();
      res.sendStatus(200);
    } else {
      throw Error('Tipo de usuario invalido');
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;
