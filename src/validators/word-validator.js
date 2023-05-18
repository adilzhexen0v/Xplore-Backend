import {
	CustomBodyValidator,
	createValidatorMiddleware
} from './validator-general-settings.js';

const categoryId = new CustomBodyValidator('categoryId')
	.objectId()
	.getValidator();
const eng = new CustomBodyValidator('eng').string().getValidator();
const kaz = new CustomBodyValidator('kaz').string().getValidator();
const transcription = new CustomBodyValidator('transcription')
	.string()
	.getValidator();

export const createWordValidator = createValidatorMiddleware([
	categoryId,
	eng,
	kaz,
	transcription
]);

export const updateWordValidator = createValidatorMiddleware([
	wordId,
	categoryId,
	eng,
	kaz,
	transcription
]);
