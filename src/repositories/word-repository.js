import WordModel from '../models/word-model.js';
import CategoryModel from '../models/category-model.js';

export const addNewWord = async wordData => {
	const { categoryId } = wordData;
	const word = await WordModel(wordData).save();
	await CategoryModel.findByIdAndUpdate(categoryId, {
		$addToSet: { words: word._id }
	});
	return word;
};

export const checkExistenseOfWord = async (eng, kaz) => {
	return await WordModel.countDocuments({
		$and: [{ eng: eng }, { kaz: kaz }]
	});
};

export const updateWordById = async (
	id,
	categoryId,
	eng,
	kaz,
	transcription
) => {
	const wordData = {
		eng,
		kaz,
		transcription
	};
	if (categoryId) {
		wordData['categoryId'] = categoryId;

		const word = await WordModel.findById(id);
		const { categoryId: oldCategoryId } = word;

		await CategoryModel.findByIdAndUpdate(oldCategoryId, {
			$pull: { words: id }
		});
		await CategoryModel.findByIdAndUpdate(categoryId, {
			$addToSet: { words: id }
		});
	}
	await WordModel.findByIdAndUpdate(id, wordData);
};

export const deleteWordById = async id => {
	await CategoryModel.updateOne({ words: id }, { $pull: { words: id } });
	await WordModel.findByIdAndDelete(id);
};

export const getWordById = async id => {
	return await WordModel.findById(id)
		.populate('categoryId', '-words -__v')
		.exec();
};
