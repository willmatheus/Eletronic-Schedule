import { connection } from './connection';
import { v4 as uuidv4 } from 'uuid';


export const showAllEvents = async () => {
    const [allEvents] = await connection.execute('SELECT * FROM Eventos');

    return allEvents;
}

export const createEvent = async (event) => {
    const { data, titulo, horario, descricao, local, numeroDeConvidados } = event;
    const id = uuidv4(); 

    const query = 'INSERT INTO Eventos (id, data, titulo, horario, descricao, local, numeroDeConvidados) VALUES (?, ?, ?, ?, ?, ?, ?)';

    const [createdEvent] = await connection.execute(query, [id, data, titulo, horario, descricao, local, numeroDeConvidados]);

    return {
        id,
        data,
        titulo,
        horario,
        descricao,
        local,
        numeroDeConvidados
    };
}

export const deleteEvent = async (id) => {
    const query = 'DELETE FROM Eventos WHERE id = ?';

    const [deletedEvent] = await connection.execute(query, [id]);

    return deletedEvent;
}

export const updateEvent = async (id, event) => {
    const { data, titulo, horario, descricao, local, numeroDeConvidados } = event;
    const query = 'UPDATE Eventos SET data = ?, titulo = ?, horario = ?, descricao = ?, local = ?, numeroDeConvidados = ? WHERE id = ?';

    const [updatedEvent] = await connection.execute(query, [data, titulo, horario, descricao, local, numeroDeConvidados, id]);

    return updatedEvent;
}