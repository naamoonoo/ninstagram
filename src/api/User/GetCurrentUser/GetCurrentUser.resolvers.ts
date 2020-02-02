import { User } from "../../../entities/User";
import { GetCurrentUserResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authProtector } from "../../../utils/authProtector";

const resolvers: Resolvers = {
	Query: {
		GetCurrentUser: authProtector(
			async (_, __, { req }): Promise<GetCurrentUserResponse> => {
				try {
					const user: User = req.user;
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
		)
	}
};

export default resolvers;
