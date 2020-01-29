import { Verification } from "../../../entities/Verification";
import { EMAIL, PHONE } from "../../../types/constants";
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
			args: RequestVerificationMutationArgs,
			{ req }
		): Promise<RequestVerificationResponse> => {
			// user config
			const { type, payload } = args;
			try {
				const existedVerification = await Verification.findOne({
					type,
					payload
				});
				if (existedVerification) {
					existedVerification.remove();
				}
				const newVerification = await Verification.create({
					type,
					payload
				}).save();
				const { key, payload: to } = newVerification;
				if (type === PHONE) {
					sendVerificationSMS(to, key);
				} else if (type === EMAIL) {
					await sendVerificationMail(to, key);
				} else {
					return {
						res: false,
						error: "Invalid Type"
					};
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
