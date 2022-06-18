import express from 'express';
import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import teacherRouter from './routes/teacher';
// import unitRouter from './routes/unit';
import ActivitiesRouter from './routes/Activities';

const cors = require('cors');

dotenv.config();

// const connString = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}`
//   + '@kidspace.l3bfoxn.mongodb.net/KidSpace?retryWrites=true&w=majority';

// mongoose.connect(connString);

const app = express();
const port = 8080;
// process.env.SERVER_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use('/teacher', teacherRouter);
// app.use('/unit', unitRouter);
app.use('/Activities', ActivitiesRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
