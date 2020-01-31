import request from "supertest";
import server from "../server";

describe("Test /status", () => {
	const app = server.getApp();

	it("should return ok", done => {
		request(app)
			.get("/status")
			.then(response => {
				expect(response.text).toBe("ok");
				done();
			});
	});
});
