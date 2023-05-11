import mongoose from 'mongoose';
import { generateActivationCode } from '../../utils/activation-code.js';
import 'dotenv/config';

const ActivationCodeSchema = mongoose.Schema(
	{
		code: {
			type: String,
			required: true,
			trim: true,
			maxlength: 6
		},
		expiresIn: {
			type: Number,
			required: true
		}
	},
	{ _id: false, timestamps: false }
);

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
		unique: true
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
	},
	isActivated: {
		type: Boolean,
		required: true,
		default: false
	},
	activationCode: {
		type: ActivationCodeSchema,
		required: true,
		default: generateActivationCode()
	}
});

export default mongoose.model('User', UserSchema);
