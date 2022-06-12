import express from 'express';
import { FavoritePostReq } from '../../types/teacher.d';

const router = express.Router();

router.get('/favorites/:id', (req, res) => {
  const favorites = {
    favorites: [27, 41, 42],
  };
  res.json(favorites);
});

router.post('/favorites/:id', (req:FavoritePostReq, res) => {
  const { body } = req;
  console.log(body.activity_id);
  res.sendStatus(200);
});

export default router;
