import { closeDBConn, openDBConn } from "../utils/databaseConn";

beforeAll(async () => {
	return await openDBConn();
});

afterAll(async () => {
	return await closeDBConn();
});
