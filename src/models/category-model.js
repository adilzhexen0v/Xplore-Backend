import mongoose from 'mongoose';

const CategorySchema = mongoose.Schema(
	{
		eng: {
			type: String,
			required: true,
			trim: true
		},
		kaz: {
			type: String,
			required: true,
			trim: true
		},
		words: {
			type: [mongoose.Schema.Types.ObjectId],
			required: true,
			default: []
		}
	},
	{ timestamps: false }
);

export default mongoose.model('Category', CategorySchema);
