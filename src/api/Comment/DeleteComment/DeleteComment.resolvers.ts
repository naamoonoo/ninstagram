import { Comment } from "../../../entities/Comment";
import { User } from "../../../entities/User";
import {
	DeleteCommentMutationArgs,
	DeleteCommentResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authProtector } from "../../../utils/authProtector";

const resolvers: Resolvers = {
	Mutation: {
		DeleteComment: authProtector(
			async (
				_,
				args: DeleteCommentMutationArgs,
				{ req }
			): Promise<DeleteCommentResponse> => {
				const user: User = req.user;
				const { commentId } = args;
				try {
					await Comment.delete({ id: commentId, user });
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
