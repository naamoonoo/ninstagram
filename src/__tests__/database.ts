import { closeDBConn, openDBConn } from "../utils/databaseConn";

beforeAll(async () => {
	await openDBConn();
});

afterAll(async () => {
	await closeDBConn();
});
