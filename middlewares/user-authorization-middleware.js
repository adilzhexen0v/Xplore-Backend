import { verifyToken } from '../utils/jwt.js';
import { UnauthorizedError } from '../errors/errors.js';

export default (req, res, next) => {
	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
	if (token) {
		try {
			const decodedToken = verifyToken(token);
			req.userId = decodedToken._id;
			next();
		} catch (error) {
			return UnauthorizedError(res, 'Не получилось проверить токен');
		}
	} else {
		return UnauthorizedError(res, 'Нет доступа');
	}
};
