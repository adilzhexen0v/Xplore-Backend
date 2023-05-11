import { StatusCodes } from 'http-status-codes';
import { generateActivationCode } from '../../utils/activation-code.js';
import UserModel from '../models/user-model.js';

export const createUser = async data => {
	return await UserModel(data).save();
};

export const getUserByEmail = async email => {
	return await UserModel.findOne({ email });
};

export const getUserById = async id => {
	return await UserModel.findById(id).select('-hashedPassword');
};

export const updateDataOfUser = async (id, data) => {
	await UserModel.findByIdAndUpdate(id, data);
};

export const regenerateCode = async id => {
	await UserModel.findByIdAndUpdate(id, {
		$set: { activationCode: generateActivationCode() }
	});
};

export const activateUser = async (id, codeFromRequest) => {
	const user = await getUserById(id);
	const currentTime = Date.now();
	const { code, expiresIn } = user._doc.activationCode;
	if (expiresIn > currentTime) {
		if (code === codeFromRequest) {
			await UserModel.findByIdAndUpdate(id, {
				$set: { isActivated: true },
				$unset: { activationCode: 1 }
			});
		} else {
			return StatusCodes.BAD_REQUEST;
		}
	} else {
		return StatusCodes.FORBIDDEN;
	}
};
