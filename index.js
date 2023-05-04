import express from 'express';

import connectDatabase from './db/DatabaseConnect.js';
import UserRoutes from './src/routes/UserRoutes.js';
import morganMiddleware from './middlewares/MorganMiddleware.js';
import logger from './utils/logger.js';
import 'dotenv/config';

const app = express();
app.use(express.json());

app.use(morganMiddleware);

app.use('/user', UserRoutes);

const port = process.env.PORT || 4000;
const start = async () => {
	try {
		await connectDatabase(process.env.DB_URL);
		app.listen(port, () =>
			logger.info(`Server is listening on port ${port}`)
		);
	} catch (error) {
		logger.error(error.stack);
	}
};
start();
