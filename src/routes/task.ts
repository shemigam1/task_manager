import { Router } from 'express';

import { loginController, signupController } from '../controllers/auth';
import joiMiddleware from '../middlewares/joiMiddleware';
// import { loginValidator, signupValidator } from '../validators/auth';
import { createTaskController, deleteTaskController, getAllTasksController, getTaskController, updateTaskController } from '../controllers/task'

const taskRouter = Router();

taskRouter.get('/', getAllTasksController);
taskRouter.get('/:id', getTaskController);
taskRouter.post('/', createTaskController);
taskRouter.put('/:id', updateTaskController);
taskRouter.delete('/:id', deleteTaskController);

export default taskRouter;
