import { User } from "../../../entities/User";
import {
	EmailSignInMutationArgs,
	EmailSignInResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { createJWT } from "../../../utils/jwt";

const resolvers: Resolvers = {
	Mutation: {
		EmailSignIn: async (
			_,
			args: EmailSignInMutationArgs
		): Promise<EmailSignInResponse> => {
			const { email, password } = args;
			try {
				const existedUser = await User.findOne({ email });
				if (!existedUser) {
					return {
						res: false,
						error: "user not existed, go to sign up instead",
						token: null
					};
				}

				const isValidPassword = await existedUser.comparePassword(
					password
				);
				if (isValidPassword) {
					const token = createJWT(existedUser.id);
					return {
						res: true,
						error: null,
						token
					};
				}
				return {
					res: false,
					error: "Invalid password",
					token: null
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
