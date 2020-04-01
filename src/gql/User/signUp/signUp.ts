import * as bcrypt from "bcryptjs";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    signUp: async (parent, { name, username, password, email }, ctx, info) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      return await prisma.createUser({
        name,
        username,
        email,
        password: hashedPassword
      });
    }
  }
};
