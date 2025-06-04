import "reflect-metadata";
import { DataSource } from "typeorm";
import { Launch } from "./entity/Launch";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "seu_usuario",
    password: "sua_senha",
    database: "contai_db",
    synchronize: true,
    logging: false,
    entities: [Launch],
});
