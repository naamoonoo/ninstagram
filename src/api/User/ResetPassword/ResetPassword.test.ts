// import { User } from "../../../entities/User";
// import { getApi } from "../../../testUtils/api";
// import "../../../testUtils/database";
// import { getQuery } from "../../../testUtils/getQuery";

// describe("[User]ResetPassword", () => {
// 	let api;

// 	beforeEach(() => {
// 		api = getApi();
// 	});

// 	const query = `mutation {
// 				ResetPassword(
// 				) {
// 					res
// 					error
// 				}
// 			}`;

// 	it("expect to pass", async () => {
// 		const variables = {};
// 		const response = await api
// 			.send({ query: getQuery(query, variables) })
// 			.expect(200)
// 			.then(response => response.body.data.ResetPassword);
// 		const { res, error } = response;
// 		expect(res).toBeTruthy();
// 		expect(error).toBeNull();
// 		const result = await User.findOne({ ...variables });
// 		expect(result).not.toBeUndefined();
// 		expect(result).toMatchObject(variables);
// 	});

// 	it("expect to fail", async () => {
// 		const variables = {};
// 		const response = await api
// 			.send({ query: getQuery(query, variables) })
// 			.expect(200)
// 			.then(response => response.body.data.ResetPassword);
// 		const { res, error } = response;
// 		expect(res).toBeFalsy();
// 		expect(error).toBe("");
// 		const result = await User.findOne({ ...variables });
// 		expect(result).toBeUndefined();
// 	});
// });
