/* eslint-disable camelcase */
import express from 'express';

// import { IFavoritePostRequest } from '../../types/teacher';
// import SoloActivity from '../models/SoloActivity';

const Pusher = require('pusher');

const pusher = new Pusher({
  appId: '1425382',
  key: '942f26b33dcea4510931',
  secret: '53c8f6c9b2469ab5027d',
  cluster: 'us2',
  useTLS: true,
});

const router = express.Router();

router.post('/message', async (req, res) => {
  console.log('haa');
  try {
    console.log(req.body.msg);
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
