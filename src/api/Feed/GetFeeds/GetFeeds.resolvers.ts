import { Feed } from "../../../entities/Feed";
import { FEEDS_PER_PAGE } from "../../../types/constants";
import { GetFeedsQueryArgs, GetFeedsResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
	Query: {
		GetFeeds: async (
			_,
			args: GetFeedsQueryArgs,
			{ req }
		): Promise<GetFeedsResponse> => {
			const { page } = args;
			try {
				const feeds = await Feed.find({
					take: page * FEEDS_PER_PAGE,
					order: {
						updateAt: "DESC"
					},
					relations: ["user"]
				});
				return {
					res: true,
					error: null,
					feeds
				};
			} catch (error) {
				return {
					res: false,
					error: error.message,
					feeds: null
				};
			}
		}
	}
};

export default resolvers;
