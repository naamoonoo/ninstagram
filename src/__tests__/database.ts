import { closeDBConn, openDBConn } from "../utils/databaseConn";

beforeAll(async done => {
	await openDBConn();
	return done();
});

afterAll(async done => {
	await closeDBConn();
	return done();
});
