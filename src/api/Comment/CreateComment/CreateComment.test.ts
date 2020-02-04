import { Comment } from "../../../entities/Comment";
import { Feed } from "../../../entities/Feed";
import { User } from "../../../entities/User";
import { getApi } from "../../../testUtils/api";
import "../../../testUtils/database";
import { getQuery } from "../../../testUtils/getQuery";
import { JWT } from "../../../types/constants";
import { createJWT } from "../../../utils/jwt";

describe("[Comment]CreateComment", () => {
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
		token = createJWT(user.id);
	});

	beforeEach(() => {
		api = getApi().set(JWT, token);
	});

	const query = `mutation {
				CreateComment(
					feedId: $feedId
					comment: $comment
				){
					res
					error
				}
			}`;

	it("expect to pass", async () => {
		const variables = {
			feedId: feed.id,
			comment: "hello it's comment test"
		};
		const response = await api
			.send({ query: getQuery(query, variables) })
			.expect(200)
			.then(response => response.body.data.CreateComment);
		const { res, error } = response;
		expect(res).toBeTruthy();
		expect(error).toBeNull();
		const result = await Comment.findOne({ ...variables });
		expect(result).not.toBeUndefined();
	});
});
