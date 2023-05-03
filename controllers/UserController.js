import { StatusCodes } from 'http-status-codes';

import UserModel from '../models/UserModel.js';
import { hashPassword, isValidPassword } from '../utils/bcrypt.js';
import {
	InternalServerError,
	BadRequestError,
	UnauthenticatedError
} from '../errors/CustomErrors.js';
import { createToken } from '../utils/jwt.js';

export const register = async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;
		if (!firstName || !lastName || !email || !password) {
			return BadRequestError(res, 'Заполните все поля');
		}

		const emailAlreadyExists = await UserModel.findOne({ email });
		if (emailAlreadyExists) {
			return BadRequestError(res, 'Данная электронная почта занята');
		}

		const hashedPassword = await hashPassword(password);
		const newUserDocument = UserModel({
			firstName,
			lastName,
			email,
			hashedPassword
		});
		const newUser = await newUserDocument.save();

		const token = createToken(newUser._id);

		res.status(StatusCodes.CREATED).json({ newUser, token });
	} catch (error) {
		InternalServerError(res, error);
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return BadRequestError(res, 'Заполните все поля');
		}

		const user = await UserModel.findOne({ email });

		if (!user) {
			return UnauthenticatedError(res, 'Неверный e-mail или пароль');
		}

		if (!(await isValidPassword(password, user._doc.hashedPassword))) {
			return UnauthenticatedError(res, 'Неверный e-mail или пароль');
		}

		const token = createToken(user._id);

		res.status(StatusCodes.OK).json({ user, token });
	} catch (error) {
		InternalServerError(res, error);
	}
};
