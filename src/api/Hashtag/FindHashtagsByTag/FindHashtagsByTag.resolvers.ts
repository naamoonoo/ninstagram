import { Like } from "typeorm";
import { Hashtag } from "../../../entities/Hashtag";
import {
	FindHashtagsByTagQueryArgs,
	FindHashtagsByTagResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authProtector } from "../../../utils/authProtector";

const resolvers: Resolvers = {
	Query: {
		FindHashtagsByTag: authProtector(
			async (
				_,
				args: FindHashtagsByTagQueryArgs,
				{ req }
			): Promise<FindHashtagsByTagResponse> => {
				const { search } = args;
				try {
					const tags = await Hashtag.find({
						take: 10,
						where: {
							tag: Like(`%${search}%`)
						},
						relations: ["feeds"]
					});

					const filteredTags = tags
						.filter(tag => tag.feeds.length !== 0)
						.sort((a, b) => b.feeds.length - a.feeds.length);

					return {
						res: true,
						error: null,
						tags: filteredTags
					};
				} catch (error) {
					return {
						res: false,
						error: error.message,
						tags: null
					};
				}
			}
		)
	}
};

export default resolvers;
