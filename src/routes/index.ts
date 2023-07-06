import { Router, Request, Response } from "express"
import Card from './card'
import Note from './note'

const routes = Router()

routes.use("/card", Card)
routes.use("/note", Note)

//aceita qualquer método HTTP ou URL
routes.use((req: Request, res: Response) => res.json({ error: "Requisição desconhecida" }))

export default routes