import { Like } from "typeorm";
import { User } from "../../../entities/User";
import {
	FindUserByUsernameQueryArgs,
	FindUserByUsernameResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authProtector } from "../../../utils/authProtector";

const resolvers: Resolvers = {
	Query: {
		FindUserByUsername: authProtector(
			async (
				_,
				args: FindUserByUsernameQueryArgs,
				{ req }
			): Promise<FindUserByUsernameResponse> => {
				const { search } = args;
				try {
					const users = await User.find({
						take: 10,
						where: { firstName: Like(`%${search}%`) }
					});

					return {
						res: true,
						error: null,
						users
					};
				} catch (error) {
					return {
						res: false,
						error: error.message,
						users: null
					};
				}
			}
		)
	}
};

export default resolvers;
