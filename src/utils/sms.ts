import Twilio from "twilio";

export const sendVerificationSMS = (to: string, key: string) => {
	const twilioClient = Twilio(
		process.env.TWILIO_SID,
		process.env.TWILIO_TOKEN
	);
	const body = `[Ninstagram]Your verification code is : ${key}`;

	return twilioClient.messages.create({
		body,
		to,
		from: process.env.TWILIO_PHONE
	});
};
