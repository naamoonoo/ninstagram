// import { Options } from "graphql-yoga";
// import server from "./server";

// const startServer = async () => {
// 	const port = process.env.NODE_ENV === "test" ? "0" : "4000";
// 	const options: Options = {
// 		port: process.env.PORT || port,
// 		playground: "/playground",
// 		endpoint: "/graphql"
// 	};

// 	return server.start(options, () =>
// 		console.log(`'listening on http://localhost:${options.port}`)
// 	);
// };

// export default startServer();
// import { createConnection } from "typeorm";
// import connectionOptions from "./ormConfig";
import "dotenv/config";
import server from "./server";

server.listen();
