import { Comment } from "../../../entities/Comment";
import { User } from "../../../entities/User";
import {
	UpdateCommentMutationArgs,
	UpdateCommentResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authProtector } from "../../../utils/authProtector";

const resolvers: Resolvers = {
	Mutation: {
		UpdateComment: authProtector(
			async (
				_,
				args: UpdateCommentMutationArgs,
				{ req }
			): Promise<UpdateCommentResponse> => {
				const user: User = req.user;
				const { commentId, comment } = args;
				try {
					await Comment.update(
						{
							id: commentId,
							user
						},
						{ comment }
					);
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
