import { Feed } from "../../../entities/Feed";
import { User } from "../../../entities/User";
import { getApi } from "../../../testUtils/api";
import "../../../testUtils/database";
import { getQuery } from "../../../testUtils/getQuery";
import { JWT } from "../../../types/constants";
import { createJWT } from "../../../utils/jwt";
import { NON_EXISTED_FEED } from "./errors";

describe("[Feed]GetFeed", () => {
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

	const query = `query {
				GetFeed(feedId: $feedId){
					res
					error
					feed {
						id
						text
					}
				}
			}`;

	it("expect to pass", async () => {
		const feedCreated = await Feed.create({
			text: `test feed`,
			photo: "___"
		}).save();
		const variables = { feedId: feedCreated.id };
		const response = await api
			.send({ query: getQuery(query, variables) })
			.expect(200)
			.then(response => response.body.data.GetFeed);
		const { res, error, feed } = response;
		expect(res).toBeTruthy();
		expect(error).toBeNull();
		expect(feed.id).toBe(variables.feedId);
	});

	it("expect to fail", async () => {
		const variables = { feedId: "8ee6817f-ae71-4908-b963-e66958225082" };
		const response = await api
			.send({ query: getQuery(query, variables) })
			.expect(200)
			.then(response => response.body.data.GetFeed);
		const { res, error } = response;
		expect(res).toBeFalsy();
		expect(error).toBe(NON_EXISTED_FEED);
	});
});
