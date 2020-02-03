import { Feed } from "../../../entities/Feed";
import { User } from "../../../entities/User";
import {
	CreateFeedMutationArgs,
	CreateFeedResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { NEW_FEED_CREATED } from "../../../types/subscriptions";
import { authProtector } from "../../../utils/authProtector";

const resolvers: Resolvers = {
	Mutation: {
		CreateFeed: authProtector(
			async (
				_,
				args: CreateFeedMutationArgs,
				{ req, pubsub }
			): Promise<CreateFeedResponse> => {
				const user: User = req.user;
				try {
					const newFeed = await Feed.create({ ...args, user }).save();
					pubsub.publish(NEW_FEED_CREATED, {
						...newFeed
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
