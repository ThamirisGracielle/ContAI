import express from "express";
import { AppDataSource } from "./data-source";
import launchRoutes from "./routes/launchRoutes";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", launchRoutes);

// Health check endpoint
app.get("/health", (_, res) => {
    res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error during Data Source initialization", error);
    });
