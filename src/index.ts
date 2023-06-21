import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import routes from "./routes";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express(); // cria o servidor
app.use(express.json()); // suporta parâmetros JSON no body da requisição
app.use(cors()); // suporta requisições de qualquer domínio

// inicializa o servidor na porta especificada
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));

app.use(routes);
