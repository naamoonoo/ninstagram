import { Feed } from "../../../entities/Feed";
import { User } from "../../../entities/User";
import {
	DeleteFeedMutationArgs,
	DeleteFeedResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authProtector } from "../../../utils/authProtector";
import { INVALID_USER_REMOVE } from "./errors";

const resolvers: Resolvers = {
	Mutation: {
		DeleteFeed: authProtector(
			async (
				_,
				args: DeleteFeedMutationArgs,
				{ req }
			): Promise<DeleteFeedResponse> => {
				const user: User = req.user;
				const { feedId } = args;
				try {
					//should delete like and comment first

					const res = await Feed.delete({ id: feedId, user });
					if (res.affected === 1) {
						return {
							res: true,
							error: null
						};
					}
					return {
						res: false,
						error: INVALID_USER_REMOVE
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
