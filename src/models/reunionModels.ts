import { connection } from './connection';
import { v4 as uuidv4 } from 'uuid';


export const showAllReunions = async () => {
    const [allReunions] = await connection.execute('SELECT * FROM Reunioes');

    return allReunions;
}

export const createReunion = async (reunion) => {
    const { data, titulo, horario, descricao, link, pauta } = reunion;
    const id = uuidv4();

    const query = 'INSERT INTO Reunioes (id, data, titulo, horario, descricao, link, pauta) VALUES (?, ?, ?, ?, ?, ?, ?)';

    const [createdReunion] = await connection.execute(query, [id, data, titulo, horario, descricao, link, pauta]);

    return createdReunion;
}

export const deleteReunion = async (id) => {
    const query = 'DELETE FROM Reunioes WHERE id = ?';

    const [deletedReunion] = await connection.execute(query, [id]);

    return deletedReunion;
}

export const updateReunion = async (id, reunion) => {
    const { data, titulo, horario, descricao, link, pauta } = reunion;
    const query = 'UPDATE Reunioes SET data = ?, titulo = ?, horario = ?, descricao = ?, status = ? WHERE id = ?';

    const [updatedReunion] = await connection.execute(query, [data, titulo, horario, descricao, link, pauta, id]);

    return updatedReunion;
}