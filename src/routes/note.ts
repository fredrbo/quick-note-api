import { Router } from "express"
import NoteController from "../controllers/NoteController"

const routes = Router()

routes.get('/getAll', NoteController.getAll)
routes.get('/getByName', NoteController.getByName)
routes.post('/create', NoteController.createNote)

export default routes