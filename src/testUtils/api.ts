import request from "supertest";
import server from "../server";
export const getApi = () =>
	request(server.getApp())
		.post("/graphql")
		.set("Content-Type", "application/json")
		.set("Accept", "application/json");
