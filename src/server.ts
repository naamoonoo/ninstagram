import { ApolloServer, PubSub } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { execute, subscribe } from "graphql";
import helmet from "helmet";
import { createServer } from "http";
import logger from "morgan";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { decodeJWT } from "./middlewares";
import authRoutes from "./routes/authRoutes";
import prodRoutes from "./routes/prodRoutes";
import schema from "./schema";
import { JWT, SUBSCRIPTION_ENDPOINT } from "./types/constants";
import { openDBConn } from "./utils/databaseConn";
import { verifyJWT } from "./utils/jwt";
import passport from "./utils/passport";

const app = express();
const PORT = process.env.PORT || "4000";
const pubsub = new PubSub();

app.use(cors());
app.use(helmet());
app.use(logger("dev"));
app.use(passport.initialize());
app.use(decodeJWT);

authRoutes(app);
prodRoutes(app);

const graphqlServer = new ApolloServer({
	schema,
	context: async ({ req }) => {
		return { req, pubsub };
	},
	subscriptions: {
		path: SUBSCRIPTION_ENDPOINT
	}
});

graphqlServer.applyMiddleware({ app });

const listen = async () => {
	await openDBConn();

	const server = createServer(app);
	const getSubscriptionServer = () =>
		new SubscriptionServer(
			{
				execute,
				subscribe,
				schema,
				onConnect: async connectionParam => {
					const token = connectionParam[JWT];
					if (token) {
						const user = await verifyJWT(token);
						return { user, pubsub };
					}
					throw new Error("No jwt, Can't subscribe");
				}
			},
			{
				server
			}
		);

	return server.listen(PORT, () => {
		getSubscriptionServer();
		console.log(
			`🚀 Server ready at http://localhost:${PORT}${graphql.graphqlPath}`
		);
	});
};

export default {
	getApp: () => app,
	listen
};
