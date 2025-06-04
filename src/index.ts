import express from "express";
import { AppDataSource } from "./data-source";
import launchRoutes from "./routes/launchRoutes";

const app = express();
app.use(express.json());

app.use("/api", launchRoutes); // agora as rotas são /api/launches

AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");

    app.listen(3000, () => {
        console.log("Server running at http://localhost:3000");
    });
}).catch((error) => {
    console.error("Error during Data Source initialization", error);
});
