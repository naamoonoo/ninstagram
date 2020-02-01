import { EMAIL, PHONE } from "../../../constants";
import { Verification } from "../../../entities/Verification";
import api from "../../../testUtils/api";
import "../../../testUtils/database";

describe("Test api RequestVerification", () => {
	const getQuery = (key: string, payload: string) => {
		return `mutation {
			ValidateVerification(key:"${key}" payload:"${payload}" ){
				res
				error
			}
		}`;
	};

	it("PHONE valid verification", async done => {
		const variables = {
			type: PHONE,
			payload: "+330652360378"
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
		done();
	});

	it("EMAIL valid request", async done => {
		const variables = {
			type: EMAIL,
			payload: "jnam920329@gmail.com"
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
		done();
	});
});
