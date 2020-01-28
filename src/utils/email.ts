import nodemailer from "nodemailer";

const getTransporter = async () => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.MAIL_ADDR,
			pass: process.env.MAIL_PASS
		}
	});

	return transporter;
};

export const sendVerificationMail = async (to: string, key: string) => {
	const transporter = await getTransporter();

	const subject = "[Ninstagram]Verify your email";
	// const url =
	// 	process.env.NODE_ENV === "development"
	// 		? `http://localhost:4000/verification/config?to=${to}&key=${key}`
	// 		: "";
	const url = `http://localhost:4000/verification/config?to=${to}&key=${key}`;
	const html = `
		<div>your verfication key is <u>${key}</u></div>
		<div>or click <a href=${url}>here</a> to verify your email</div>
	`;

	await transporter.sendMail({
		from: process.env.MAIL_ADDR, // sender address
		to,
		subject,
		html
	});
};
