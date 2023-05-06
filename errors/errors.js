import { StatusCodes } from 'http-status-codes';

import logger from '../utils/logger.js';

export const InternalServerError = async (res, error) => {
	logger.error(error.message);
	return res
		.status(StatusCodes.INTERNAL_SERVER_ERROR)
		.json({ error: error.message });
};

export const BadRequestError = async (res, message) => {
	logger.warn(message);
	return res
		.status(StatusCodes.BAD_REQUEST)
		.json({ error: message || 'Bad request' });
};

export const UnauthorizedUser = async (res, message) => {
	logger.warn(message);
	return res
		.status(StatusCodes.FORBIDDEN)
		.json({ error: message || 'Unauthorized' });
};
4;

export const UnauthenticatedError = async (res, message) => {
	logger.warn(message);
	return res
		.status(StatusCodes.UNAUTHORIZED)
		.json({ error: message || 'Unauthenticated' });
};

export const NotFoundError = async (res, message) => {
	logger.warn(message);
	return res
		.status(StatusCodes.NOT_FOUND)
		.json({ error: message || 'Not found' });
};

export const ConflictError = async (res, message) => {
	logger.warn(message);
	return res
		.status(StatusCodes.CONFLICT)
		.json({ error: message || 'Conflict' });
};
