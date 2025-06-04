import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Launch } from "../entity/Launch";
import { validate } from "class-validator";

const launchRepository = AppDataSource.getRepository(Launch);

export const getLaunches = async (req: Request, res: Response): Promise<Response> => {
    try {
        const launches = await launchRepository.find();
        return res.json(launches);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching launches" });
    }
};

export const createLaunch = async (req: Request, res: Response): Promise<Response> => {
    try {
        const newLaunch = launchRepository.create(req.body);

        const errors = await validate(newLaunch);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        await launchRepository.save(newLaunch);
        return res.status(201).json(newLaunch);
    } catch (error) {
        return res.status(400).json({ message: "Error creating launch" });
    }
};
