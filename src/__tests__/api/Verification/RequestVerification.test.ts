import { Options } from "graphql-yoga";
import request from "supertest";
import { EMAIL } from "../../../constants";
import server from "../../../server";
import { openDBConn } from "../../../utils/databaseConn";

const options: Options = {
	port: 0,
	playground: "/playground",
	endpoint: "/graphql"
};

let api;

beforeAll(async () => {
	await openDBConn();
	// const app = (await server).createHttpServer({});
	const app = await server.start(options);
	api = request(app)
		.post("/graphql")
		.set("Content-Type", "application/json")
		.set("Accept", "application/json");

	// console.log(app.address);
	// api = request(app);
});

describe("Api ValidateVerification", () => {
	const emailRequest = { type: EMAIL, payload: "jnam920329@gmail.com" };
	const emailRequestVerification = `mutation {
		ValidateVerification(type=${emailRequest.type}payload:"${emailRequest.payload}"){
			res
			error
		}
	  }`;

	it("should return error", async () => {
		await api
			.send({
				query: ``
			})
			.expect(400);
	});

	it("should work well", async () => {
		await api
			.send({
				query: emailRequestVerification
			})
			.expect(200);

		// const { res, error, status } = response;

		// // response.expect(200);
		// expect(status).toEqual(200);
		// expect(res).toEqual(true);
		// expect(error).toEqual(null);

		// console.log(res);
	});
});

// export default request(app)
// 	.post("/")
// 	.set("Content-Type", "application/json")
// 	.set("Accept", "application/json");
