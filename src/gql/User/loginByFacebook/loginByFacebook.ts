import { authenticateFacebook } from "../../../passport/facebook";
import { prisma } from "../../../../generated/prisma-client";
import generateJWT from "../../../utils/auth/generateJWT";

export default {
  Mutation: {
    loginByFacebook: async (_, { accessToken }, { req, res }) => {
      req.body = {
        ...req.body,
        access_token: accessToken
      };
      let user: any;
      const {
        data: { profile }
      } = await authenticateFacebook(req, res);
      const email = profile.emails[0].value;
      const name = profile.displayName;
      const userExists = await prisma.$exists.user({
        email
      });
      if (userExists) {
        user = await prisma.user({ email });
      } else {
        user = await prisma.createUser({ email, name });
      }
      const token = generateJWT(user.id, user.email);
      return {
        user,
        token
      };
    }
  }
};
