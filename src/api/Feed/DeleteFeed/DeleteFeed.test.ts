import { JWT } from "../../../constants";
import { Feed } from "../../../entities/Feed";
import { User } from "../../../entities/User";
import { getApi } from "../../../testUtils/api";
import "../../../testUtils/database";
import { getQuery } from "../../../testUtils/getQuery";
import { createJWT } from "../../../utils/jwt";
import { INVALID_USER_REMOVE } from "./errors";

describe("[Feed]DeleteFeed", () => {
	let api;
	let token;
	let user;
	beforeAll(async () => {
		user = await User.create({
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
				DeleteFeed(feedId: $feedId){
					res
					error
				}
			}`;

	it("expect to pass", async () => {
		const feedCreated = await Feed.create({
			text: `test feed`,
			photo: "___",
			user
		}).save();
		const variables = { feedId: feedCreated.id };
		const response = await api
			.send({ query: getQuery(query, variables) })
			.expect(200)
			.then(response => response.body.data.DeleteFeed);
		const { res, error } = response;
		expect(res).toBeTruthy();
		expect(error).toBeNull();
		const result = await Feed.findOne({ id: variables.feedId });
		expect(result).toBeUndefined();
	});

	it("expect to fail, not a valid user to remove feed", async () => {
		const feedCreated = await Feed.create({
			text: `test feed`,
			photo: "___"
		}).save();
		const variables = { feedId: feedCreated.id };
		const response = await api
			.send({ query: getQuery(query, variables) })
			.expect(200)
			.then(response => response.body.data.DeleteFeed);
		const { res, error } = response;
		expect(res).toBeFalsy();
		expect(error).toBe(INVALID_USER_REMOVE);
	});
});
