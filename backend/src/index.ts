import express from 'express';
import dotenv from 'dotenv';
import teacherRouter from './routes/teacher';
import unitRouter from './routes/unit';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/teacher', teacherRouter);
app.use('/unit', unitRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
