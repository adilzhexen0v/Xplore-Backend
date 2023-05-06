import { Router } from 'express';

import UserAuthorizationMiddleware from '../../middlewares/user-authorization-middleware.js';
import {
	register,
	login,
	getMe,
	updateUserData
} from '../controllers/user-controller.js';
import {
	registerValidator,
	loginValidator,
	updateValidator
} from '../validators/user-validator.js';

const router = Router();

router.route('/register').post(registerValidator, register);
router.route('/login').post(loginValidator, login);
router
	.route('/me')
	.get(UserAuthorizationMiddleware, getMe)
	.patch(UserAuthorizationMiddleware, updateUserData);

export default router;
