import { resolve } from "path";
import { config } from "dotenv";
import { GraphQLServer } from "graphql-yoga";
import schema from "./schema";
import * as logger from "morgan";

config({ path: resolve(__dirname, "../.env") });
const PORT = process.env.PORT;

const server = new GraphQLServer({ schema });
server.start({ port: PORT }, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
server.express.use(logger("dev"));
