import { Feed } from "../../../entities/Feed";
import { User } from "../../../entities/User";
import { getApi } from "../../../testUtils/api";
import "../../../testUtils/database";
import { getQuery } from "../../../testUtils/getQuery";
import { JWT } from "../../../types/constants";
import { createJWT } from "../../../utils/jwt";

describe("[Feed]UpdateFeed", () => {
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
				UpdateFeed(
					feedId: $feedId
					text: $text
				){
					res
					error
				}
			}`;

	it("expect to pass", async () => {
		const feedCreated = await Feed.create({
			text: `test feed`,
			user,
			photo: "______"
		}).save();

		const variables = {
			feedId: feedCreated.id,
			text: "text Updated"
		};

		const response = await api
			.send({ query: getQuery(query, variables) })
			.expect(200)
			.then(response => response.body.data.UpdateFeed);
		const { res, error } = response;
		expect(res).toBeTruthy();
		expect(error).toBeNull();
		const result = await Feed.findOne({ id: feedCreated.id });
		expect(result).not.toBeUndefined();
		expect(result!.text).toBe(variables.text);
	});
});
