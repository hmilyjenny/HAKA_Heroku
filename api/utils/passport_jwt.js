import serverConfig from '../../config';
import Tb_User from '../models/user';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

export function tokenCheck (passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = serverConfig.token.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    Tb_User.findOne({id: jwt_payload.id}, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        //done(null, JSON.stringify(user));
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
}
