import jwt from 'jsonwebtoken';

import 'dotenv/config';

export const createToken = id => {
	return jwt.sign(
		{
			_id: id
		},
		process.env.JWT_SECRETKEY,
		{
			expiresIn: process.env.TOKEN_EXPIRATION_TIME
		}
	);
};
