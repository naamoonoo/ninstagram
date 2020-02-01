import { EMAIL, PHONE } from "../../../constants";
import { Verification } from "../../../entities/Verification";
import api from "../../../testUtils/api";
import "../../../testUtils/database";

describe("Test api RequestVerification", () => {
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
			payload: "+330652360378"
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
		const createdRequest = await Verification.findOne({ ...variables });
		expect(createdRequest).not.toBeUndefined();
		done();
	});

	it("EMAIL valid request", async done => {
		const variables = {
			type: EMAIL,
			payload: "jnam920329@gmail.com"
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
		const createdRequest = await Verification.findOne({ ...variables });
		expect(createdRequest).not.toBeUndefined();
		done();
	});
});
