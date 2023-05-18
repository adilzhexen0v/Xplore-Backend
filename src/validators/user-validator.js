import {
	CustomBodyValidator,
	createValidatorMiddleware
} from './validator-general-settings.js';
import 'dotenv/config';

const PASSWORD_PATTERN = process.env.VALIDATOR_PASSWORD_PATTERN;

const firstName = new CustomBodyValidator('firstName')
	.string()
	.length()
	.getValidator();
const lastName = new CustomBodyValidator('lastName')
	.string()
	.length()
	.getValidator();
const email = new CustomBodyValidator('email').email().length().getValidator();
const password = new CustomBodyValidator('password')
	.string()
	.length(8, 30)
	.matches(
		PASSWORD_PATTERN,
		'Пароль должен быть не менее 8 символов и содержать как минимум одну заглавную букву, одну строчную букву, одну цифру и один специальный символ'
	)
	.getValidator();

const code = new CustomBodyValidator('code')
	.string()
	.length(6, 6)
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
export const activateValidator = createValidatorMiddleware([code]);
