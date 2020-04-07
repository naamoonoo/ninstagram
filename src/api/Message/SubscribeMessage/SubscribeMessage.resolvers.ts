import { withFilter } from "apollo-server-express";
import { Message } from "../../../entities/Message";
import { User } from "../../../entities/User";
import { NEW_MESSAGE } from "../../../types/subscriptions";

const resolvers = {
	Subscription: {
		SubscribeMessage: {
			resolve: payload => payload,
			subscribe: withFilter(
				(_, __, { pubsub }) => {
					return pubsub.asyncIterator(NEW_MESSAGE);
				},
				(payload: Message, _, context) => {
					const receiver: User = context.user;
					// when receiver is active, send notification. else, send a mail
					return payload.receiverId === receiver.id;
				}
			)
		}
	}
};

export default resolvers;
