import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const connectDatabase = url => {
	return mongoose.connect(url);
};

export default connectDatabase;
