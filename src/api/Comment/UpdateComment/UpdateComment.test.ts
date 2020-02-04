import { Comment } from "../../../entities/Comment";
import { Feed } from "../../../entities/Feed";
import { User } from "../../../entities/User";
import { getApi } from "../../../testUtils/api";
import "../../../testUtils/database";
import { getQuery } from "../../../testUtils/getQuery";
import { JWT } from "../../../types/constants";
import { createJWT } from "../../../utils/jwt";

describe("[Comment]UpdateComment", () => {
	let api;
	let token;
	let user;
	let feed;
	let comment;

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
		comment = await Comment.create({
			comment: "test comment",
			user,
			feed
		}).save();
		token = createJWT(user.id);
	});

	beforeEach(() => {
		api = getApi().set(JWT, token);
	});

	const query = `mutation {
				UpdateComment(
					commentId: $commentId
					comment: $comment
				){
					res
					error
				}
			}`;

	it("expect to pass", async () => {
		const variables = { commentId: comment.id, comment: "updated comment" };
		const response = await api
			.send({ query: getQuery(query, variables) })
			.expect(200)
			.then(response => response.body.data.UpdateComment);
		const { res, error } = response;
		expect(res).toBeTruthy();
		expect(error).toBeNull();
		const result = await Comment.findOne({ ...variables });
		expect(result).not.toBeUndefined();
		expect(result!.comment).toBe(variables.comment);
	});
});
