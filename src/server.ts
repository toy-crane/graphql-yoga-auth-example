import "./env";
import { GraphQLServer } from "graphql-yoga";
import schema from "./schema";
import * as logger from "morgan";
import getUser from "./utils/auth/getUser";
import { permissions } from "./permissions/index";
import * as passport from "passport";

const PORT = process.env.PORT;
passport.initialize();
const server = new GraphQLServer({
  schema,
  middlewares: [permissions],
  context: async (req, res) => ({
    req,
    res,
    user: await getUser(req, res)
  })
});
server.start({ port: PORT }, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
server.express.use(logger("dev"));
