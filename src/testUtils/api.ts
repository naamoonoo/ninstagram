import request from "supertest";
import { ApolloServer, PubSub } from "apollo-server-express";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import logger from "morgan";
import path from "path";
import { decodeJWT } from "../middlewares";
import authRoutes from "../routes/authRoutes";
import schema from "../schema";
import { SUBSCRIPTION_ENDPOINT } from "../types/constants";
import passport from "../utils/passport";
const app = express();
const pubsub = new PubSub();

app.use(cors());
app.use(helmet());
app.use(logger("dev"));
app.use(passport.initialize());
app.use(decodeJWT);
app.use(express.static(path.join(__dirname, "client/build")));

authRoutes(app);
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// prodRoutes(app);

const graphqlServer = new ApolloServer({
	playground: true,
	schema,
	context: async ({ req }) => {
		return { req, pubsub };
	},
	subscriptions: {
		path: SUBSCRIPTION_ENDPOINT
	}
});

graphqlServer.applyMiddleware({ app });
export const getApi = () =>
	request(app)
		.post("/graphql")
		.set("Content-Type", "application/json")
		.set("Accept", "application/json");
