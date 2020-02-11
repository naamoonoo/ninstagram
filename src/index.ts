import "dotenv/config";
import server from "./server";

server.listen();

// import dotenv from "dotenv";
// dotenv.config();

// import { Options } from "graphql-yoga";
// import app from "./server";

// import { JWT } from "./types/constants";
// import { verifyJWT } from "./utils/JWT";
// import { openDBConn } from "./utils/databaseConn";

// export const PORT: number | string = process.env.PORT || 4000;
// export const PLAYGROUND: string = "/playground";
// export const GRAPHQL_ENDPOINT: string = "/graphql";
// export const SUBSCRIPTION_ENDPOINT: string = "/subscription";

// const appOptions: Options = {
// 	port: PORT,
// 	playground: PLAYGROUND,
// 	endpoint: GRAPHQL_ENDPOINT,
// 	subscriptions: {
// 		path: SUBSCRIPTION_ENDPOINT,
// 		onConnect: async connectionParam => {
// 			const token = connectionParam[JWT];
// 			if (token) {
// 				const user = await verifyJWT(token);
// 				return {
// 					user
// 				};
// 			}

// 			throw new Error("No jwt, Can't subscribe");
// 		}
// 	}
// };

// console.log(process.env.NODE_ENV);
// openDBConn().then(() => {
// 	app.start(appOptions, () =>
// 		console.log(`listening on http://localhost:${PORT}`)
// 	);
// });
