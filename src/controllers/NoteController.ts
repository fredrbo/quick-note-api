import { Request, Response } from 'express'
import { AppDataSource } from "../app-data-source"
import { Note } from "../entity/Note";
import { Like } from 'typeorm';



class NoteController {

    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const noteRepository = AppDataSource.getRepository(Note);
            const notes = await noteRepository.find();

            return res.json(notes);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar notas.' });
        }
    }

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


    async getByName(req: Request, res: Response): Promise<Response> {
        try {
            const { name } = req.query;

            if (!name || name === '') {
                return res.status(400).json({ error: 'Nome não fornecido.' });
            }

            const noteRepository = AppDataSource.getRepository(Note);

            const notes = await noteRepository.findOne({ where: { name: Like(`%${name}%`) } });

            return res.json(notes);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar nota.' });
        }
    }

    async updateNote(req: Request, res: Response): Promise<Response> {
        try {
            const { id, name } = req.body;

            const noteRepository = AppDataSource.getRepository(Note);

            const note = await noteRepository.findOneBy(id);

            if (!note) {
                return res.status(404).json({ error: 'Nota não encontrada.' });
            }

            note.name = name;

            const updatedNote = await noteRepository.save(note);

            return res.json(updatedNote);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao editar a nota.' });
        }
    }

    async deleteNote(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.body;

            const noteRepository = AppDataSource.getRepository(Note);
            const note = await noteRepository.findOneBy(id);

            if (!note) {
                return res.status(404).json({ error: 'Nota não encontrada.' });
            }

            await noteRepository.remove(note);

            return res.json({ message: 'Nota excluída com sucesso.' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao excluir a nota.' });
        }
    }

}
export default new NoteController()