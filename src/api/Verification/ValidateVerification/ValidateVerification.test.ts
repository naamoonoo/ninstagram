import request from "supertest";
import { EMAIL, PHONE } from "../../../constants";
import { Verification } from "../../../entities/Verification";
// import api from "../../../testUtils/api";
import server from "../../../server";
import "../../../testUtils/database";
const app = server.getApp();

const getQuery = (key: string, payload: string) => {
	return `mutation {
		ValidateVerification(key:"${key}" payload:"${payload}" ){
			res
			error
		}
	}`;
};

describe("[Verification]ValidateVerification", () => {
	let api;

	beforeEach(() => {
		api = request(app)
			.post("/graphql")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json");
	});
	it("EMAIL validate request", async () => {
		const variables = {
			type: EMAIL,
			payload: "ValidateVerification@gmail.com"
		};
		const createdVerification = await Verification.create({
			...variables
		}).save();
		const { key, payload } = createdVerification;

		const response = await api
			.send({
				query: getQuery(key, payload)
			})
			.expect(200)
			.then(response => response.body.data.ValidateVerification);
		const { res, error } = response;

		expect(res).toBeTruthy();
		expect(error).toBeNull();
	});

	it("PHONE validate verification", async () => {
		const variables = {
			type: PHONE,
			payload: "+330053"
		};
		const createdVerification = await Verification.create({
			...variables
		}).save();
		const { key, payload } = createdVerification;

		const response = await api
			.send({
				query: getQuery(key, payload)
			})
			.expect(200)
			.then(response => response.body.data.ValidateVerification);
		const { res, error } = response;
		expect(res).toBeTruthy();
		expect(error).toBeNull();
	});
});
