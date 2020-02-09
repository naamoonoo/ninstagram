import { User } from "../../../entities/User";
import { getApi } from "../../../testUtils/api";
import "../../../testUtils/database";
import { getQuery } from "../../../testUtils/getQuery";
import { JWT } from "../../../types/constants";
import { createJWT } from "../../../utils/jwt";

describe("[User]UpdateUser", () => {
	let api;
	let token;

	beforeAll(async () => {
		const user = await User.create({
			firstName: "test",
			email: "test@test.com",
			password: "Test123!!"
		}).save();
		token = createJWT(user.id);
	});

	beforeEach(() => {
		api = getApi().set(JWT, token);
	});

	const query = ` mutation {
				UpdateUser(email: $email){
					res
					error
				}
			}`;

	it("expect to pass", async () => {
		const variables = { email: "hello@hello.com" };
		const response = await api
			.send({ query: getQuery(query, variables) })
			.expect(200)
			.then(response => response.body.data.UpdateUser);
		const { res, error } = response;
		expect(res).toBeTruthy();
		expect(error).toBeNull();
		const result = await User.findOne({ ...variables });
		expect(result).not.toBeUndefined();
		expect(result).toMatchObject(variables);
	});
});
