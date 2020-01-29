import { User } from "../../../entities/User";
import {
	EmailSignUpMutationArgs,
	EmailSignUpResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { createJWT } from "../../../utils/jwt";

const resolvers: Resolvers = {
	Mutation: {
		EmailSignUp: async (
			_,
			args: EmailSignUpMutationArgs
		): Promise<EmailSignUpResponse> => {
			try {
				const isExistedUser = await User.findOne({ ...args });
				if (isExistedUser) {
					return {
						res: false,
						error: "existed user, go to sign in instead",
						token: null
					};
				}

				const newUser = await User.create({ ...args }).save();
				if (!newUser) {
					return {
						res: false,
						error: "fail to sign up",
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
