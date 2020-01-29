import cors from "cors";
// import express from "express";
import { GraphQLServer } from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
// import path from "path";
import schema from "./schema";

class App {
	public app: GraphQLServer;

	constructor() {
		this.app = new GraphQLServer({
			schema
		});
		this.applyMiddlewares();
		this.routeHandler();
	}

	applyMiddlewares() {
		this.app.express.use(cors());
		this.app.express.use(helmet());
		this.app.express.use(logger("dev"));
	}

	routeHandler() {
		// this.app.get("*", )
	}
}

export default new App().app;
