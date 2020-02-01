import request from "supertest";
import server from "../server";

const app = server.getApp();

export default request(app)
	.post("/graphql")
	.set("Content-Type", "application/json")
	.set("Accept", "application/json");
