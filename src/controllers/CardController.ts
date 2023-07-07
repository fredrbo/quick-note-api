import { Card } from "../entity/Card";
import { Note } from "../entity/Note";
import { Request, Response } from 'express'
import { AppDataSource } from "../app-data-source"

class CardController {


    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const cardRepository = AppDataSource.getRepository(Card);
            const cards = await cardRepository.find();

            return res.json(cards);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar notas.' });
        }
    }

    async getCardsByNoteId(req: Request, res: Response): Promise<Response> {
        try {
            const { noteId } = req.query;
            console.log(noteId)
            const cardRepository = AppDataSource.getRepository(Card);
            const cards = await cardRepository
                .createQueryBuilder('card')
                .leftJoinAndSelect('card.note', 'note')
                .where('note.id = :noteId', { noteId })
                .getMany();

            return res.json(cards);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar os cards.' });
        }
    }

    async createCard(req: Request, res: Response): Promise<Response> {
        try {
            const { name, idNote } = req.body;

            const card = new Card();
            card.name = name;

            const noteRepository = AppDataSource.getRepository(Note);

            const note = await noteRepository.findOneBy(idNote);

            if (!note) {
                return res.status(404).json({ error: 'Note não encontrado.' });
            }

            card.note = note;

            const cardRepository = AppDataSource.getRepository(Card);
            const createdCard = await cardRepository.save(card);

            return res.json(createdCard);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar o card.' });
        }
    }

    async updateCard(req: Request, res: Response): Promise<Response> {
        try {
            const { id, name, idNote } = req.body;

            const cardRepository = AppDataSource.getRepository(Card);
            const card = await cardRepository.findOneBy(id);

            if (!card) {
                return res.status(404).json({ error: 'Card não encontrado.' });
            }

            const noteRepository = AppDataSource.getRepository(Note);
            const note = await noteRepository.findOneBy(idNote);

            if (!note) {
                return res.status(404).json({ error: 'Note não encontrado.' });
            }

            card.name = name;
            card.note = note;

            const updatedCard = await cardRepository.save(card);

            return res.json(updatedCard);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar o card.' });
        }
    }

    // ...

    async deleteCard(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.body;
            const cardRepository = AppDataSource.getRepository(Card);
            
            const card = await cardRepository.findOneBy(id);

            if (!card) {
                return res.status(404).json({ error: 'Card não encontrado.' });
            }

            await cardRepository.remove(card);

            return res.json({ message: 'Card excluído com sucesso.' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao excluir o card.' });
        }
    }

}
export default new CardController()