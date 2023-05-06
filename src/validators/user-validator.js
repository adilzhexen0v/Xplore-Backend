import validator from 'validator';
import { BadRequestError } from '../../errors/errors.js';

export const registerValidator = (req, res, next) => {
	const errors = [];
	const { firstName, lastName, email, password } = req.body;

	if (!firstName || !lastName || !email || !password) {
		errors.push('Заполните все поля');
	}

	if (!validator.isEmail(email)) {
		errors.push(
			'Пожалуйста, введите корректный адрес электронной почты, включая символ @'
		);
	}

	if (!validator.isStrongPassword(password, { minLength: 6 })) {
		errors.push(
			'Пароль должен быть не менее 8 символов и содержать как минимум одну заглавную букву, одну строчную букву, одну цифру и один специальный символ'
		);
	}

	if (errors.length > 0) {
		return BadRequestError(res, errors);
	}

	next();
};

export const loginValidator = (req, res, next) => {
	const errors = [];
	const { email, password } = req.body;

	if (!email || !password) {
		errors.push('Заполните все поля');
	}

	if (!validator.isEmail(email)) {
		errors.push(
			'Пожалуйста, введите корректный адрес электронной почты, включая символ @'
		);
	}

	if (!validator.isStrongPassword(password, { minLength: 6 })) {
		errors.push(
			'Пароль должен быть не менее 8 символов и содержать как минимум одну заглавную букву, одну строчную букву, одну цифру и один специальный символ'
		);
	}

	if (errors.length > 0) {
		return BadRequestError(res, errors);
	}

	next();
};

export const updateValidator = (req, res, next) => {
	const errors = [];
	const { firstName, lastName, email } = req.body;

	if (!firstName || !lastName || !email) {
		errors.push('Заполните все поля');
	}

	if (!validator.isEmail(email)) {
		errors.push(
			'Пожалуйста, введите корректный адрес электронной почты, включая символ @'
		);
	}

	if (errors.length > 0) {
		return BadRequestError(res, errors);
	}

	next();
};
