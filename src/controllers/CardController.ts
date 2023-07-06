import { Card } from "../entity/Card";
import { Request, Response } from 'express'
import { AppDataSource } from "../app-data-source"
import { Note } from "../entity/Note";

class CardController {

    async createCard(req: Request, res: Response): Promise<Response> {
        try {
            const { name, idNote } = req.body;

            const card = new Card();
            card.name = name;

            const noteRepository = AppDataSource.getRepository(Note);
            // Verificar pq codigo para aqui
            const note = await noteRepository.findOne(idNote);
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

}
export default new CardController()