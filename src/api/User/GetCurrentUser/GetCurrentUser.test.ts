import { JWT } from "../../../constants";
import { User } from "../../../entities/User";
import { getApi } from "../../../testUtils/api";
import "../../../testUtils/database";
import { getQuery } from "../../../testUtils/getQuery";
// import { NO_JWT_ERROR } from "../../../utils/authProtector";
import { createJWT } from "../../../utils/jwt";

describe("[User]GetCurrentUser", () => {
	let api;
	let token;

	const variables = {
		email: "email@email.com",
		firstName: "a",
		lastName: "b"
	};

	beforeAll(async () => {
		const userCreated = await User.create({
			...variables,
			password: "password"
		}).save();
		token = createJWT(userCreated!.id);
	});

	beforeEach(() => {
		api = getApi();
	});

	const query = `query {
		GetCurrentUser{
				res
				error
				user {
					id
					email
					firstName
					lastName
				}
			}
		}`;

	it("should pass, jwt has been set in header", async () => {
		const response = await api
			.set(JWT, token)
			.send({ query: getQuery(query) })
			.expect(200)
			.then(response => response.body.data.GetCurrentUser);
		const { res, error, user } = response;
		expect(res).toBeTruthy();
		expect(error).toBeNull();
		expect(user).not.toBeUndefined();
		expect(user).toMatchObject(variables);
	});

	it("should fail, no jwt", async () => {
		const response = await api
			.send({ query: getQuery(query) })
			.expect(200)
			.then(response => response.body.data);
		expect(response).toBeNull();
	});
});
