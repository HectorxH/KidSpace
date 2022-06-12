import express from 'express';
import teacherRouter from './routes/teacher';

const app = express();

app.use('/teacher', teacherRouter);

const port = 3000;
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
