// // import { Options } from "graphql-yoga";
// // import server from "./server";

// // const startServer = async () => {
// // 	const port = process.env.NODE_ENV === "test" ? "0" : "4000";
// // 	const options: Options = {
// // 		port: process.env.PORT || port,
// // 		playground: "/playground",
// // 		endpoint: "/graphql"
// // 	};

// // 	return server.start(options, () =>
// // 		console.log(`'listening on http://localhost:${options.port}`)
// // 	);
// // };

// // export default startServer();
// // import { createConnection } from "typeorm";
// // import connectionOptions from "./ormConfig";
// import "dotenv/config";
// import server from "./server";

// server.listen();

import dotenv from "dotenv";
dotenv.config();

import { Options } from "graphql-yoga";
import server from "./server";
import { JWT, SUBSCRIPTION_ENDPOINT } from "./types/constants";
import { openDBConn } from "./utils/databaseConn";
import { verifyJWT } from "./utils/jwt";

const PORT = process.env.PORT || 4000;
const appOptions: Options = {
	port: PORT,
	playground: "/playground",
	endpoint: "/graphql",
	subscriptions: {
		path: SUBSCRIPTION_ENDPOINT,
		onConnect: async connectionParam => {
			const token = connectionParam[JWT];
			if (token) {
				const user = await verifyJWT(token);
				return {
					user
				};
			}

			throw new Error("No jwt, Can't subscribe");
		}
	}
};

openDBConn().then(() => {
	server.start(appOptions, () =>
		console.log(`listening on http://localhost:${PORT}`)
	);
});
