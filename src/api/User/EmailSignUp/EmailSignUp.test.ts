import { User } from "../../../entities/User";
import { getApi } from "../../../testUtils/api";
import "../../../testUtils/database";
import { getQuery } from "../../../testUtils/getQuery";
import { createJWT } from "../../../utils/jwt";
import { EXISTED } from "./Errors";

describe("[User]EmailSignUp", () => {
	let api;

	beforeEach(() => {
		api = getApi();
	});

	const query = `mutation {
			EmailSignUp(
				firstName: $firstName
				password: $password
				email: $email
			) {
				res
				error
				token
			}
		}`;

	it("should pass with valid data", async () => {
		const variables = {
			firstName: "firstName",
			password: "$passworD12!",
			email: "email@email.com"
		};
		const response = await api
			.send({ query: getQuery(query, variables) })
			.expect(200)
			.then(response => response.body.data.EmailSignUp);
		const { res, error, token } = response;
		expect(res).toBeTruthy();
		expect(error).toBeNull();
		expect(token).not.toBeNull();
		const { password: passwordInput, ...otherVariables } = variables;
		const user = await User.findOne({ ...otherVariables });
		expect(user).not.toBeUndefined();
		expect(token.split(".")[0]).toBe(createJWT(user!.id).split(".")[0]);
		expect(user!.password).not.toBe(passwordInput);
	});

	it("should fail, existed user case", async () => {
		const variables = {
			firstName: "firstName",
			password: "$passworD12!",
			email: "email@email.com"
		};
		const response = await api
			.send({ query: getQuery(query, variables) })
			.expect(200)
			.then(response => response.body.data.EmailSignUp);
		const { res, error, token } = response;
		expect(res).toBeFalsy();
		expect(error).toBe(EXISTED);
		expect(token).toBeNull();
	});
});
