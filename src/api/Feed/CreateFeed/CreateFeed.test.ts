import { JWT } from "../../../constants";
import { Feed } from "../../../entities/Feed";
import { User } from "../../../entities/User";
import { getApi } from "../../../testUtils/api";
import "../../../testUtils/database";
import { getQuery } from "../../../testUtils/getQuery";
import { createJWT } from "../../../utils/jwt";

describe("[Feed]CreateFeed", () => {
	let api;
	let token;

	beforeAll(async () => {
		const user = await User.create({
			firstName: "test",
			lastName: "jest",
			email: "test@test.com",
			password: "test"
		}).save();
		token = createJWT(user.id);
	});

	beforeEach(() => {
		api = getApi().set(JWT, token);
	});

	const query = `mutation {
			CreateFeed(
				photo: $photo
				text: $text
			) {
				res
				error
			}
		}`;

	it("expect to pass", async () => {
		const variables = { photo: "", text: "" };
		const response = await api
			.send({ query: getQuery(query, variables) })
			.expect(200)
			.then(response => response.body.data.CreateFeed);
		const { res, error } = response;
		expect(res).toBeTruthy();
		expect(error).toBeNull();
		const result = await Feed.findOne({ ...variables });
		expect(result).not.toBeUndefined();
		expect(result).toMatchObject(variables);
	});
});