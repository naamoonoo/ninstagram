import { User } from "../../../entities/User";
import { getApi } from "../../../testUtils/api";
import "../../../testUtils/database";
import { getQuery } from "../../../testUtils/getQuery";
import { createJWT } from "../../../utils/jwt";
import { NON_EXISTED, WRONG_PASSWORD } from "./Errors";

describe("[User]EmailSignIn", () => {
	let api;

	beforeEach(() => {
		api = getApi();
	});

	const query = `
		mutation {
			EmailSignIn(
				email: $email
				password: $password
			) {
				res
				error
				token
			}
		}`;

	it("should pass valid sign in case", async () => {
		const variables = {
			password: "password",
			email: "email@email.com"
		};
		const user = await User.create({
			...variables,
			firstName: "a",
			lastName: "b"
		}).save();
		const response = await api
			.send({ query: getQuery(query, variables) })
			.expect(200)
			.then(response => response.body.data.EmailSignIn);
		const { res, error, token } = response;
		expect(res).toBeTruthy();
		expect(error).toBeNull();
		expect(token).not.toBeNull();
		expect(token.split(".")[0]).toBe(createJWT(user!.id).split(".")[0]);
		expect(user!.password).not.toBe(variables.password);
	});

	it("should fail,  wrong password case", async () => {
		const variables = {
			password: "wrong_password",
			email: "email@email.com"
		};
		const response = await api
			.send({ query: getQuery(query, variables) })
			.expect(200)
			.then(response => response.body.data.EmailSignIn);
		const { res, error, token } = response;
		expect(res).toBeFalsy();
		expect(error).toBe(WRONG_PASSWORD);
		expect(token).toBeNull();
	});

	it("should fail, non existed user case", async () => {
		const variables = {
			password: "password",
			email: "non_exited@email.com"
		};
		const response = await api
			.send({ query: getQuery(query, variables) })
			.expect(200)
			.then(response => response.body.data.EmailSignIn);
		const { res, error, token } = response;
		expect(res).toBeFalsy();
		expect(error).toBe(NON_EXISTED);
		expect(token).toBeNull();
	});
});
