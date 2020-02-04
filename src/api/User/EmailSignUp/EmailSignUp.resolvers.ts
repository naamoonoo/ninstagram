import { User } from "../../../entities/User";
import {
	EmailSignUpMutationArgs,
	EmailSignUpResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { createJWT } from "../../../utils/jwt";
import { DB_ERROR, EXISTED } from "./Errors";

const resolvers: Resolvers = {
	Mutation: {
		EmailSignUp: async (
			_,
			args: EmailSignUpMutationArgs
		): Promise<EmailSignUpResponse> => {
			const { email, firstName, lastName } = args;
			try {
				const isExistedUser = await User.findOne({
					email,
					firstName,
					lastName
				});
				if (isExistedUser) {
					return {
						res: false,
						error: EXISTED,
						token: null
					};
				}

				const newUser = await User.create({ ...args }).save();
				if (!newUser) {
					return {
						res: false,
						error: DB_ERROR,
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
