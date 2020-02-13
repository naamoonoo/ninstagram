import { Hashtag } from "../../../entities/Hashtag";
import {
	GetTaggedFeedsQueryArgs,
	GetTaggedFeedsResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authProtector } from "../../../utils/authProtector";
import { INVALID_TAG } from "./errors";

const resolvers: Resolvers = {
	Query: {
		GetTaggedFeeds: authProtector(
			async (
				_,
				args: GetTaggedFeedsQueryArgs,
				{ req }
			): Promise<GetTaggedFeedsResponse> => {
				const { tag } = args;
				try {
					const foundTag = await Hashtag.findOne(
						{ tag },
						{ relations: ["feeds"] }
					);
					if (!foundTag) {
						return {
							res: false,
							error: INVALID_TAG,
							feeds: null
						};
					}

					return {
						res: true,
						error: null,
						feeds: foundTag.feeds
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
