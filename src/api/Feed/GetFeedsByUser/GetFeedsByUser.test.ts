import { Feed } from "../../../entities/Feed";
import { User } from "../../../entities/User";
import { getApi } from "../../../testUtils/api";
import "../../../testUtils/database";
import { getQuery } from "../../../testUtils/getQuery";
import { JWT } from "../../../types/constants";
import { createJWT } from "../../../utils/jwt";

describe("[Feed]GetFeedsByUser", () => {
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

	const query = `query {
		GetFeedsByUser(userId: $userId){
					res
					error
					feeds {
						id
						text
					}
				}
			}`;

	it("expect to pass, user has one feed", async () => {
		const variables = { userId: user.id };
		await Feed.create({ text: `1st feed`, photo: "___", user }).save();
		const response = await api
			.send({ query: getQuery(query, variables) })
			.expect(200)
			.then(response => response.body.data.GetFeedsByUser);
		const { res, error, feeds } = response;
		expect(res).toBeTruthy();
		expect(error).toBeNull();
		expect(feeds).toHaveLength(1);
	});

	it("expect to pass, among total 5 feeds, 3 feeds is writted by user", async () => {
		const variables = { userId: user.id };
		await Feed.create({ text: `2nd feed`, photo: "___", user }).save();
		await Feed.create({ text: `3rd feed`, photo: "___" }).save();
		await Feed.create({ text: `4th feed`, photo: "___", user }).save();
		await Feed.create({ text: `5th feed`, photo: "___" }).save();
		const response = await api
			.send({ query: getQuery(query, variables) })
			.expect(200)
			.then(response => response.body.data.GetFeedsByUser);
		const { res, error, feeds } = response;
		expect(res).toBeTruthy();
		expect(error).toBeNull();
		expect(feeds).toHaveLength(3); // prev + newly created 2
	});
});
