import { StatusCodes } from 'http-status-codes';

import UserModel from '../models/UserModel.js';
import { hashPassword } from '../utils/bcrypt.js';

export const register = async (req, res) => {
	const { firstName, lastName, email } = req.body;
	const password = await hashPassword(req.body.password);

	const newUserDocument = UserModel({
		firstName,
		lastName,
		email,
		password
	});
	const newUser = await newUserDocument.save();

	res.status(StatusCodes.CREATED).json(newUser);
};
