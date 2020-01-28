import { ConnectionOptions } from "typeorm";
import { Comment } from "./entities/Comment";
import { Feed } from "./entities/Feed";
import { User } from "./entities/User";
import { Verification } from "./entities/Verification";

const connectionOptions: ConnectionOptions = {
	type: "postgres",
	synchronize: true,
	entities: [Comment, Feed, User, Verification],
	port: 5432,
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD
};

export default connectionOptions;
