import * as eventModels from '../models/eventModels';
import { Request, Response } from 'express'; 


export const showAllEvents = async (_req: Request, res: Response) => {
    const allEvents = await eventModels.showAllEvents();

    return res.status(200).json(allEvents);
}

export const createEvent = async (req: Request, res: Response) => {
    const createdEvent = await eventModels.createEvent(req.body);

    return res.status(201).json(createdEvent);
}

export const deleteEvent = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedEvent = await eventModels.deleteEvent(id);

    return res.status(204).json(deletedEvent);
}

export const updateEvent = async (req: Request, res: Response) => {
    const { id } = req.params;

    const updatedEvent = await eventModels.updateEvent(id, req.body);

    return res.status(200).json(updatedEvent);
}