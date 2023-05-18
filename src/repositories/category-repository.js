import CategoryModel from '../models/category-model.js';

export const createCategory = async data => {
	return await CategoryModel(data).save();
};

export const checkExistenseOfCategory = async (eng, kaz) => {
	return await CategoryModel.countDocuments({
		$or: [{ eng: eng }, { kaz: kaz }]
	});
};

export const getCategoryById = async id => {
	return await CategoryModel.findById(id)
		.populate('words', '-categoryId -__v')
		.exec();
};

export const updateCategoryById = async (id, data) => {
	return await CategoryModel.findByIdAndUpdate(id, data);
};

export const deleteCategoryById = async id => {
	return await CategoryModel.findByIdAndDelete(id);
};
