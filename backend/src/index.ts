import express from 'express';
import dotenv from 'dotenv-safe';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import ProfesorRouter from './routes/Profesor';
import ActivityRouter from './routes/Activity';
import initPassport from './passport-config';
import { checkAuth, checkNotAuth } from './auths';
import User from './models/User';
import Profesor from './models/Profesor';

dotenv.config();

const connString = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}`
  + '@kidspace.l3bfoxn.mongodb.net/KidSpace?retryWrites=true&w=majority';

mongoose.connect(connString);

const app = express();
const port = process.env.SERVER_PORT;

initPassport(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/register', async (req, res) => {
  try {
    const { username, password, tipo } = req.body;
    if (_.some({ username, password, tipo }, _.isNil)) {
      console.log(req.body);
      res.sendStatus(404);
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPass, tipo });
    await user.save();

    if (user.tipo === 'profesor') {
      const profesor = new Profesor({ uid: user._id });
      await profesor.save();
    }
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

app.post('/login', checkNotAuth, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

app.delete('/logout', checkAuth, (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    return res.sendStatus(200);
  });
});

app.use('/Profesor', checkAuth, ProfesorRouter);
app.use('/Activity', ActivityRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
