import * as taskModels from '../models/taskModels';
import { Request, Response } from 'express'; 


export const showAllTasks = async (_req: Request, res: Response) => {
    const allTasks = await taskModels.showAllTasks();

    return res.status(200).json(allTasks);
}

export const createTask = async (req: Request, res: Response) => {
    const createdTask = await taskModels.createTask(req.body);

    return res.status(201).json(createdTask);
}

export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedTask = await taskModels.deleteTask(id);

    return res.status(204).json(deletedTask);
}

export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;

    const updatedTask = await taskModels.updateTask(id, req.body);

    return res.status(200).json(updatedTask);
}