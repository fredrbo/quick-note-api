import { Request, Response } from 'express'
import { AppDataSource } from "../app-data-source"
import { Note } from "../entity/Note";
import { Like } from 'typeorm';



class NoteController {

    async createNote(req: Request, res: Response): Promise<Response> {
        try {
            const { name } = req.body;

            const note = new Note();
            note.name = name;

            const noteRepository = AppDataSource.getRepository(Note);
            const createdNote = await noteRepository.save(note);

            return res.json(createdNote);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar nota.' });
        }
    }

    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const noteRepository = AppDataSource.getRepository(Note);
            const notes = await noteRepository.find();

            return res.json(notes);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar notas.' });
        }
    }

    async getByName(req: Request, res: Response): Promise<Response> {
        try {
            const { name } = req.query;

            if (!name || name === '') {
                return res.status(400).json({ error: 'Nome não fornecido.' });
            }

            const noteRepository = AppDataSource.getRepository(Note);
            // verificar pq aceitga fred mas nao a query
            const notes = await noteRepository.findOne({ where: { name: Like(`%${name}%`) } });

            return res.json(notes);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar nota.' });
        }
    }
}
export default new NoteController()