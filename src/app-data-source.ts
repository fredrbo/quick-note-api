import { DataSource } from "typeorm"
import * as dotenv from 'dotenv'
dotenv.config()

//https://orkhan.gitbook.io/typeorm/docs/data-source-options
export const AppDataSource = new DataSource({
    url: process.env.BD_URL,
    type: "postgres",
    synchronize: true, // true indica que o schema do BD será criado a cada vez que a aplicação inicializar
    logging: false, // true indicq que as consultas e erros serão exibidas no terminal
    entities: ["src/entity/*.ts"], // entidades que serão convertidas em tabelas
    migrations: [],
    subscribers: [],
    maxQueryExecutionTime: 2000 // 2 seg.
})

// https://orkhan.gitbook.io/typeorm/docs/data-source
AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source inicializado!")
    })
    .catch((e) => {
        console.error("Erro na inicialização do Data Source:", e)
    })