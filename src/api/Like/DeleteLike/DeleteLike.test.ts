import { JWT } from "../../../constants";
import { Feed } from "../../../entities/Feed";
import { Like } from "../../../entities/Like";
import { User } from "../../../entities/User";
import { getApi } from "../../../testUtils/api";
import "../../../testUtils/database";
import { getQuery } from "../../../testUtils/getQuery";
import { createJWT } from "../../../utils/jwt";

describe("[Like]DeleteLike", () => {
	let api;
	let token;
	let user;
	let feed;

	beforeAll(async () => {
		user = await User.create({
			firstName: "test",
			lastName: "jest",
			email: "test@test.com",
			password: "test"
		}).save();
		feed = await Feed.create({
			text: `test feed`,
			photo: "___",
			user
		}).save();
		await Like.create({ user, feed }).save();
		token = createJWT(user.id);
	});

	beforeEach(() => {
		api = getApi().set(JWT, token);
	});

	const query = `mutation {
				DeleteLike(
					feedId: $feedId
				){
					res
					error
				}
			}`;

	it("expect to pass", async () => {
		const variables = { feedId: feed.id };
		const response = await api
			.send({ query: getQuery(query, variables) })
			.expect(200)
			.then(response => response.body.data.DeleteLike);
		const { res, error } = response;
		expect(res).toBeTruthy();
		expect(error).toBeNull();
		const result = await Like.findOne({ ...variables });
		expect(result).toBeUndefined();
		const updatedUser = await User.findOne(
			{ id: user.id },
			{ relations: ["likes"] }
		);
		expect(updatedUser!.likes).toHaveLength(0);
		const updatedFeed = await Feed.findOne(
			{ id: variables.feedId },
			{ relations: ["likes"] }
		);
		expect(updatedFeed!.likes).toHaveLength(0);
	});
});
