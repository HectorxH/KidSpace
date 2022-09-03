import express from 'express';
import dotenv from 'dotenv-safe';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import ProfesorRouter from './routes/Profesor';
import CursoRouter from './routes/Curso';
import EstudianteRouter from './routes/Estudiante';
import ApoderadoRouter from './routes/Apoderado';
import ActivityRouter from './routes/Activity';
import initPassport from './passport-config';
import { checkAuth, checkNotAuth } from './auths';
import User from './models/User';
import Profesor from './models/Profesor';
import Estudiante from './models/Estudiante';

const MongoStore = require('connect-mongo');

dotenv.config();

const connString = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}`
  + '@kidspace.l3bfoxn.mongodb.net/KidSpace?retryWrites=true&w=majority';

mongoose.connect(connString);

const app = express();
const port = process.env.SERVER_PORT;

initPassport(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:3000', 'http://app.kidspace.live/', '*'],
  credentials: true,
}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  store: MongoStore.create({
    mongoUrl: connString,
    ttl: 7 * 24 * 60 * 60, // 7 dias
  }),
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  console.log(`${req.method}: ${req.url}`);
  return next();
});

app.post('/register', checkNotAuth, async (req, res) => {
  try {
    const {
      nombres, apellidos, tipo,
    } = req.body;
    let { username, password } = req.body;
    if (_.some(req.body, _.isNil)) {
      console.log(req.body);
      res.sendStatus(404);
    }

    if (tipo === 'estudiante') {
      password = crypto.randomBytes(48).toString('hex');
      let user;
      do {
        username = crypto.randomBytes(48).toString('hex');
        // eslint-disable-next-line no-await-in-loop
        user = await User.findOne({ username });
      } while (user);
      console.log({ username, password });
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const user = new User({
      nombres, apellidos, username, password: hashedPass, tipo,
    });
    await user.save();

    if (user.tipo === 'profesor') {
      const profesor = new Profesor({ uid: user._id });
      await profesor.save();
      res.sendStatus(200);
    } else if (user.tipo === 'estudiante') {
      const estudiante = new Estudiante({ uid: user._id });
      await estudiante.save();
      res.json({ username, password });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

app.get('/checkauth', (req, res) => {
  res.json({ auth: req.isAuthenticated() });
});

app.post('/login', checkNotAuth, passport.authenticate('local'), async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user?.tipo === 'estudiante') return res.sendStatus(403);
    res.json({
      username: user?.username,
      tipo: user?.tipo,
      nombres: user?.nombres,
      apellidos: user?.apellidos,
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

app.delete('/logout', checkAuth, (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    return res.sendStatus(200);
  });
});

app.use('/Profesor', checkAuth, ProfesorRouter);
app.use('/Curso', checkAuth, CursoRouter);
app.use('/Estudiante', checkAuth, EstudianteRouter);
app.use('/Apoderado', checkAuth, ApoderadoRouter);
app.use('/Activity', ActivityRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
