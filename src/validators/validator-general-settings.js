import { body, validationResult } from 'express-validator';

import { BadRequestError } from '../../errors/errors.js';
import 'dotenv/config';

const FIELD_MIN_LENGTH = +process.env.VALIDATOR_FIELD_MIN_LENGTH;
const FIELD_MAX_LENGTH = +process.env.VALIDATOR_FIELD_MAX_LENGTH;

export const createValidatorMiddleware = array => {
	return array.concat([
		(req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return BadRequestError(res, errors);
			next();
		}
	]);
};

export class CustomValidator {
	constructor(fieldName) {
		this.validator = body(fieldName)
			.exists({ checkFalsy: true })
			.withMessage('Это обязательное поле');
		this.fieldName = fieldName;
	}

	string() {
		this.validator = this.validator
			.isString()
			.withMessage('Это значение должно быть строкой');
		return this;
	}

	length(min = FIELD_MIN_LENGTH, max = FIELD_MAX_LENGTH) {
		this.validator = this.validator
			.isLength({ min, max })
			.withMessage(
				`Длина этого поля должна быть от ${min} до ${max} символов`
			);
		return this;
	}

	email() {
		this.validator = this.validator
			.isEmail()
			.withMessage(
				'Это не корректный адрес электронной почты (включите символ @)'
			);
		return this;
	}

	objectId() {
		this.validator = this.validator
			.isMongoId()
			.withMessage('Это значение должно быть ObjectID');
		return this;
	}

	matches(pattern, message) {
		this.validator = this.validator.matches(pattern).withMessage(message);
		return this;
	}

	getValidator() {
		return this.validator;
	}
}
