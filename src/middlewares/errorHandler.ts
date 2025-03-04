import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { AxiosError } from 'axios';
import Logger from '../services/Logger';
import { ResultFunction } from '../helpers/utils';
import { JsonWebTokenError } from 'jsonwebtoken';
import { ReturnStatus } from '../types/generic';

const errorHandler = (
	err: ErrorRequestHandler | AxiosError,
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const logger = new Logger().logger;
	let message = 'Oops, something went wrong. Please try again later';
	let errCode = 422;

	console.log('error handler: ', (err as any).message);

	if (err instanceof JsonWebTokenError) {
		// Handle JWT errors
		message = 'Invalid or missing token';
		errCode = 403;
	} else if (err instanceof Error) {
		// Handle general errors
		message = err.message;
		errCode = 422;
	} else if (
		err instanceof SyntaxError ||
		err instanceof EvalError ||
		err instanceof RangeError ||
		err instanceof ReferenceError ||
		err instanceof TypeError ||
		err instanceof URIError
	) {
		// Handle global error types
		message = err.message;
		errCode = 400;
	}

	logger.error(`[${req.method} ${req.url}] ${message}`);

	const response = ResultFunction(false, message, errCode, ReturnStatus.NOT_OK, null);
	res.status(errCode).json(response);
};

export default errorHandler;
