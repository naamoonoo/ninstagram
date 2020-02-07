import { User } from "../../../entities/User";
import {
	EmailSignUpMutationArgs,
	EmailSignUpResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { createJWT } from "../../../utils/jwt";
import { DB_ERROR, EXISTED, INVALID_EMAIL, INVALID_PASSWORD } from "./Errors";

const resolvers: Resolvers = {
	Mutation: {
		EmailSignUp: async (
			_,
			args: EmailSignUpMutationArgs
		): Promise<EmailSignUpResponse> => {
			const { email, firstName, password } = args;
			try {
				const isExistedUser = await User.findOne({
					email,
					firstName
				});
				if (isExistedUser) {
					return {
						res: false,
						error: EXISTED,
						token: null
					};
				}
				const emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if (!emailValidation.test(email)) {
					return {
						res: false,
						error: INVALID_EMAIL,
						token: null
					};
				}
				const passwordValidation = new RegExp(
					"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
				);
				if (!passwordValidation.test(password)) {
					return {
						res: false,
						error: INVALID_PASSWORD,
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
