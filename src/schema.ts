import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import * as path from "path";

const allTypes = fileLoader(path.join(__dirname, "/gql/**/*.gql"));
const allResolvers = fileLoader(path.join(__dirname, "/gql/**/*.ts"));
const schema = makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers)
});

export default schema;
