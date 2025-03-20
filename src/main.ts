import express, { Request, Response } from 'express';
import cors from 'cors';
import apiRouter from './routes';
// import conn from './database/connect';
import errorHandler from './middlewares/errorHandler';
// import { PrismaClient } from '@prisma/client'
// import { initi } from 'test-agent-copy';
// import { initializeTelexSDK } from 'telex-error-agent'
import { initializeTelexSDK } from 'code-error-telex-agent-handler'


// const prisma = new PrismaClient()


const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/api/v1', apiRouter);

app.use('**', (req: Request, res: Response) => {
	return res.status(404).send('NOT FOUND');
});
// gg
// jsjbajsb
// shsahahsha

try {
	setTimeout(() => {
		console.error('erorr for telex')
		console.error('erorr for telex')
		console.error('erorr for telex')
		console.error('erorr for telex')
	})

} catch (error) {
	console.error('erorr for telex caught')
}

app.use(errorHandler);


// process.on('SIGINT', async () => {
// 	await prisma.$disconnect();
// 	process.exit(0);
// });

// process.on('SIGTERM', async () => {
// 	await prisma.$disconnect();
// 	process.exit(0);
// });

const init = async () => {
	await initializeTelexSDK({
		channelId
			: "01959417-7ea6-78ab-85ac-493ac366ff0e",
	})
}

init()


app.listen(PORT, async () => {
	// await conn;
	console.log(`Listening on ${PORT}`);
});
