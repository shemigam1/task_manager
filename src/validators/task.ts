import { IGetTask, IUpdateTask, ICreateTask } from "../types/tasks";
import Joi from "joi";

export const getTaskValidator = Joi.object<IGetTask>({
    id: Joi.string().alphanum().required().min(1)
})

export const createTaskValidator = Joi.object<ICreateTask>({
    task: Joi.string().required().min(3)
})

export const updateTaskValidator = Joi.object<IUpdateTask>({
    id: Joi.string().alphanum().required().min(1),
    task: Joi.string().required().min(3)
})