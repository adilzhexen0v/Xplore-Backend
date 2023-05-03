import express from 'express';

import connectDatabase from './db/DatabaseConnect.js';
import UserRoutes from './routes/UserRoutes.js';
import 'dotenv/config';

const app = express();
app.use(express.json());

app.use('/user', UserRoutes);

const port = process.env.PORT || 4000;
const start = async () => {
	try {
		await connectDatabase(process.env.DB_URL);
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}`)
		);
	} catch (error) {
		console.log(error);
	}
};
start();
