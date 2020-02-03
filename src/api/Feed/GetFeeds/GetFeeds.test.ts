import { Feed } from "../../../entities/Feed";
import { User } from "../../../entities/User";
import { getApi } from "../../../testUtils/api";
import "../../../testUtils/database";
import { getQuery } from "../../../testUtils/getQuery";
import { FEEDS_PER_PAGE, JWT } from "../../../types/constants";
import { createJWT } from "../../../utils/jwt";

describe("[Feed]GetFeeds", () => {
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

	const query = `query {
		GetFeeds(page: $page){
			res
			error
			feeds{
				id
				text
			}
		}
	}`;

	it("expect to pass, get one feed", async () => {
		const variables = { page: 1 };
		await Feed.create({ text: `1st feed`, photo: "___" }).save();
		const response = await api
			.send({ query: getQuery(query, variables) })
			.expect(200)
			.then(response => response.body.data.GetFeeds);
		const { res, error, feeds } = response;
		expect(res).toBeTruthy();
		expect(error).toBeNull();
		expect(feeds).toHaveLength(1);
	});

	it("expect to pass, get feeds by page 1", async () => {
		const variables = { page: 1 };
		await Feed.create({ text: `2nd feed`, photo: "___" }).save();
		await Feed.create({ text: `3rd feed`, photo: "___" }).save();
		await Feed.create({ text: `4th feed`, photo: "___" }).save();
		await Feed.create({ text: `5th feed`, photo: "___" }).save();
		const response = await api
			.send({ query: getQuery(query, variables) })
			.expect(200)
			.then(response => response.body.data.GetFeeds);
		const { res, error, feeds } = response;
		expect(res).toBeTruthy();
		expect(error).toBeNull();
		expect(feeds).toHaveLength(variables.page * FEEDS_PER_PAGE);
	});
});
