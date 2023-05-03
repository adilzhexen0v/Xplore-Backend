import { Router } from 'express';

import {
	register,
	login,
	getMe,
	updateUserData
} from '../controllers/UserController.js';
import UserAuthorizationMiddleware from '../middlewares/UserAuthorizationMiddleware.js';

const router = Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/me').get(UserAuthorizationMiddleware, getMe);
router.route('/update').patch(UserAuthorizationMiddleware, updateUserData);

export default router;
