import { withFilter } from "apollo-server-express";
import { NEW_FEED_CREATED } from "../../../types/subscriptions";

const resolvers = {
	Subscription: {
		SubscribeFeed: {
			resolve: payload => payload,
			subscribe: withFilter(
				(_, __, { pubsub }) => pubsub.asyncIterator(NEW_FEED_CREATED),
				(payload, _, context) => {
					return true;
				}
			)
		}
	}
};

export default resolvers;
