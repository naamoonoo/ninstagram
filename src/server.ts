import { ApolloServer, PubSub } from "apollo-server-express";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import logger from "morgan";
import { decodeJWT } from "./middlewares";
// import path from "path";
import schema from "./schema";
import { openDBConn } from "./utils/databaseConn";

const app = express();

app.use(cors());
app.use(helmet());
app.use(logger("dev"));
app.use(decodeJWT);

const pubsub = new PubSub();
// this.pubSub.ee.setMaxListeners(99); // only for dev, b/c of memory leak ???

const server = new ApolloServer({
	schema,
	context: ({ req, connection: { context = null } = {} }) => {
		return { context, req, pubsub };
	}
});

server.applyMiddleware({ app });

const listen = async () => {
	await openDBConn();

	const PORT =
		process.env.PORT || process.env.NODE_ENV === "test" ? "0" : "4000";

	return app.listen(PORT, () => {
		console.log(
			`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
		);
	});
};

export default {
	getApp: () => app,
	listen
};
