import { Router, Request, Response } from "express"
import Card from './card'

const routes = Router()

routes.use("/card", Card)

//aceita qualquer método HTTP ou URL
routes.use((req: Request, res: Response) => res.json({ error: "Requisição desconhecida" }))

export default routes