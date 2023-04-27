import bcrypt from 'bcrypt';

export const hashPassword = async (passwd, saltRounds = 10) => {
	try {
		const salt = await bcrypt.genSalt(saltRounds);
		return await bcrypt.hash(passwd, salt);
	} catch (error) {
		console.log(error);
	}
};
