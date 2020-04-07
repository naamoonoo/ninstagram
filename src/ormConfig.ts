import { ConnectionOptions } from "typeorm";
import { Chat } from "./entities/Chat";
import { Comment } from "./entities/Comment";
import { Feed } from "./entities/Feed";
import { Hashtag } from "./entities/Hashtag";
import { Like } from "./entities/Like";
import { Message } from "./entities/Message";
import { User } from "./entities/User";
import { Verification } from "./entities/Verification";

const connectionOptions: ConnectionOptions = {
	type: "postgres",
	entities: [Comment, Feed, Like, User, Verification, Hashtag, Chat, Message],
	port: 5432,
	host: process.env.DB_HOST,
	database:
		process.env.NODE_ENV === "test" ? "test" : process.env.DB_DATABASE,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	synchronize: true,
	dropSchema: process.env.NODE_ENV === "test"
};

export default connectionOptions;
