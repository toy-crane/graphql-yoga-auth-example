import * as bcrypt from "bcryptjs";
import { prisma } from "../../../../generated/prisma-client";
import * as jwt from "jsonwebtoken";

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

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "3d"
        }
      );
      return { token, user };
    }
  }
};
