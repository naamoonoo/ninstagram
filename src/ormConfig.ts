import { ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions = {
	type: "postgres",
	synchronize: true,
	entities: [],
	port: 5432,
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD
};

export default connectionOptions;
