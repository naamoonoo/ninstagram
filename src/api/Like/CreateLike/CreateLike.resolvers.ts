import { Feed } from "../../../entities/Feed";
import { Like } from "../../../entities/Like";
import { User } from "../../../entities/User";
import {
	CreateLikeMutationArgs,
	CreateLikeResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authProtector } from "../../../utils/authProtector";
import { FEED_NONE_EXISTED } from "./errors";

const resolvers: Resolvers = {
	Mutation: {
		CreateLike: authProtector(
			async (
				_,
				args: CreateLikeMutationArgs,
				{ req }
			): Promise<CreateLikeResponse> => {
				const user: User = req.user;
				const { feedId } = args;
				try {
					const feed = await Feed.findOne({ id: feedId });
					if (!feed) {
						return {
							res: false,
							error: FEED_NONE_EXISTED
						};
					}
					await Like.create({ user, feed }).save();
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
