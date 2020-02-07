import { User } from "../../../entities/User";
import {
	UpdateUserMutationArgs,
	UpdateUserResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authProtector } from "../../../utils/authProtector";
import { getNoneNull } from "../../../utils/getNoneNull";
import { INVALID_PASSWORD } from "../EmailSignUp/Errors";
import { WRONG_PASSWORD } from "./errors";

const resolvers: Resolvers = {
	Mutation: {
		UpdateUser: authProtector(
			async (
				_,
				args: UpdateUserMutationArgs,
				{ req }
			): Promise<UpdateUserResponse> => {
				const user: User = req.user;
				try {
					const { password, newPassword, ...rest } = args;
					const nonNullArgs = getNoneNull(rest);
					if (password) {
						const res = await user.comparePassword(password);
						if (!res) {
							return {
								res: false,
								error: WRONG_PASSWORD
							};
						}
					}
					if (newPassword) {
						const passwordValidation = new RegExp(
							"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
						);
						if (!passwordValidation.test(newPassword)) {
							return {
								res: false,
								error: INVALID_PASSWORD
							};
						}
						user.password = newPassword;
						user.save();
					}
					await User.update({ id: user.id }, { ...nonNullArgs });
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
