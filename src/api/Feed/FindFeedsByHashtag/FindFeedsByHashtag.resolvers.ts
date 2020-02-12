import { Like } from "typeorm";
import { Feed } from "../../../entities/Feed";

import {
	FindFeedsByHashtagQueryArgs,
	FindFeedsByHashtagResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authProtector } from "../../../utils/authProtector";

const resolvers: Resolvers = {
	Query: {
		FindFeedsByHashtag: authProtector(
			async (
				_,
				args: FindFeedsByHashtagQueryArgs,
				{ req }
			): Promise<FindFeedsByHashtagResponse> => {
				const { search } = args;
				try {
					const feeds = await Feed.find({
						take: 9,
						where: { text: Like(`%${search}%`) }
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
		)
	}
};

export default resolvers;
