import { Router } from "express"
import NoteController from "../controllers/NoteController"

const routes = Router()

routes.get('/getAll', NoteController.getAll)
routes.get('/getByName', NoteController.getByName)
routes.post('/create', NoteController.createNote)
routes.put('/update', NoteController.updateNote)
routes.delete('/delete', NoteController.deleteNote)

export default routes