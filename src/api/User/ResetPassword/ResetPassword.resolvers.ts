import { User } from "../../../entities/User";
import {
	ResetPasswordMutationArgs,
	ResetPasswordResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { getNoneNull } from "../../../utils/getNoneNull";
import { createJWT } from "../../../utils/jwt";
import { NON_EXISTED, SAME_PASSWORD } from "./errors";

const resolvers: Resolvers = {
	Mutation: {
		ResetPassword: async (
			_,
			args: ResetPasswordMutationArgs,
			{ req }
		): Promise<ResetPasswordResponse> => {
			const { password, ...rest } = args;
			const nonNull = getNoneNull(rest);
			try {
				const user = await User.findOne({ ...nonNull });
				if (!user) {
					return {
						res: false,
						error: NON_EXISTED,
						token: null
					};
				}
				const isSamePassword = await user.comparePassword(password);
				if (isSamePassword) {
					return {
						res: false,
						error: SAME_PASSWORD,
						token: null
					};
				}

				user.password = password;
				user.save();
				const token = await createJWT(user.id);
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
