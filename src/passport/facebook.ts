import * as passport from "passport";
import * as FacebookStrategy from "passport-facebook-token";
const facebookOptions = {
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  fbGraphVersion: "v6.0"
};

// FACEBOOK STRATEGY
const FacebookTokenStrategyCallback = (
  accessToken,
  refreshToken,
  profile,
  done
) =>
  done(null, {
    accessToken,
    refreshToken,
    profile
  });

passport.use(
  new FacebookStrategy(facebookOptions, FacebookTokenStrategyCallback)
);

export const authenticateFacebook = (req, res) =>
  new Promise<{ error?: any; data?: any; info?: any }>((resolve, reject) => {
    return passport.authenticate(
      "facebook-token",
      { session: false },
      (error, data, info) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ data, info });
        }
      }
    )(req, res);
  });
