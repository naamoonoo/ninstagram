import { request } from "graphql-request";

import { EMAIL } from "../../../constants";
import { Verification } from "../../../entities/Verification";
// import { openDBConn } from "../../../utils/databaseConn";
import server from "../../../server";

const host = "http://127.0.0.1:0";
beforeAll(async () => {
	await server.listen();
});

const emailRequest = { type: EMAIL, payload: "jnam920329@gmail.com" };
const mutation = `mutation {
	ValidateVerification(type=${emailRequest.type} payload:${emailRequest.payload}){
		res
		error
	}
	}`;

test("Register user", async () => {
	const response = await request(host, mutation);
	expect(response).toEqual({ register: true });
	const verification = await Verification.findOne({ ...emailRequest });
	expect(verification).toBeInstanceOf(Verification);
	// const user = users[0];
	// expect(verification.type).toEqual(email);
	// expect(verification.password).not.toEqual(password);
});
