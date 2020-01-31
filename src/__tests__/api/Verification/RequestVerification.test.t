// import request from "supertest";
// import { EMAIL } from "../../../constants";
// import server from "../../../server";

// describe("Api ValidateVerification", () => {
// 	// let api: request.Test;

// 	beforeAll(async () => {
// 		// api = request(await server.getApp())
// 		// 	.post("/graphql")
// 		// 	.set("Accept", "application/json")
// 		// 	.set("Content-Type", "application/json");
// 	});

// 	const emailRequest = { type: EMAIL, payload: "jnam920329@gmail.com" };
// 	const emailRequestVerification = `mutation {
// 		ValidateVerification(type=${emailRequest.type} payload:${emailRequest.payload}){
// 			res
// 			error
// 		}
// 	  }`;

// 	// it("should return error", async done => {
// 	// 	await api
// 	// 		.send({
// 	// 			query: ``
// 	// 		})
// 	// 		.expect(400, done());
// 	// });

// 	it("should work well", async () => {
// 		const api = await request(server.getApp())
// 			.post("/graphql")
// 			.set("Accept", "application/json")
// 			.set("Content-Type", "application/json");

// 		await api.send({ query: emailRequestVerification }).expect(200);

// 		// const { res, error, status } = response;

// 		// // response.expect(200);
// 		// expect(status).toEqual(200);
// 		// expect(res).toEqual(true);
// 		// expect(error).toEqual(null);

// 		// console.log(res);
// 	});
// });

// // export default request(app)
// // 	.post("/")
// // 	.set("Content-Type", "application/json")
// // 	.set("Accept", "application/json");
