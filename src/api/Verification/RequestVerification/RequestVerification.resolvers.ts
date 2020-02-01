import { PHONE } from "../../../constants";
import { Verification } from "../../../entities/Verification";
import {
	RequestVerificationMutationArgs,
	RequestVerificationResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { sendVerificationMail } from "../../../utils/email";
import { sendVerificationSMS } from "../../../utils/sms";

const resolvers: Resolvers = {
	Mutation: {
		RequestVerification: async (
			_,
			args: RequestVerificationMutationArgs
		): Promise<RequestVerificationResponse> => {
			const { type, payload } = args;
			try {
				const existedVerification = await Verification.findOne({
					type,
					payload
				});
				if (existedVerification) {
					if (existedVerification.isVerified === false) {
						existedVerification.remove();
					} else {
						return {
							res: false,
							error: "It already has a related user"
						};
					}
				}
				const newVerification = await Verification.create({
					type,
					payload
				}).save();
				const { key, payload: to } = newVerification;
				if (type === PHONE) {
					sendVerificationSMS(to, key);
				} else {
					await sendVerificationMail(to, key);
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
