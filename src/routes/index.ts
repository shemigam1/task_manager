import { Request, Response, Router } from 'express';
import authRouter from './auth';
import { ResultFunction } from '../helpers/utils';
import { ReturnStatus } from '../types/generic';
// import authMiddleWare from '../middlewares/authMiddleware';
import taskRouter from './task';


const apiRouter = Router();

// define your routes
apiRouter.use('/auth', authRouter);
apiRouter.use('/task', taskRouter);

apiRouter.use('/hello', authMiddleWare, (req: Request, res: Response) => {
	const data = ResultFunction(
		true,
		'Welcome to task monitor api v1.0',
		200,
		ReturnStatus.OK,
		null
	);
	return res.status(data.code).json(data);
});

export default apiRouter;
