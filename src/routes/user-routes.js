import { Router } from 'express';

import UserAuthorizationMiddleware from '../../middlewares/user-authorization-middleware.js';
import {
	register,
	login,
	getMe,
	updateUserData,
	regenerateActivationCode,
	activateAccount
} from '../controllers/user-controller.js';
import {
	registerValidator,
	loginValidator,
	updateValidator,
	activateValidator
} from '../validators/user-validator.js';

const router = Router();

router.route('/register').post(registerValidator, register);
router.route('/login').post(loginValidator, login);
router
	.route('/me')
	.get(UserAuthorizationMiddleware, getMe)
	.patch(UserAuthorizationMiddleware, updateValidator, updateUserData);
router
	.route('/regenerate')
	.patch(UserAuthorizationMiddleware, regenerateActivationCode);
router
	.route('/activate')
	.patch(UserAuthorizationMiddleware, activateValidator, activateAccount);

export default router;
