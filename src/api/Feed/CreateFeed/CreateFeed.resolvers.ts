import { Feed } from "../../../entities/Feed";
import { User } from "../../../entities/User";
import {
	CreateFeedMutationArgs,
	CreateFeedResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authProtector } from "../../../utils/authProtector";

const resolvers: Resolvers = {
	Mutation: {
		CreateFeed: authProtector(
			async (
				_,
				args: CreateFeedMutationArgs,
				{ req }
			): Promise<CreateFeedResponse> => {
				const user: User = req.user;
				try {
					await Feed.create({ ...args, user }).save();
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
