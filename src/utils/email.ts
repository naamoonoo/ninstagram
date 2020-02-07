import nodemailer from "nodemailer";

const url =
	process.env.NODE_ENV === "development"
		? `http://localhost:3000`
		: "https://project-ninstagram.herokuapp.com";
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
	const fullUrl = `${url}/verification/${key}`;
	const html = `
		<div>your verfication key is <u>${key}</u></div>
		<div>or click <a href=${fullUrl}>here</a> to verify your email</div>
	`;

	await transporter.sendMail({
		from: process.env.MAIL_ADDR, // sender address
		to,
		subject,
		html
	});
};

export const sendNewComment = async (to: string, feedId: string) => {
	const transporter = await getTransporter();

	const subject = "[Ninstagram]You have new comments";
	const fullUrl = `${url}/feed/${feedId}`;
	const html = `
		<div>Someone is interested in your feed, and leave a comment for you!</div>
		<div>Please check with easy, just click <a href=${fullUrl}>here</a></div>
	`;

	await transporter.sendMail({
		from: process.env.MAIL_ADDR, // sender address
		to,
		subject,
		html
	});
};
