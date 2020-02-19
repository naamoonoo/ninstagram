import { User } from "../../../entities/User";
import {
	SocialLoginMutationArgs,
	SocialLoginResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { createJWT } from "../../../utils/jwt";
import { FAIL_TO_CREATE } from "./errors";

const resolvers: Resolvers = {
	Mutation: {
		SocialLogin: async (
			_,
			args: SocialLoginMutationArgs,
			{ req }
		): Promise<SocialLoginResponse> => {
			const { googleId } = args;
			try {
				const existedUser = await User.findOne({ googleId });
				if (existedUser) {
					const token = createJWT(existedUser.id);
					return {
						res: true,
						error: null,
						token
					};
				}
				const newUser = await User.create({ ...args });
				if (!newUser) {
					return {
						res: false,
						error: FAIL_TO_CREATE,
						token: null
					};
				}
				const token = createJWT(newUser.id);
				return {
					res: true,
					error: null,
					token
				};
			} catch (error) {
				return {
					res: false,
					error: error.message,
					token: null
				};
			}
		}
	}
};

export default resolvers;
