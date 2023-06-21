import { Router } from "express"
import CardController from "../controllers/CardController"

const routes = Router()

routes.post('/create', CardController.createCard)

export default routes