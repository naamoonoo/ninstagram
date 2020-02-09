import { Comment } from "../../../entities/Comment";
import { Feed } from "../../../entities/Feed";
import { User } from "../../../entities/User";
import {
	CreateCommentMutationArgs,
	CreateCommentResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authProtector } from "../../../utils/authProtector";
import { sendNewComment } from "../../../utils/email";
import { NONE_EXISTED_FEED_COMMENT } from "./errors";

const resolvers: Resolvers = {
	Mutation: {
		CreateComment: authProtector(
			async (
				_,
				args: CreateCommentMutationArgs,
				{ req }
			): Promise<CreateCommentResponse> => {
				const user: User = req.user;
				try {
					const { feedId, comment } = args;
					const feed = await Feed.findOne({ id: feedId });
					if (!feed) {
						return {
							res: false,
							error: NONE_EXISTED_FEED_COMMENT
						};
					}
					await Comment.create({
						comment,
						user,
						feed
					}).save();

					if (process.env.NODE_ENV === "production") {
						await sendNewComment(user.email, feedId);
					}
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
