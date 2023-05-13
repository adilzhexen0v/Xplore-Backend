import {
	CustomValidator,
	createValidatorMiddleware
} from './validator-general-settings.js';

const eng = new CustomValidator('eng').string().getValidator();
const kaz = new CustomValidator('kaz').string().getValidator();

export const createCategoryValidator = createValidatorMiddleware([eng, kaz]);
export const updateCategoryValidator = createValidatorMiddleware([eng, kaz]);
