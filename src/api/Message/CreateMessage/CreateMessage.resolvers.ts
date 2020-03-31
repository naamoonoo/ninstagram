import { Chat } from "../../../entities/Chat";
import { Message } from "../../../entities/Message";
import { User } from "../../../entities/User";
import {
	CreateMessageMutationArgs,
	CreateMessageResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { NEW_MESSAGE } from "../../../types/subscriptions";
import { authProtector } from "../../../utils/authProtector";

const resolvers: Resolvers = {
	Mutation: {
		CreateMessage: authProtector(
			async (
				_,
				args: CreateMessageMutationArgs,
				{ req, pubsub }
			): Promise<CreateMessageResponse> => {
				const user: User = req.user;
				const { receiverId, chatId, content } = args;
				try {
					const chat = chatId
						? await Chat.findOne({ id: chatId })
						: await Chat.create({}).save(); // if not existed, create one

					if (!chat) {
						return {
							res: false,
							error: chatId
								? "NONE EXISTED CHAT"
								: "FAIL TO CREATE NEW CHAT"
						};
					}

					const receiver = await User.findOne({ id: receiverId });
					if (!receiver) {
						return {
							res: false,
							error: "NONE EXISTED USER"
						};
					}

					const message = await Message.create({
						sender: user,
						chat,
						content,
						receiver
					}).save();

					pubsub.publish(NEW_MESSAGE, { ...message });
					if (!chat.messages) {
						chat.messages = [message];
					} else {
						chat.messages.push(message);
					}
					chat.save();
					return {
						res: true,
						error: null
					};
				} catch (error) {
					return {
						res: false,
						error: error.message
					};
				}
			}
		)
	}
};

export default resolvers;
