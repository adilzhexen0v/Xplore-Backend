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

const router = Router();

router.route('/create').post(createCategoryValidator, createNewCategoryOfWords);
router
	.route('/:id')
	.get(getCategoryOfWords)
	.patch(updateCategoryValidator, updateCategoryOfWords)
	.delete(deleteCategoryOfWords);

export default router;
