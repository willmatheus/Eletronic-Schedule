import { connection } from './connection';
import { v4 as uuidv4 } from 'uuid';


export const showAllTasks = async () => {
    const [allTasks] = await connection.execute('SELECT * FROM Tarefas');
    const dateUTC = new Date(Date.now()).toLocaleDateString();

    for (let i = 0; i < allTasks.length; i++)   {
        if (allTasks[i].data === dateUTC) {
            allTasks[i].status = 'concluida';
        }
    }

    return allTasks;
}

export const createTask = async (task) => {
    const { data, titulo, horario, descricao } = task;
    const id = uuidv4();
    const status = 'pendente';

    const query = 'INSERT INTO Tarefas (id, data, titulo, horario, descricao, status) VALUES (?, ?, ?, ?, ?, ?)';

    await connection.execute(query, [id, data, titulo, horario, descricao, status]);

    return {
        id,
        data,
        titulo,
        horario,
        descricao,
        status
    };
}

export const deleteTask = async (id) => {
    const query = 'DELETE FROM Tarefas WHERE id = ?';

    const [deletedTask] = await connection.execute(query, [id]);

    return deletedTask;
}

export const updateTask = async (id, task) => {
    const { data, titulo, horario, descricao, status } = task;
    const query = 'UPDATE Tarefas SET data = ?, titulo = ?, horario = ?, descricao = ?, status = ? WHERE id = ?';

    const [updatedTask] = await connection.execute(query, [data, titulo, horario, descricao, status, id]);

    return updatedTask;
}