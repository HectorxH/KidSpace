import express from 'express';

const router = express.Router();

router.get('/favorires/{:id}', (req, res) => {
  const favorites = {
    favorites: [27, 41, 42],
  };
  res.json(favorites);
});

router.post('/favorires/{:id}', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

export default router;
