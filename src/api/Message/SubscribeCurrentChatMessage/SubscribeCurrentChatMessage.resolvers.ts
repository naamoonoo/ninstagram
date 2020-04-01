import { withFilter } from "apollo-server-express";
import { Message } from "../../../entities/Message";
import { SubscribeCurrentChatMessageSubscriptionArgs } from "../../../types/graph";
import { NEW_MESSAGE } from "../../../types/subscriptions";

const resolvers = {
	Subscription: {
		SubscribeCurrentChatMessage: {
			resolve: payload => payload,
			subscribe: withFilter(
				(_, __, { pubsub }) => {
					return pubsub.asyncIterator(NEW_MESSAGE);
				},
				(
					payload: Message,
					args: SubscribeCurrentChatMessageSubscriptionArgs,
					{ user }
				) => {
					const { otherId } = args;

					return (
						(payload.senderId === otherId &&
							payload.receiverId === user.id) ||
						(payload.receiverId === otherId &&
							payload.senderId === user.id)
					);
					return true;
				}
			)
		}
	}
};

export default resolvers;
