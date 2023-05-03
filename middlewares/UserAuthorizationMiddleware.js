import { verifyToken } from '../utils/jwt.js';
import { UnauthorizedUser } from '../errors/CustomErrors.js';

export default (req, res, next) => {
	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
	if (token) {
		try {
			const decodedToken = verifyToken(token);
			req.userId = decodedToken._id;
			next();
		} catch (error) {
			return UnauthorizedUser(res, 'Не получилось проверить токен');
		}
	} else {
		return UnauthorizedUser(res, 'Нет доступа');
	}
};
