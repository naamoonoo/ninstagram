import { Chat } from "../../../entities/Chat";
import { Message } from "../../../entities/Message";
import { User } from "../../../entities/User";
import {
	CreateMessageMutationArgs,
	CreateMessageResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authProtector } from "../../../utils/authProtector";

const resolvers: Resolvers = {
	Mutation: {
		CreateMessage: authProtector(
			async (
				_,
				args: CreateMessageMutationArgs,
				{ req }
			): Promise<CreateMessageResponse> => {
				const user: User = req.user;
				const { receiverId, chatId, content } = args;
				try {
					const chat = await Chat.findOne({ id: chatId });
					if (!chat) {
						return {
							res: false,
							error: "NONE EXISTED CHAT"
						};
					}

					const receiver = await User.findOne({ id: receiverId });
					if (!receiver) {
						return {
							res: false,
							error: "NONE EXISTED USER"
						};
					}

					await Message.create({
						sender: user,
						chat,
						content,
						receiver
					});

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
