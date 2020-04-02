import * as passport from "passport";
import {
  Strategy as JWTStrategy,
  ExtractJwt,
  VerifiedCallback
} from "passport-jwt";
import { prisma } from "../../generated/prisma-client";

const jwt_options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const verifyUser: VerifiedCallback = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
};

passport.use(new JWTStrategy(jwt_options, verifyUser));

export const authenticateJWT = ({ request: req }, res) => {
  return new Promise((resolve, reject) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
      if (err) {
        reject(new Error(err));
      }
      resolve(user);
    })(req, res);
  });
};
