import { Feed } from "../../../entities/Feed";
import { User } from "../../../entities/User";
import {
	UpdateFeedMutationArgs,
	UpdateFeedResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authProtector } from "../../../utils/authProtector";
import { getNoneNull } from "../../../utils/getNoneNull";
import { NONE_EXISTED_FEED } from "./errors";

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
					const feed = await Feed.findOne({ id: feedId, user });
					if (!feed) {
						return {
							res: false,
							error: NONE_EXISTED_FEED
						};
					}
					feed.getTags();
					// feed.save();
					// const feed = await
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
