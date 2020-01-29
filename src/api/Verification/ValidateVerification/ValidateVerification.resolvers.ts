// import { EMAIL, PHONE } from "../../../constants";
// import { User } from "../../../entities/User";
import { Verification } from "../../../entities/Verification";
import {
	ValidateVerificationMutationArgs,
	ValidateVerificationResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

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
						error: "Invalid key"
					};
				}
				verification.isVerified = true;
				verification.save();
				// } else if (verification.type === EMAIL) {
				// if (verification.type === PHONE) {
				// 	await User.update(
				// 		{
				// 			phone: verification.payload
				// 		},
				// 		{
				// 			isPhoneVerified: true
				// 		}
				// 	);
				// } else {
				// 	await User.update(
				// 		{
				// 			email: verification.payload
				// 		},
				// 		{
				// 			isEmailVerified: true
				// 		}
				// 	);
				// }
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
