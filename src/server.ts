import { resolve } from "path";
import { config } from "dotenv";
import { GraphQLServer } from "graphql-yoga";

config({ path: resolve(__dirname, "../.env") });
const PORT = process.env.PORT;
const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
	Query: {
		hello: (_, { name }) => `Hello ${name || "World"}`
	}
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start({ port: PORT }, () =>
	console.log(`Server is running on http://localhost:${PORT}`)
);
