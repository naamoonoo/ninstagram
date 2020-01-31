import request from "supertest";
import server from "../../server";
import { closeDBConn } from "../../utils/databaseConn";

const app = server.getApp();

beforeAll(async () => {
	await server.listen();
	console.log("is server running?");
});

afterAll(async () => {
	await closeDBConn();
});

export default request(app)
	.post("/graphql")
	.set("Content-Type", "application/json")
	.set("Accept", "application/json");
