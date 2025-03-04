import prisma from "../../helpers/prisma"
import { ResultFunction } from "../../helpers/utils"
import { ReturnStatus } from "../../types/generic"
import { ICreateTask, IGetAll, IGetTask, IUpdateTask } from "../../types/tasks"

class Task {
    // public errorResponse(message: string) {
    //     ResultFunction(
    //         false,
    //         message,
    //         500,
    //         ReturnStatus.NOT_OK,
    //         null
    //     )
    // }

    // public notFound(message: string) {
    //     return ResultFunction(
    //         false,
    //         message,
    //         404,
    //         ReturnStatus.BAD_REQUEST,
    //         null
    //     )
    // }

    // public successResponse(message: string, data: any) {
    //     return ResultFunction(
    //         true,
    //         message,
    //         200,
    //         ReturnStatus.OK,
    //         data
    //     )
    // }

    public async getAllTasks(input: IGetAll) {
        const { user } = input
        try {
            const tasks = await prisma.task.findMany({
                where: {
                    userId: user.id,
                },
                orderBy: {
                    createdAt: "desc"
                }
            })

            if (!tasks) {
                return ResultFunction(
                    false,
                    'Tasks Not Found!',
                    404,
                    ReturnStatus.BAD_REQUEST,
                    null
                )
            }
            return ResultFunction(
                true,
                'All tasks',
                200,
                ReturnStatus.OK,
                tasks
            )
        } catch (error) {
            console.log(error);

            return ResultFunction(
                false,
                'Something went wrong!',
                500,
                ReturnStatus.NOT_OK,
                null
            )
        }

    }

    public async getTask(input: IGetTask) {
        const { id, user } = input

        // if (!id || id === "") {
        //     return ResultFunction(
        //         false,
        //         'Task id is required',
        //         500,
        //         ReturnStatus.BAD_REQUEST,
        //         null
        //     )
        // }

        try {
            const task = await prisma.task.findUnique({
                where: {
                    id: id,
                    userId: user.id
                }
            })

            if (!task) {
                return ResultFunction(
                    false,
                    'Task not found',
                    500,
                    ReturnStatus.NOT_OK,
                    null
                )
            }
            return ResultFunction(
                true,
                'Task returned sucessfully',
                200,
                ReturnStatus.OK,
                task
            )
        } catch (error) {
            console.log(error);

            return ResultFunction(
                false,
                'Something went wrong!',
                500,
                ReturnStatus.NOT_OK,
                null
            )
        }
    }

    public async createTask(input: ICreateTask) {
        const { user, task } = input

        // if (!task || task === "") {
        //     return ResultFunction(
        //         false,
        //         'Task is required',
        //         500,
        //         ReturnStatus.NOT_OK,
        //         null
        //     )
        // }

        try {
            const createdTask = await prisma.task.create({
                data: {
                    task,
                    userId: user.id,
                }
            })
            // return this.successResponse('', )
            return ResultFunction(
                true,
                'Task created sucessfully!',
                200,
                ReturnStatus.OK,
                createdTask
            )

        } catch (error) {
            console.log(error);

            return ResultFunction(
                false,
                'Something went wrong!',
                500,
                ReturnStatus.NOT_OK,
                null
            )
        }
    }

    public async updateTask(input: IUpdateTask) {
        const { user, id, task } = input

        // if (!id || id === "") {
        //     return ResultFunction(
        //         false,
        //         'Id of task is required!',
        //         500,
        //         ReturnStatus.NOT_OK,
        //         null
        //     )
        // }
        // if (!task || task === '') {
        //     return ResultFunction(
        //         false,
        //         'Task is required!',
        //         500,
        //         ReturnStatus.NOT_OK,
        //         null
        //     )
        // }

        try {
            const updatedTask = await prisma.task.update({
                where: {
                    id: id,
                    userId: user.id
                },
                data: {
                    task
                }
            })

            return ResultFunction(
                true,
                'Task updated successfully!',
                200,
                ReturnStatus.OK,
                updatedTask
            )
        } catch (error) {
            console.log(error);
            return ResultFunction(
                false,
                'Something went wrong!',
                500,
                ReturnStatus.NOT_OK,
                null
            )
        }
    }

    public async deleteTask(input: IGetTask) {
        const { id, user } = input

        // if (!id || id === "") {
        //     return ResultFunction(
        //         false,
        //         'Id of task is required!',
        //         500,
        //         ReturnStatus.NOT_OK,
        //         null
        //     )
        // }

        try {
            await prisma.task.delete({
                where: {
                    id: id,
                    userId: user.id
                }
            })

            return ResultFunction(
                true,
                'Delete successfull!',
                200,
                ReturnStatus.OK,
                null
            )
        } catch (error) {
            console.log(error);
            return ResultFunction(
                false,
                'Something went wrong!',
                500,
                ReturnStatus.NOT_OK,
                null
            )
        }
    }

    public async toggleCompleted(input: IGetTask) {
        const { id, user } = input

        // if (!id || id === "") {
        //     return ResultFunction(
        //         false,
        //         'Id of task is required!',
        //         500,
        //         ReturnStatus.NOT_OK,
        //         null
        //     )
        // }

        try {
            const task = await prisma.task.findUnique({
                where: {
                    id: id,
                    userId: user.id
                }
            })
            if (task) {

                const updatedTask = await prisma.task.update({
                    where: {
                        id: id,
                        userId: user.id
                    },
                    data: {
                        completed: !task.completed
                    }
                })
                return ResultFunction(
                    true,
                    'Task updated successfully!',
                    200,
                    ReturnStatus.OK,
                    updatedTask
                )
            }
            return ResultFunction(
                false,
                'Something went wrong!',
                500,
                ReturnStatus.NOT_OK,
                null
            )

        } catch (error) {
            console.log(error);

            return ResultFunction(
                false,
                'Something went wrong!',
                500,
                ReturnStatus.NOT_OK,
                null
            )
        }
    }
}

export default Task