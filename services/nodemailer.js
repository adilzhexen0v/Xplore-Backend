import nodemailer from 'nodemailer';

import logger from '../utils/logger.js';
import 'dotenv/config';
import { createEmailHTML } from '../utils/activation-code.js';

const EMAIL = process.env.NODEMAILER_MAIL;
const PASSWORD = process.env.NODEMAILER_PASSWORD;

const transporter = nodemailer.createTransport({
	host: 'smtp-mail.outlook.com',
	secureConnection: true,
	port: 587,
	auth: {
		user: EMAIL,
		pass: PASSWORD
	}
});

export const sendActivationCode = async (code, email) => {
	try {
		const mailOptions = {
			from: EMAIL,
			to: email,
			subject: 'Активация аккаунта ✔',
			html: createEmailHTML(code)
		};
		const info = await transporter.sendMail(mailOptions);
		logger.info(info);
	} catch (error) {
		logger.error(error);
	}
};
