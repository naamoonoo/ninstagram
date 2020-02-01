import request from "supertest";
import { EMAIL, PHONE } from "../../../constants";
import { Verification } from "../../../entities/Verification";
// import api from "../../../testUtils/api";
import server from "../../../server";
import "../../../testUtils/database";
const app = server.getApp();

describe("[api]RequestVerification", () => {
	let api;

	beforeEach(() => {
		api = request(app)
			.post("/graphql")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json");
	});

	const getQuery = (type: string, payload: string) => {
		return `mutation {
			RequestVerification(type:"${type}" payload:"${payload}" ){
				res
				error
			}
		}`;
	};

	it("PHONE valid request", async done => {
		const variables = {
			type: PHONE,
			payload: "+33120104124"
		};
		const { type, payload } = variables;

		const response = await api
			.send({
				query: getQuery(type, payload)
			})
			.expect(200)
			.then(response => response.body.data.RequestVerification);
		const { res, error } = response;
		expect(res).toBeTruthy();
		expect(error).toBeNull();
		done();
		const createdRequest = await Verification.findOne({ ...variables });
		expect(createdRequest).not.toBeUndefined();
		done();
	});

	it("EMAIL valid request", async done => {
		const variables = {
			type: EMAIL,
			payload: "RequestVerification@gmail.com"
		};
		const { type, payload } = variables;
		const response = await api
			.send({
				query: getQuery(type, payload)
			})
			.expect(200)
			.then(response => {
				console.log(response.body.data);
				return response.body.data.RequestVerification;
			});
		const { res, error } = response;
		expect(res).toBeTruthy();
		expect(error).toBeNull();
		done();
		const createdRequest = await Verification.findOne({ ...variables });
		expect(createdRequest).not.toBeUndefined();
		done();
	});
});
