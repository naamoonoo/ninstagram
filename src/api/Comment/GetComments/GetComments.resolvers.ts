import { Comment } from "../../../entities/Comment";
import {
	GetCommentsQueryArgs,
	GetCommentsResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
	Query: {
		GetComments: async (
			_,
			args: GetCommentsQueryArgs,
			{ req }
		): Promise<GetCommentsResponse> => {
			const { feedId } = args;
			try {
				const comments = await Comment.find({
					relations: ["user"],
					where: { feedId }
				});

				return {
					res: true,
					error: null,
					comments
				};
			} catch (error) {
				return {
					res: false,
					error: error.message,
					comments: null
				};
			}
		}
	}
};

export default resolvers;
