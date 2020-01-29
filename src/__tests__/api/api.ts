import { Options } from "graphql-yoga";
import request from "supertest";
import server from "../../server";
import { openDBConn } from "../../utils/databaseConn";

const getApi = async (): Promise<any> => {
	const options: Options = {
		port: 0,
		playground: "/playground",
		endpoint: "/graphql"
	};

	await openDBConn();

	const app = await server.start(options);
	const api = request(app)
		.post("/graphql")
		.set("Content-Type", "application/json")
		.set("Accept", "application/json");
	return api;
};

export default getApi;
