import * as bcrypt from "bcryptjs";
import { prisma } from "../../../../generated/prisma-client";
import generateJWT from "../../../utils/auth/generateJWT";

export default {
  Mutation: {
    login: async (parent, { password, email }, ctx, info) => {
      const user = await prisma.user({
        email
      });
      if (!user) {
        throw new Error("Wrong password or Email");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error("Wrong password or Email");
      }
      const token = generateJWT(user.id, user.email);
      return { token, user };
    }
  }
};
