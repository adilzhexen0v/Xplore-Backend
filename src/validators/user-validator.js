import {
	CustomValidator,
	createValidatorMiddleware
} from './validator-general-settings.js';
import 'dotenv/config';

const PASSWORD_PATTERN = process.env.VALIDATOR_PASSWORD_PATTERN;

const firstName = new CustomValidator('firstName')
	.string()
	.length()
	.getValidator();
const lastName = new CustomValidator('lastName')
	.string()
	.length()
	.getValidator();
const email = new CustomValidator('email').email().length().getValidator();
const password = new CustomValidator('password')
	.string()
	.length(8, 30)
	.matches(
		PASSWORD_PATTERN,
		'Пароль должен быть не менее 8 символов и содержать как минимум одну заглавную букву, одну строчную букву, одну цифру и один специальный символ'
	)
	.getValidator();

export const registerValidator = createValidatorMiddleware([
	firstName,
	lastName,
	email,
	password
]);
export const loginValidator = createValidatorMiddleware([email, password]);
export const updateValidator = createValidatorMiddleware([
	firstName,
	lastName,
	email
]);
