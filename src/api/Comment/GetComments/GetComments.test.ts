import { Comment } from "../../../entities/Comment";
import { Feed } from "../../../entities/Feed";
import { User } from "../../../entities/User";
import { getApi } from "../../../testUtils/api";
import "../../../testUtils/database";
import { getQuery } from "../../../testUtils/getQuery";
import { JWT } from "../../../types/constants";
import { createJWT } from "../../../utils/jwt";

describe("[Comment]GetComments", () => {
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
		await Comment.create({
			comment: "test comment",
			user,
			feed
		}).save();
		token = createJWT(user.id);
	});

	beforeEach(() => {
		api = getApi().set(JWT, token);
	});

	const query = `query {
		GetComments(feedId: $feedId){
			res
			error
			comments{
				id
				comment
			}
		}
	}`;

	it("expect to pass", async () => {
		const variables = { feedId: feed.id };
		const response = await api
			.send({ query: getQuery(query, variables) })
			.expect(200)
			.then(response => response.body.data.GetComments);
		const { res, error, comments } = response;
		expect(res).toBeTruthy();
		expect(error).toBeNull();
		expect(comments).toHaveLength(1);
	});
});
