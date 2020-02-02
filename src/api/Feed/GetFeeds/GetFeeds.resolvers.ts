import { FEEDS_PER_PAGE } from "../../../constants";
import { Feed } from "../../../entities/Feed";
import { GetFeedsQueryArgs, GetFeedsResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authProtector } from "../../../utils/authProtector";

const resolvers: Resolvers = {
	Query: {
		GetFeeds: authProtector(
			async (
				_,
				args: GetFeedsQueryArgs,
				{ req }
			): Promise<GetFeedsResponse> => {
				const { page } = args;
				try {
					const feeds = await Feed.find({
						take: page * FEEDS_PER_PAGE,
						order: {
							createAt: "DESC"
						}
					});
					// const feeds = await Feed.find({});
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
		)
	}
};

export default resolvers;
