export interface ICreateTask {
    task: string,
    user: any
}

export interface IUpdateTask {
    id: string,
    task: string,
    user: any
}

export interface IGetTask {
    id: string,
    user: any
}

export interface IGetAll {
    user: any
}