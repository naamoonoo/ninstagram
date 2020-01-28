import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import path from "path";

const allTypes: GraphQLSchema[] = fileLoader(
	path.join(__dirname, "./api/**/*.graphql")
);

const allResolvers: any[] = fileLoader(
	path.join(__dirname, "./api/**/*.resolvers.ts")
);

const typeDefs = mergeTypes(allTypes);
const resolvers = mergeResolvers(allResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
