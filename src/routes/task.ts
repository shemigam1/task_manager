import { Router } from 'express';

import { loginController, signupController } from '../controllers/auth';
import joiMiddleware from '../middlewares/joiMiddleware';
// import { loginValidator, signupValidator } from '../validators/auth';
import { createTaskController, deleteTaskController, getAllTasksController, getTaskController, toggleCompleteTaskController, updateTaskController } from '../controllers/task'
import authMiddleWare from '../middlewares/authMiddleware';
import { get } from 'node:https';
import { createTaskValidator, getTaskValidator, updateTaskValidator } from '../validators/task';

const taskRouter = Router();

taskRouter.get('/', authMiddleWare, getAllTasksController);
taskRouter.get('/:id', authMiddleWare, joiMiddleware(getTaskValidator), getTaskController);
taskRouter.post('/', authMiddleWare, joiMiddleware(createTaskValidator), createTaskController);
taskRouter.put('/:id', authMiddleWare, joiMiddleware(updateTaskValidator), updateTaskController);
taskRouter.put('/complete/:id', authMiddleWare, toggleCompleteTaskController);
taskRouter.delete('/:id', authMiddleWare, joiMiddleware(getTaskValidator), deleteTaskController);

export default taskRouter;
