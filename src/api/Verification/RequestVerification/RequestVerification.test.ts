import { EMAIL, PHONE } from "../../../constants";
import { Verification } from "../../../entities/Verification";
import { getApi } from "../../../testUtils/api";
import "../../../testUtils/database";
import { getQuery } from "../../../testUtils/getQuery";

describe("[api]RequestVerification", () => {
	let api;

	beforeEach(() => {
		api = getApi();
	});

	const query = `mutation {
			RequestVerification(type: $type payload:$payload ){
				res
				error
			}
		}`;

	it("PHONE valid request", async done => {
		const variables = {
			type: PHONE,
			payload: "+33120104124"
		};

		const response = await api
			.send({
				query: getQuery(query, variables)
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
			payload: "RequestVerification@gmail.com"
		};
		const response = await api
			.send({
				query: getQuery(query, variables)
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
