import "./env";
import { GraphQLServer } from "graphql-yoga";
import schema from "./schema";
import * as logger from "morgan";

const PORT = process.env.PORT;
const server = new GraphQLServer({
  schema,
  context: async (req, res) => ({
    req,
    res
  })
});
server.start({ port: PORT }, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
server.express.use(logger("dev"));
