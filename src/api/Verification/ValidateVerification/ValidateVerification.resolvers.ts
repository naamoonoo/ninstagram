import { PHONE } from "../../../constants";
import { User } from "../../../entities/User";
import { Verification } from "../../../entities/Verification";
import {
	ValidateVerificationMutationArgs,
	ValidateVerificationResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { INVALID_KEY } from "./Errors";

const resolvers: Resolvers = {
	Mutation: {
		ValidateVerification: async (
			_,
			args: ValidateVerificationMutationArgs,
			{ req }
		): Promise<ValidateVerificationResponse> => {
			const { payload, key } = args;
			try {
				const verification = await Verification.findOne({
					payload,
					key
				});
				if (!verification) {
					return {
						res: false,
						error: INVALID_KEY
					};
				}
				await Verification.update(
					{ id: verification.id },
					{ isVerified: true }
				);
				if (verification.type === PHONE) {
					await User.update(
						{
							phone: verification.payload
						},
						{
							isPhoneVerified: true
						}
					);
				} else {
					await User.update(
						{
							email: verification.payload
						},
						{
							isEmailVerified: true
						}
					);
				}
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
	}
};

export default resolvers;
