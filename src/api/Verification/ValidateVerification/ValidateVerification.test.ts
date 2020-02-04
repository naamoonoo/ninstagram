import { Verification } from "../../../entities/Verification";
import { getApi } from "../../../testUtils/api";
import "../../../testUtils/database";
import { getQuery } from "../../../testUtils/getQuery";
import { EMAIL, PHONE } from "../../../types/constants";

describe("[Verification]ValidateVerification", () => {
	let api;

	beforeEach(() => {
		api = getApi();
	});

	const query = `mutation {
			ValidateVerification(key:$key payload:$payload ){
				res
				error
			}
		}
	`;

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
				query: getQuery(query, { key, payload })
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
				query: getQuery(query, { key, payload })
			})
			.expect(200)
			.then(response => response.body.data.ValidateVerification);
		const { res, error } = response;
		expect(res).toBeTruthy();
		expect(error).toBeNull();
	});
});
