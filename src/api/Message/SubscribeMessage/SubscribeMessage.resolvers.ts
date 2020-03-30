import { withFilter } from "apollo-server-express";
import { Message } from "../../../entities/Message";
import { User } from "../../../entities/User";
import { SubscribeMessageSubscriptionArgs } from "../../../types/graph";
import { NEW_MESSAGE } from "../../../types/subscriptions";

const resolvers = {
	Subscription: {
		SubscribeMessage: {
			subscribe: withFilter(
				(_, __, { pubSub }) => {
					return pubSub.asyncIterator(NEW_MESSAGE);
				},
				(
					payload: Message,
					args: SubscribeMessageSubscriptionArgs,
					{ context }
				) => {
					const { receiverId } = args;
					// const newMessage: Message = payload;
					const sender: User = context.user;
					console.log(payload);
					console.log(context);
					return (
						payload.receiverId === receiverId &&
						payload.sender.id === sender.id
					);
					// return true;
				}
			)
		}
	}
};

export default resolvers;
