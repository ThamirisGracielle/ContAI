import express from "express";
import launchRoutes from "./routes/launchRoutes";

const app = express();
app.use(express.json());

app.use("/api", launchRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
