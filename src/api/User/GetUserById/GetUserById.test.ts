import { User } from "../../../entities/User";
import { getApi } from "../../../testUtils/api";
import "../../../testUtils/database";
import { getQuery } from "../../../testUtils/getQuery";

describe("[User]GetUserById", () => {
	let api;
	let user;

	beforeAll(async () => {
		user = await User.create({
			password: "password",
			email: "email@email.com",
			firstName: "a",
			lastName: "b"
		}).save();
	});

	beforeEach(() => {
		api = getApi();
	});

	const query = `query {
				GetUserById(userId: $id){
					res
					error
				}
			}`;

	it("expect to pass", async () => {
		const variables = { id: user.id };
		const response = await api
			.send({ query: getQuery(query, variables) })
			.expect(200)
			.then(response => response.body.data.GetUserById);
		const { res, error } = response;
		expect(res).toBeTruthy();
		expect(error).toBeNull();
		const result = await User.findOne({ ...variables });
		expect(result).not.toBeUndefined();
	});
});
