import express from 'express';
import * as taskController from './controllers/taskController';
import * as eventController from './controllers/eventController';
import * as reunionController from './controllers/reunionController';


export const router = express.Router();


// tasks
router.get('/tarefas', taskController.showAllTasks);

router.post('/tarefas', taskController.createTask);

router.delete('/tarefas/:id', taskController.deleteTask);

router.put('/tarefas/:id', taskController.updatetask);

// events
router.get('/eventos', eventController.showAllEvents);

router.post('/eventos', eventController.createEvent);

router.delete('/eventos/:id', eventController.deleteEvent);

router.put('/eventos/:id', eventController.updateEvent);


// reunions
router.get('/reunioes', reunionController.showAllReunions);

router.post('/reunioes', reunionController.createReunion);

router.delete('/reunioes/:id', reunionController.deleteReunion);

router.put('/reunioes/:id', reunionController.updateReunion);
