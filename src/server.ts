import { ApolloServer, PubSub } from "apollo-server-express";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { createServer } from "http";
import logger from "morgan";
import path from "path";
import { decodeJWT } from "./middlewares";
import authRoutes from "./routes/authRoutes";
import schema from "./schema";
import { getSubscriptionServer } from "./subscription";
import { SUBSCRIPTION_ENDPOINT } from "./types/constants";
import { openDBConn } from "./utils/databaseConn";
import passport from "./utils/passport";

const app = express();
const PORT = process.env.PORT || "4000";
const pubsub = new PubSub();

app.use(cors());
app.use(helmet());
app.use(logger("dev"));
app.use(passport.initialize());
app.use(decodeJWT);
app.use(express.static(path.join(__dirname, "client/build")));

const graphqlServer = new ApolloServer({
	playground: true,
	schema,
	context: async ({ req }) => {
		return { req, pubsub };
	},
	subscriptions: {
		path: SUBSCRIPTION_ENDPOINT
	}
});

graphqlServer.applyMiddleware({ app });

authRoutes(app);
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const listen = async () => {
	await openDBConn();

	const server = createServer(app);

	server.listen(PORT, () => {
		getSubscriptionServer(server, pubsub);
		console.log(
			`🚀 Server ready at http://localhost:${PORT}${graphqlServer.graphqlPath}`
		);
	});
};

export default {
	getApp: () => app,
	listen
};
