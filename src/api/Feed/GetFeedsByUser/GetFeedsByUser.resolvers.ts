import { User } from "../../../entities/User";
import {
	GetFeedsByUserQueryArgs,
	GetFeedsByUserResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authProtector } from "../../../utils/authProtector";
import { NON_EXISTED_USER } from "./errors";

const resolvers: Resolvers = {
	Query: {
		GetFeedsByUser: authProtector(
			async (
				_,
				args: GetFeedsByUserQueryArgs,
				{ req }
			): Promise<GetFeedsByUserResponse> => {
				const { userId } = args;
				try {
					const user = await User.findOne(
						{ id: userId },
						{ relations: ["feeds"] }
					);
					if (!user) {
						return {
							res: false,
							error: NON_EXISTED_USER,
							feeds: null
						};
					}
					return {
						res: true,
						error: null,
						feeds: user.feeds
					};
				} catch (error) {
					return {
						res: false,
						error: error.message,
						feeds: null
					};
				}
			}
		)
	}
};

export default resolvers;
