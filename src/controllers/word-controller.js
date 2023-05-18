import { StatusCodes } from 'http-status-codes';

import {
	BadRequestError,
	ConflictError,
	InternalServerError,
	NotFoundError
} from '../../errors/errors.js';
import {
	addNewWord,
	checkExistenseOfWord,
	getWordById,
	deleteWordById,
	updateWordById
} from '../repositories/word-repository.js';

export const createNewWord = async (req, res) => {
	try {
		const { categoryId, eng, kaz, transcription } = req.body;

		const wordData = {
			categoryId,
			eng,
			kaz,
			transcription
		};

		if (await checkExistenseOfWord(eng, kaz)) {
			return ConflictError(res, 'Данное слово уже существует');
		}

		const word = await addNewWord(wordData);
		res.status(StatusCodes.CREATED).json(word);
	} catch (error) {
		InternalServerError(res, error);
	}
};

export const getWord = async (req, res) => {
	const { id } = req.params;

	const word = await getWordById(id);
	if (!word) {
		return NotFoundError(res, 'Слово не было найдено');
	}
	res.status(StatusCodes.OK).json(word);
};

export const updateWord = async (req, res) => {
	try {
		const { categoryId, eng, kaz, transcription } = req.body;
		const { id } = req.params;
		if (!id) {
			return BadRequestError(res, 'Не найден id');
		}

		await updateWordById(id, categoryId, eng, kaz, transcription);
		res.status(StatusCodes.OK).json({
			message: 'Данные успешно обновлены'
		});
	} catch (error) {
		InternalServerError(res, error);
	}
};

export const deleteWord = async (req, res) => {
	try {
		const { id } = req.params;

		await deleteWordById(id);
		res.status(StatusCodes.OK).json({
			message: 'Данное слово успешно удалено'
		});
	} catch (error) {
		InternalServerError(res, error);
	}
};
