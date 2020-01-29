import cors from "cors";
// import express from "express";
import { GraphQLServer } from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
import { decodeJWT } from "./middlewares";
// import path from "path";
import schema from "./schema";

const server = new GraphQLServer({
	schema,
	context: req => {
		return {
			req: req.request
		};
	}
});

// middlewares
server.express.use(cors());
server.express.use(helmet());
server.express.use(logger("dev"));
server.express.use(decodeJWT);

export default server;
