import { Router } from 'express';

import {
	createNewWord,
	updateWord,
	deleteWord,
	getWord
} from '../controllers/word-controller.js';
import {
	createWordValidator,
	updateWordValidator
} from '../validators/word-validator.js';
import { checkIdParamValidator } from '../validators/validator-general-settings.js';

const router = Router();

router.route('/add').post(createWordValidator, createNewWord);
router
	.route('/:id')
	.get(checkIdParamValidator, getWord)
	.patch(updateWordValidator, updateWord)
	.delete(checkIdParamValidator, deleteWord);

export default router;
