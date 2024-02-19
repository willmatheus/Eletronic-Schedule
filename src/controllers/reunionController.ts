import * as reunionModels from '../models/reunionModels';
import { Request, Response } from 'express'; 


export const showAllReunions = async (_req: Request, res: Response) => {
    const allReunions = await reunionModels.showAllReunions();

    return res.status(200).json(allReunions);
}

export const createReunion = async (req: Request, res: Response) => {
    const createdreunion = await reunionModels.createReunion(req.body);

    return res.status(201).json(createdreunion);
}

export const deleteReunion = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedReunion = await reunionModels.deleteReunion(id);

    return res.status(204).json(deletedReunion);
}

export const updateReunion = async (req: Request, res: Response) => {
    const { id } = req.params;

    const updatedReunion = await reunionModels.updateReunion(id, req.body);

    return res.status(200).json(updatedReunion);
}