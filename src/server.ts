// import { ApolloServer, PubSub } from "apollo-server-express";
// import cors from "cors";
// import express from "express";
// import { execute, subscribe } from "graphql";
// import helmet from "helmet";
// import { createServer } from "http";
// import logger from "morgan";
// // import path from "path";
// import { SubscriptionServer } from "subscriptions-transport-ws";
// import { decodeJWT } from "./middlewares";
// import authRoutes from "./routes/authRoutes";
// // import prodRoutes from "./routes/prodRoutes";
// import schema from "./schema";
// import { JWT, SUBSCRIPTION_ENDPOINT } from "./types/constants";
// import { openDBConn } from "./utils/databaseConn";
// import { verifyJWT } from "./utils/jwt";
// import passport from "./utils/passport";
// const app = express();
// const PORT = process.env.PORT || "4000";
// const pubsub = new PubSub();

// app.use(cors());
// app.use(helmet());
// app.use(logger("dev"));
// app.use(passport.initialize());
// app.use(decodeJWT);
// // app.use(express.static(path.join(__dirname, "client/build")));

// authRoutes(app);
// // app.get("/*", (req, res) => {
// // 	res.sendFile(path.join(__dirname, "client/build/index.html"));
// // });
// // prodRoutes(app);

// const graphqlServer = new ApolloServer({
// 	playground: true,
// 	schema,
// 	context: async ({ req }) => {
// 		return { req, pubsub };
// 	},
// 	subscriptions: {
// 		path: SUBSCRIPTION_ENDPOINT
// 	}
// });

// graphqlServer.applyMiddleware({ app });

// const listen = async () => {
// 	await openDBConn();

// 	const server = createServer(app);
// 	const getSubscriptionServer = () =>
// 		new SubscriptionServer(
// 			{
// 				execute,
// 				subscribe,
// 				schema,
// 				onConnect: async connectionParam => {
// 					const token = connectionParam[JWT];
// 					if (token) {
// 						const user = await verifyJWT(token);
// 						return { user, pubsub };
// 					}
// 					throw new Error("No jwt, Can't subscribe");
// 				}
// 			},
// 			{
// 				server
// 			}
// 		);

// 	return server.listen(PORT, () => {
// 		getSubscriptionServer();
// 		console.log(
// 			`🚀 Server ready at http://localhost:${PORT}${graphqlServer.graphqlPath}`
// 		);
// 	});
// };

// export default {
// 	getApp: () => app,
// 	listen
// };

import cors from "cors";
// import express from "express";
import { GraphQLServer, PubSub } from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
// import path from "path";
import { decodeJWT } from "./middlewares";
import schema from "./schema";

class App {
	public app: GraphQLServer;
	public pubSub: any;

	constructor() {
		this.pubSub = new PubSub();
		this.pubSub.ee.setMaxListeners(99); // only for dev, b/c of memory leak
		this.app = new GraphQLServer({
			schema,
			context: req => {
				const { connection: { context = null } = {} } = req;
				return {
					req: req.request,
					pubSub: this.pubSub,
					context
				};
			}
		});
		this.middlewares();
		// this.app.get("*", (req, res) => {
		// 	res.sendFile(path.join(__dirname + "/client/build/index.html"));
		// });
	}

	// Anything that doesn't match the above, send back index.html

	private middlewares = (): void => {
		this.app.express.use(cors());
		this.app.express.use(logger("dev"));
		this.app.express.use(helmet());
		this.app.express.use(decodeJWT);
		// this.app.express.use(
		// 	express.static(path.join(__dirname, "client/build"))
		// );
	};

	// custum middle ware verify jwt
	// private jwt = async (req, res, next): Promise<void> => {
	// 	const token = req.get(JWT);
	// 	if (token) {
	// 		const user = await verifyJWT(token);
	// 		req.user = user;
	// 	}
	// 	next();
	// };
}

export default new App().app;
