import mongoose from 'mongoose';

const WordSchema = mongoose.Schema(
	{
		categoryId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
			required: false
		},
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
		transcription: {
			type: String,
			required: true,
			trim: true
		}
	},
	{ timestamps: false }
);

export default mongoose.model('Word', WordSchema);
