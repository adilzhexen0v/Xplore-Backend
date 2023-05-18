import { Router } from 'express';

import UserAuthorizationMiddleware from '../../middlewares/user-authorization-middleware.js';
import {
	register,
	login,
	getMe,
	updateUserData,
	regenerateActivationCode,
	activateAccount,
	getUser
} from '../controllers/user-controller.js';
import {
	registerValidator,
	loginValidator,
	updateValidator,
	activateValidator
} from '../validators/user-validator.js';
import { checkIdParamValidator } from '../validators/validator-general-settings.js';

const router = Router();

router.route('/register').post(registerValidator, register);
router.route('/login').post(loginValidator, login);
router
	.route('/me')
	.get(UserAuthorizationMiddleware, getMe)
	.patch(UserAuthorizationMiddleware, updateValidator, updateUserData);
router.route('/:id').get(checkIdParamValidator, getUser);
router
	.route('/regenerate')
	.patch(UserAuthorizationMiddleware, regenerateActivationCode);
router
	.route('/activate')
	.patch(UserAuthorizationMiddleware, activateValidator, activateAccount);

export default router;
