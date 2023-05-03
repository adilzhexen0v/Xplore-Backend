import { StatusCodes } from 'http-status-codes';

export const InternalServerError = async (res, error) => {
	console.log(error);
	return res
		.status(StatusCodes.INTERNAL_SERVER_ERROR)
		.json({ error: error.message });
};

export const BadRequestError = async (res, message) => {
	return res
		.status(StatusCodes.BAD_REQUEST)
		.json({ error: message || 'Bad request' });
};

export const UnauthenticatedError = async (res, message) => {
	return res
		.status(StatusCodes.UNAUTHORIZED)
		.json({ error: message || 'Unauthenticated' });
};
