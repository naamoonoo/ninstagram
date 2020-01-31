import request from "supertest";
import server from "../server";
import "./database";

describe("Test /hello", () => {
	const app = server.getApp();

	beforeAll(async () => {
		// app = await server.listen();
	});

	it("should return world!", async done => {
		await request(app)
			.get("/hello")
			.then(response => {
				expect(response.text).toBe("world!");
				done();
			});
	});
	// .set("Content-Type", "application/json")
	// .set("Accept", "application/json")
	it("check graphql post", async () => {
		const res = await request(app)
			.post("/graphql")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.send({
				query: `query {
				hello{
					type
					payload
					isVerified
				}
			}`
			})
			.expect(200)
			.then(({ body }) => body);

		console.log(res.data);
		console.log(process.env.NODE_ENV);
		// expect(res.data).toEqual({ hello: "hello world" });
		// expect(res.data.hello).toBe("hello world");
	});
});
