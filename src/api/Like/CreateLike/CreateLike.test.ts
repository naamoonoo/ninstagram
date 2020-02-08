import { Feed } from "../../../entities/Feed";
import { Like } from "../../../entities/Like";
import { User } from "../../../entities/User";
import { getApi } from "../../../testUtils/api";
import "../../../testUtils/database";
import { getQuery } from "../../../testUtils/getQuery";
import { JWT } from "../../../types/constants";
import { createJWT } from "../../../utils/jwt";

describe("[Like]CreateLike", () => {
	let api;
	let token;
	let user;
	let feed;

	beforeAll(async () => {
		user = await User.create({
			firstName: "test",
			lastName: "jest",
			email: "test@test.com",
			password: "test123!!"
		}).save();
		feed = await Feed.create({
			text: `test feed`,
			photo: "___",
			user
		}).save();
		token = createJWT(user.id);
	});

	beforeEach(() => {
		api = getApi().set(JWT, token);
	});

	const query = `mutation {
				CreateLike(
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
			.then(response => response.body.data.CreateLike);
		const { res, error } = response;
		expect(res).toBeTruthy();
		expect(error).toBeNull();
		const result = await Like.findOne({ ...variables });
		expect(result).not.toBeUndefined();
		expect(result).toMatchObject(variables);
		const updatedUser = await User.findOne(
			{ id: user.id },
			{ relations: ["likes"] }
		);
		expect(updatedUser!.likes).toHaveLength(1);
		expect(updatedUser!.likes[0]).toMatchObject(result!);
		const updatedFeed = await Feed.findOne(
			{ id: variables.feedId },
			{ relations: ["likes"] }
		);
		expect(updatedFeed!.likes).toHaveLength(1);
		expect(updatedFeed!.likes[0]).toMatchObject(result!);
	});
});
