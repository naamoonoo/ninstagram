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
					// user
				});
				if (verification) {
					verification.isVerified = true;
					verification.save();
					return {
						res: true,
						error: null
					};
				} else {
					return {
						res: false,
						error: "Invalid key"
					};
				}
			} catch (error) {
				return {
					res: false,
					error: error.message
				};
			}
			return {
				res: true,
				error: null
			};
		}
	}
};

export default resolvers;
