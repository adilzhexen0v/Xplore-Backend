import bcrypt from 'bcrypt';

export const hashPassword = async (passwd, saltRounds = 10) => {
	try {
		const salt = await bcrypt.genSalt(saltRounds);
		return await bcrypt.hash(passwd, salt);
	} catch (error) {
		console.log(error);
	}
};

export const isValidPassword = async (passwordFromRequest, hashedPassword) => {
	try {
		return await bcrypt.compare(passwordFromRequest, hashedPassword);
	} catch (error) {
		console.log(object);
	}
};
