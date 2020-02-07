import { Feed } from "../../../entities/Feed";
import { GetFeedQueryArgs, GetFeedResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authProtector } from "../../../utils/authProtector";
import { NON_EXISTED_FEED } from "./errors";

const resolvers: Resolvers = {
	Query: {
		GetFeed: authProtector(
			async (
				_,
				args: GetFeedQueryArgs,
				{ req }
			): Promise<GetFeedResponse> => {
				try {
					const feed = await Feed.findOne(
						{ id: args.feedId },
						{ relations: ["user"] }
					);
					if (!feed) {
						return {
							res: false,
							error: NON_EXISTED_FEED,
							feed: null
						};
					}
					return {
						res: true,
						error: null,
						feed
					};
				} catch (error) {
					return {
						res: false,
						error: error.message,
						feed: null
					};
				}
			}
		)
	}
};

export default resolvers;
