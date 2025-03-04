import { NextFunction, Request, Response } from 'express';
import { ISignup, ILogin } from '../types/auth';
import { taskFactory } from '../services/factories';
import { ICreateTask, IGetAll, IGetTask, IUpdateTask } from '../types/tasks';

export const getAllTasksController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: IGetAll = {
        user: res.locals.user,
    }
    const response = await taskFactory().getAllTasks(input);
    return res.status(response.code).json(response);
};
export const getTaskController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // console.log('entered controller');
    const input: IGetTask = {
        id: req.params.id,
        user: res.locals.user,
    };
    const response = await taskFactory().getTask(input);
    return res.status(response.code).json(response);
};

export const createTaskController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: ICreateTask = {
        task: req.body.task,
        user: res.locals.user,
    };
    // console.log(res.locals.user);

    const response = await taskFactory().createTask(input);
    return res.status(response.code).json(response);
}

export const updateTaskController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: IUpdateTask = {
        id: req.params.id,
        task: req.body.task,
        user: res.locals.user,
    };
    const response = await taskFactory().updateTask(input);
    return res.status(response.code).json(response);
}

export const toggleCompleteTaskController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: IGetTask = {
        id: req.params.id,
        user: res.locals.user,
    };
    const response = await taskFactory().toggleCompleted(input);
    return res.status(response.code).json(response);
}

export const deleteTaskController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: IGetTask = {
        id: req.params.id,
        user: res.locals.user
    };
    const response = await taskFactory().deleteTask(input);
    return res.status(response.code).json(response);
}