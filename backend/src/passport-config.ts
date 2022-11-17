import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import { PassportStatic } from 'passport';
import User from './models/User';

const LocalStrategy = passportLocal.Strategy;

function initialize(passport : PassportStatic) {
  passport.use(new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'Usuario invalido' });
      }
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      }
      return done(null, false, { message: 'Contraseña incorrect' });
    } catch (e) {
      console.log(e);
      return done(e);
    }
  }));
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      return done(null, user);
    } catch (e) {
      console.log(e);
      return done(e);
    }
  });
}

export default initialize;
