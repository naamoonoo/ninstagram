import { User } from "../../../entities/User";
import {
	GetUserByIdQueryArgs,
	GetUserByIdResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { FAIL_TO_FIND_USER } from "./errors";

const resolvers: Resolvers = {
	Query: {
		GetUserById: async (
			_,
			args: GetUserByIdQueryArgs,
			{ req }
		): Promise<GetUserByIdResponse> => {
			const { userId } = args;
			try {
				const user = await User.findOne(
					{ id: userId },
					{ relations: ["feeds"] }
				);
				if (!user) {
					return {
						res: false,
						error: FAIL_TO_FIND_USER,
						user: null
					};
				}
				return {
					res: true,
					error: null,
					user
				};
			} catch (error) {
				return {
					res: false,
					error: error.message,
					user: null
				};
			}
		}
	}
};

export default resolvers;
