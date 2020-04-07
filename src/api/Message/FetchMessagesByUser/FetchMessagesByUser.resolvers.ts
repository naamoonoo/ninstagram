import { Message } from "../../../entities/Message";
import { User } from "../../../entities/User";
import {
	FetchMessagesByUserQueryArgs,
	FetchMessagesByUserResponse,
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authProtector } from "../../../utils/authProtector";

const resolvers: Resolvers = {
	Query: {
		FetchMessagesByUser: authProtector(
			async (
				_,
				args: FetchMessagesByUserQueryArgs,
				{ req }
			): Promise<FetchMessagesByUserResponse> => {
				const currentUser: User = req.user;
				const { receiverId, chatId: chatIdArgs } = args;
				try {
					let chatId;

					if (!chatIdArgs) {
						const sentMessage = await Message.findOne({
							receiverId,
							senderId: currentUser.id,
						});
						const receivedMessage = await Message.findOne({
							senderId: receiverId,
							receiverId: currentUser.id,
						});
						if (sentMessage) {
							chatId = sentMessage.chatId;
						} else if (receivedMessage) {
							chatId = receivedMessage.chatId;
						} else {
							return {
								res: true,
								error: null,
								messages: [],
							};
						}
					} else {
						chatId = chatIdArgs;
					}

					const messages = await Message.find({
						where: { chatId },
						relations: ["chat", "sender", "receiver"],
						order: { createAt: "ASC" },
					});

					return {
						res: true,
						error: null,
						messages,
					};
				} catch (error) {
					return {
						res: false,
						error: error.message,
						messages: null,
					};
				}
			}
		),
	},
};

export default resolvers;
