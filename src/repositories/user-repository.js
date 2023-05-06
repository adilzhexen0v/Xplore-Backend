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
