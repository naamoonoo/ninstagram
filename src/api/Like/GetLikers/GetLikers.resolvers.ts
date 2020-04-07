import { Feed } from "../../../entities/Feed";
import { GetLikersQueryArgs, GetLikersResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { NON_EXISTED_FEED } from "./errors";
// import { User } from "../../../entities/User";

const resolvers: Resolvers = {
	Query: {
		GetLikers: async (
			_,
			args: GetLikersQueryArgs,
			{ req }
		): Promise<GetLikersResponse> => {
			const { feedId } = args;
			try {
				const feed = await Feed.findOne(
					{ id: feedId },
					{ relations: ["likes"] }
				);
				if (!feed || !feed.likes) {
					return {
						res: false,
						error: NON_EXISTED_FEED,
						likes: null
					};
				}
				// feed.likes.forEach(async like => {
				// 	const user = await
				// })
				return {
					res: true,
					error: null,
					likes: feed.likes
				};
			} catch (error) {
				return {
					res: false,
					error: error.message,
					likes: null
				};
			}
		}
	}
};

export default resolvers;
