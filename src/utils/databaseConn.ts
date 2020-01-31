import { createConnection, getConnection } from "typeorm";
import connectionOptions from "../ormConfig";

export const openDBConn = async () => {
	// console.log(connectionOptions.username);
	await createConnection(connectionOptions);
	console.log("db has been open");
};

export const closeDBConn = async () => {
	const connectedDB = getConnection();
	if (connectedDB) {
		await connectedDB.close();
		console.log("db has been closed");
	}
};
