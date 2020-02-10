import { User } from "../../../entities/User";
import { Verification } from "../../../entities/Verification";
import { getApi } from "../../../testUtils/api";
import "../../../testUtils/database";
import { getQuery } from "../../../testUtils/getQuery";
import { EMAIL, JWT, PHONE } from "../../../types/constants";
import { createJWT } from "../../../utils/jwt";

describe("[Verification]ValidateVerification", () => {
	let api;
	let token;
	let user;

	beforeAll(async () => {
		user = await User.create({
			firstName: "test",
			email: "test@test.com",
			password: "Test123!!"
		}).save();
		token = createJWT(user.id);
	});

	beforeEach(() => {
		api = getApi().set(JWT, token);
	});

	const query = `mutation {
			ValidateVerification(key:$key payload:$payload){
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
		const updatedUser = await User.findOne({ id: user.id });
		expect(updatedUser?.isEmailVerified).toBeTruthy();
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
		const updatedUser = await User.findOne({ id: user.id });
		expect(updatedUser?.isPhoneVerified).toBeTruthy();
	});
});
