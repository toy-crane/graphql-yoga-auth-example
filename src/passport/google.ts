import * as passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-token";
const googleOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET
};

const googleStrategyCallback = (accessToken, refreshToken, profile, done) =>
  done(null, {
    accessToken,
    refreshToken,
    profile
  });

passport.use(new GoogleStrategy(googleOptions, googleStrategyCallback));

export const authenticateGoogle = (req, res) => {
  const promise = new Promise<{ error?: any; data?: any; info?: any }>(
    (resolve, reject) => {
      return passport.authenticate(
        "google-token",
        { session: false },
        (error, data, info) => {
          if (error) {
            reject({ error });
          } else {
            resolve({ data, info });
          }
        }
      )(req, res);
    }
  );
  return promise;
};
