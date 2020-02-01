import { createConnection, getConnection } from "typeorm";
import connectionOptions from "../ormConfig";

export const openDBConn = async () => {
	await createConnection(connectionOptions);
};

export const closeDBConn = async () => {
	const connectedDB = getConnection();
	if (connectedDB) {
		await connectedDB.close();
	}
};
