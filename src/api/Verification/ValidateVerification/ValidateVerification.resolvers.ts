import { User } from "../../../entities/User";
import { Verification } from "../../../entities/Verification";
import { PHONE } from "../../../types/constants";
import {
	ValidateVerificationMutationArgs,
	ValidateVerificationResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authProtector } from "../../../utils/authProtector";
import { INVALID_KEY } from "./Errors";

const resolvers: Resolvers = {
	Mutation: {
		ValidateVerification: authProtector(
			async (
				_,
				args: ValidateVerificationMutationArgs,
				{ req }
			): Promise<ValidateVerificationResponse> => {
				const { payload, key } = args;
				const user: User = req.user;
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
							{ id: user.id },
							{
								phone: payload,
								isPhoneVerified: true
							}
						);
					} else {
						await User.update(
							{ id: user.id },
							{
								email: payload,
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
		)
	}
};

export default resolvers;
