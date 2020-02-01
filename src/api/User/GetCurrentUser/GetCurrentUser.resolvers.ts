import { User } from "../../../entities/User";
import { GetCurrentUserResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
	Query: {
		GetCurrentUser: async (
			_,
			__,
			{ req }
		): Promise<GetCurrentUserResponse> => {
			const user: User = req.user;
			return {
				res: true,
				error: null,
				user
			};
		}
	}
};

export default resolvers;
