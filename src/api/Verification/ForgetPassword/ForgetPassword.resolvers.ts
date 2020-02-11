import { User } from "../../../entities/User";
import { Verification } from "../../../entities/Verification";
import { EMAIL, PHONE } from "../../../types/constants";
import {
	ForgetPasswordQueryArgs,
	ForgetPasswordResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { sendVerificationMail } from "../../../utils/email";
import { sendVerificationSMS } from "../../../utils/sms";
import { INVALID_TYPE, NON_EXIST } from "./errors";

const resolvers: Resolvers = {
	Query: {
		ForgetPassword: async (
			_,
			args: ForgetPasswordQueryArgs,
			{ req }
		): Promise<ForgetPasswordResponse> => {
			const { type, payload } = args;
			try {
				let user: User | undefined;
				if (type === PHONE) {
					user = await User.findOne({
						isPhoneVerified: true,
						phone: payload
					});
				} else if (type === EMAIL) {
					user = await User.findOne({
						isEmailVerified: true,
						email: payload
					});
				} else {
					return {
						res: false,
						error: INVALID_TYPE,
						key: null
					};
				}

				if (!user) {
					return {
						res: false,
						error: NON_EXIST,
						key: null
					};
				}

				const newVerification = await Verification.create({
					payload,
					type
				});

				const key = newVerification.generateKeyLengthOf(
					type === EMAIL ? 8 : 4
				);
				if (process.env.NODE_ENV === "production") {
					if (type === PHONE) {
						sendVerificationSMS(payload, key);
					} else {
						await sendVerificationMail(payload, key);
					}
				} else if (process.env.NODE_ENV === "development") {
					console.log(
						`[${type}] ${payload} verification code is [${key}]`
					);
				}
				return {
					res: true,
					error: null,
					key
				};
			} catch (error) {
				return {
					res: false,
					error: error.message,
					key: null
				};
			}
		}
	}
};

export default resolvers;
