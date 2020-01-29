import { request } from "graphql-request";
// import { Options } from "graphql-yoga";
import { EMAIL } from "../../../constants";
// import server from "../../../server";
// import { openDBConn } from "../../../utils/databaseConn";

const host = `http://localhost:4000/graphql`;

// const options: Options = {
// 	port: 0,
// 	endpoint: "/graphql"
// };

describe("Api ValidateVerification", () => {
	const emailRequest = { type: EMAIL, payload: "jnam920329@gmail.com" };
	const emailRequestVerification = `mutation {
		ValidateVerification(type=${emailRequest.type}payload:"${emailRequest.payload}"){
			res
			error
		}
	  }`;

	// it("should return error", async () => {
	// 	await api
	// 		.send({
	// 			query: ``
	// 		})
	// 		.expect(400);
	// });

	it("should work well", async () => {
		const response = await request(host, emailRequestVerification);
		console.log(response);
		// expect(response).toEqual({ res: true });

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
