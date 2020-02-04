import { Like } from "../../../entities/Like";
import { User } from "../../../entities/User";
import {
	DeleteLikeMutationArgs,
	DeleteLikeResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authProtector } from "../../../utils/authProtector";

const resolvers: Resolvers = {
	Mutation: {
		DeleteLike: authProtector(
			async (
				_,
				args: DeleteLikeMutationArgs,
				{ req }
			): Promise<DeleteLikeResponse> => {
				const user: User = req.user;
				const { feedId } = args;
				try {
					Like.delete({ user, feedId });
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
