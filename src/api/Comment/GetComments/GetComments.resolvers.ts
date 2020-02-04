import { Feed } from "../../../entities/Feed";
import {
	GetCommentsQueryArgs,
	GetCommentsResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authProtector } from "../../../utils/authProtector";
import { NONE_EXISTED_FEED_COMMENT } from "../CreateComment/errors";

const resolvers: Resolvers = {
	Query: {
		GetComments: authProtector(
			async (
				_,
				args: GetCommentsQueryArgs,
				{ req }
			): Promise<GetCommentsResponse> => {
				const { feedId } = args;
				try {
					const feed = await Feed.findOne(
						{ id: feedId },
						{ relations: ["comments"] }
					);
					if (!feed) {
						return {
							res: false,
							error: NONE_EXISTED_FEED_COMMENT,
							comments: null
						};
					}
					return {
						res: true,
						error: null,
						comments: feed.comments
					};
				} catch (error) {
					return {
						res: false,
						error: error.message,
						comments: null
					};
				}
			}
		)
	}
};

export default resolvers;
