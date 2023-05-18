import { Router } from 'express';

import {
	createNewWord,
	updateWord,
	deleteWord,
	getWord
} from '../controllers/word-controller.js';
import { createOrUpdateWordValidator } from '../validators/word-validator.js';

const router = Router();

router.route('/add').post(createOrUpdateWordValidator, createNewWord);
router
	.route('/:id')
	.get(getWord)
	.patch(createOrUpdateWordValidator, updateWord)
	.delete(deleteWord);

export default router;
