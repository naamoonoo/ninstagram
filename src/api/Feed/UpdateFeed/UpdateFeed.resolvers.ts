import { Feed } from "../../../entities/Feed";
import { User } from "../../../entities/User";
import {
	UpdateFeedMutationArgs,
	UpdateFeedResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authProtector } from "../../../utils/authProtector";
import { getNoneNull } from "../../../utils/getNoneNull";

const resolvers: Resolvers = {
	Mutation: {
		UpdateFeed: authProtector(
			async (
				_,
				args: UpdateFeedMutationArgs,
				{ req }
			): Promise<UpdateFeedResponse> => {
				const { feedId, ...toBeUpdated } = args;
				const nonNullArgs = getNoneNull(toBeUpdated);

				const user: User = req.user;
				try {
					await Feed.update({ id: feedId, user }, nonNullArgs);
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
