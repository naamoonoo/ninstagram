import { Options } from "graphql-yoga";
import server from "./server";
import { openDBConn } from "./utils/databaseConn";

const startServer = async () => {
	const options: Options = {
		port: process.env.PORT || "4000",
		playground: "/playground",
		endpoint: "/graphql"
	};

	await openDBConn();
	return server.start(options);
};

startServer();
