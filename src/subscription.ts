import { PubSub } from "apollo-server-express";
import { execute, subscribe } from "graphql";
import { Server } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import schema from "./schema";
import { JWT } from "./types/constants";
import { verifyJWT } from "./utils/jwt";

export const getSubscriptionServer = (server: Server, pubsub: PubSub) => {
	return new SubscriptionServer(
		{
			execute,
			subscribe,
			schema,
			onConnect: async connectionParam => {
				const token = connectionParam[JWT];
				if (token) {
					const user = await verifyJWT(token);
					return { user, pubsub };
				}
				throw new Error("Need to Login first");
			}
		},
		{
			server
		}
	);
};
