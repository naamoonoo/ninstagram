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
				const sender: User = req.user;
				const { receiverId } = args;
				try {
					const messages = await Message.find({
						where: [
							{
								// which current user sent
								sender,
								receiverId,
							},
							{
								// which current user received
								serderId: receiverId,
								receiver: sender,
							},
						],
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
