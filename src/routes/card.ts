import { Router } from "express"
import CardController from "../controllers/CardController"

const routes = Router()

routes.get('/getAll', CardController.getAll)
routes.get('/getByNoteId', CardController.getCardsByNoteId)
routes.post('/create', CardController.createCard)
routes.put('/update', CardController.updateCard)
routes.delete('/delete', CardController.deleteCard)

export default routes