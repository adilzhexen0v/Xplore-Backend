import express from 'express';

import connectDatabase from './db/database-connect.js';
import userRoutes from './src/routes/user-routes.js';
import morganMiddleware from './middlewares/morgan-middleware.js';
import logger from './utils/logger.js';
import 'dotenv/config';

const app = express();
app.use(express.json());

app.use(morganMiddleware);

app.use('/user', userRoutes);

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
