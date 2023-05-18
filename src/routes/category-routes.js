import { Router } from 'express';

import {
	createNewCategoryOfWords,
	updateCategoryOfWords,
	deleteCategoryOfWords,
	getCategoryOfWords
} from '../controllers/category-controller.js';
import {
	createCategoryValidator,
	updateCategoryValidator
} from '../validators/category-validator.js';
import { checkIdParamValidator } from '../validators/validator-general-settings.js';

const router = Router();

router.route('/create').post(createCategoryValidator, createNewCategoryOfWords);
router
	.route('/:id')
	.get(checkIdParamValidator, getCategoryOfWords)
	.patch(updateCategoryValidator, updateCategoryOfWords)
	.delete(checkIdParamValidator, deleteCategoryOfWords);

export default router;
