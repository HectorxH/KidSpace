/* eslint-disable camelcase */
import express from 'express';

// import { IFavoritePostRequest } from '../../types/teacher';
// import SoloActivity from '../models/SoloActivity';

const Pusher = require('pusher');

const pusher = new Pusher({
  appId: '1425238',
  key: '74009350c3b99530d9e9',
  secret: 'af9fa1923dc9d44d9836',
  cluster: 'sa1',
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
