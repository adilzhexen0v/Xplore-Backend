import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'Введите свое имя'],
		trim: true,
		minlength: 2,
		maxlength: 30
	},
	lastName: {
		type: String,
		required: [true, 'Введите свою фамилию'],
		trim: true,
		minlength: 2,
		maxlength: 30
	},
	email: {
		type: String,
		required: [true, 'Введите свой e-mail'],
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: 'Пожалуйста, введите корректный адрес электронной почты, включая символ @.'
		}
	},
	hashedPassword: {
		type: String,
		required: [true, 'Введите свой пароль'],
		trim: true,
		minlength: 8
	},
	diamonds: {
		type: Number,
		required: true,
		min: 0,
		default: 0
	}
});

export default mongoose.model('User', UserSchema);
