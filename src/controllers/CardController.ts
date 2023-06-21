import { Card } from "../entity/Card";
import { Request, Response } from 'express'
import { AppDataSource } from "../app-data-source"



class CardController {

   async createCard(req: Request, res: Response): Promise<Response> {
        try {
            const { name } = req.body;
            
            const card = new Card();
            card.name = name;
            
            const cardRepository = AppDataSource.getRepository(Card);
            const createdCard = await cardRepository.save(card);

            return res.json(createdCard);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar o card.' });
        }
    }
}
export default new CardController()