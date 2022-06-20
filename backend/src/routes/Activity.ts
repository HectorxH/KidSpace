import express from 'express';
import Pusher from 'pusher';
import dotenv from 'dotenv-safe';

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
    console.log(`${req.body.nunidad}->${req.body.titulo}`);
    pusher.trigger('channel', 'message', {
      message: req.body.msg,
    });
    console.log('ok');
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;
