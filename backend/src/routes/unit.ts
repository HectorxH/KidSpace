import express from 'express';

const router = express.Router();

router.get('/', (req, resp) => {
  const unit = {
    unit_id: 42,
    unit_name: 'str',
    activities: [
      {
        id: 28,
        title: 'str',
        description: 'str',
        intro_story: {
          title: 'str',
          description: 'str',
        },
      },
    ],
  };

  resp.json(unit);
});

export default router;
