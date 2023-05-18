import {
	CustomValidator,
	createValidatorMiddleware
} from './validator-general-settings.js';

const categoryId = new CustomValidator('categoryId').objectId().getValidator();
const eng = new CustomValidator('eng').string().getValidator();
const kaz = new CustomValidator('kaz').string().getValidator();
const transcription = new CustomValidator('transcription')
	.string()
	.getValidator();

export const createOrUpdateWordValidator = createValidatorMiddleware([
	categoryId,
	eng,
	kaz,
	transcription
]);
