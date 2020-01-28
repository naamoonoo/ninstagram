import dotenv from "dotenv";
dotenv.config();

import { Options } from "graphql-yoga";
import { createConnection } from "typeorm";
import app from "./app";
import connectionOptions from "./ormConfig";

const appOption: Options = {
	port: process.env.PORT || "4000",
	playground: "/playground",
	endpoint: "/graphql"
};

createConnection(connectionOptions).then(() => {
	app.start(appOption, () =>
		console.log(`listening on http://localhost:${process.env.PORT || 4000}`)
	);
});
