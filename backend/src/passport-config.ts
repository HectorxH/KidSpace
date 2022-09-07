import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import { PassportStatic } from 'passport';
import User from './models/User';

const LocalStrategy = passportLocal.Strategy;

async function getUser(username: string) {
  const user = await User.findOne({ username });
  return user;
}

async function authUser(username: string, password: string, done: Function) {
  const user = await getUser(username);
  if (user === null) {
    return done(null, false, { message: 'Usuario invalido' });
  }
  try {
    if (await bcrypt.compare(password, user.password)) {
      return done(null, user);
    }
    return done(null, false, { message: 'Contraseña incorrecta' });
  } catch (e) {
    console.log(e);
    return done(e);
  }
}

function initialize(passport : PassportStatic) {
  passport.use(new LocalStrategy({ usernameField: 'username' }, authUser));
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser(async (id, done) => done(null, await User.findById(id)));
}

export default initialize;
