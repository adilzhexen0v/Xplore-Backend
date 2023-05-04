import { Router } from 'express';

import UserAuthorizationMiddleware from '../../middlewares/UserAuthorizationMiddleware.js';
import {
	register,
	login,
	getMe,
	updateUserData
} from '../controllers/UserController.js';

const router = Router();

router.route('/register').post(register);
router.route('/login').post(login);
router
	.route('/me')
	.get(UserAuthorizationMiddleware, getMe)
	.patch(UserAuthorizationMiddleware, updateUserData);

export default router;
