import { StatusCodes } from 'http-status-codes';

import {
	createUser,
	getUserByEmail,
	getUserById,
	updateDataOfUser,
	regenerateCode,
	activateUser
} from '../repositories/user-repository.js';
import {
	InternalServerError,
	BadRequestError,
	UnauthenticatedError,
	NotFoundError,
	ConflictError,
	UnauthorizedError
} from '../../errors/errors.js';
import { hashPassword, isValidPassword } from '../../utils/bcrypt.js';
import { createToken } from '../../utils/jwt.js';
import { sendActivationCode } from '../../services/nodemailer.js';

export const register = async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;

		const emailAlreadyExists = await getUserByEmail(email);
		if (emailAlreadyExists) {
			return ConflictError(res, 'Данная электронная почта занята');
		}

		const hashedPassword = await hashPassword(password);
		const userData = {
			firstName,
			lastName,
			email,
			hashedPassword
		};
		const newUser = await createUser(userData);

		const token = createToken(newUser._id);
		const { code } = newUser._doc.activationCode;
		await sendActivationCode(code, email);

		res.status(StatusCodes.CREATED).json({ newUser, token });
	} catch (error) {
		InternalServerError(res, error);
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await getUserByEmail(email);
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

export const getMe = async (req, res) => {
	try {
		const id = req.userId;
		if (!id) {
			return BadRequestError(res, 'Не найден id');
		}
		const user = await getUserById(id);
		if (!user) {
			return NotFoundError(res, 'Пользователь не найден');
		}

		res.status(StatusCodes.OK).json(user);
	} catch (error) {
		InternalServerError(res, error);
	}
};

export const getUser = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id) {
			return BadRequestError(res, 'Не найден id');
		}

		const user = await getUserById(id);
		if (!user) {
			return NotFoundError(res, 'Пользователь не найден');
		}

		res.status(StatusCodes.OK).json(user);
	} catch (error) {
		InternalServerError(res, error);
	}
};

export const updateUserData = async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;

		const userData = {
			firstName,
			lastName,
			email,
			password
		};

		await updateDataOfUser(req.userId, userData);
		res.status(StatusCodes.OK).json({
			message: 'Данные пользователя успешно обновлены'
		});
	} catch (error) {
		InternalServerError(res, error);
	}
};

export const regenerateActivationCode = async (req, res) => {
	try {
		const id = req.userId;
		if (!id) {
			return BadRequestError(res, 'Не найден id');
		}

		await regenerateCode(id);

		const user = await getUserById(id);
		const { email } = user._doc;
		const { code } = user._doc.activationCode;

		await sendActivationCode(code, email);

		res.status(StatusCodes.OK).json({
			message: 'Вам прислали новый код активации'
		});
	} catch (error) {
		InternalServerError(res, error);
	}
};

export const activateAccount = async (req, res) => {
	try {
		const { code } = req.body;
		const id = req.userId;
		if (!id) {
			return BadRequestError(res, 'Не найден id');
		}

		const errorCode = await activateUser(id, code);
		if (errorCode === StatusCodes.BAD_REQUEST) {
			return BadRequestError(res, 'Неверный код активации');
		} else if (errorCode === StatusCodes.FORBIDDEN) {
			return UnauthorizedError(res, 'Время доступа кода активации истекло');
		}

		res.status(StatusCodes.OK).json({
			message: 'Ваш аккаунт успешно активирован'
		});
	} catch (error) {
		InternalServerError(res, error);
	}
};
