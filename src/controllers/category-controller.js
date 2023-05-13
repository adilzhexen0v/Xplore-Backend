import { StatusCodes } from 'http-status-codes';

import {
	ConflictError,
	InternalServerError,
	NotFoundError
} from '../../errors/errors.js';
import {
	createCategory,
	checkExistenseOfCategory,
	updateCategoryById,
	deleteCategoryById,
	getCategoryById
} from '../repositories/category-repository.js';

export const createNewCategoryOfWords = async (req, res) => {
	try {
		const { eng, kaz } = req.body;

		const categoryAlreadyExists = await checkExistenseOfCategory(
			eng,
			kaz
		);
		if (categoryAlreadyExists) {
			return ConflictError(res, 'Такая категория уже существует');
		}

		const categoryData = {
			eng,
			kaz
		};

		const newCategory = await createCategory(categoryData);
		res.status(StatusCodes.CREATED).json(newCategory);
	} catch (error) {
		InternalServerError(res, error);
	}
};

export const updateCategoryOfWords = async (req, res) => {
	try {
		const { id } = req.params;

		const { eng, kaz } = req.body;
		const categoryData = {
			eng,
			kaz
		};

		const categoryUpdated = await updateCategoryById(id, categoryData);
		if (!categoryUpdated) {
			return NotFoundError(res, 'Категория не была найдена');
		}

		res.status(StatusCodes.OK).json({
			message: 'Данные категории слов успешно обновлены'
		});
	} catch (error) {
		InternalServerError(res, error);
	}
};

export const deleteCategoryOfWords = async (req, res) => {
	try {
		const { id } = req.params;

		const categoryDeleted = await deleteCategoryById(id);
		if (!categoryDeleted) {
			return NotFoundError(res, 'Категория не была найдена');
		}

		res.status(StatusCodes.OK).json({
			message: 'Категория слов успешно удалена'
		});
	} catch (error) {
		InternalServerError(res, error);
	}
};

export const getCategoryOfWords = async (req, res) => {
	try {
		const { id } = req.params;

		const category = await getCategoryById(id);
		if (!category) {
			return NotFoundError(res, 'Категория слов не было найдено');
		}

		res.status(StatusCodes.OK).json(category);
	} catch (error) {
		InternalServerError(res, error);
	}
};
