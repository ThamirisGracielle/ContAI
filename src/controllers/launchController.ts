
import { Request, Response } from "express";
import { Launch } from "../entity/Launch";

let launches: Launch[] = [];

let launches = [];

export const getAllLaunches = (req: Request, res: Response) => {
    res.json(launches);
};

export const createLaunch = (req: Request, res: Response) => {
    const { date, description, amount, type } = req.body;

    const newLaunch = {
        id: launches.length + 1,
        date,
        description,
        amount,
        type,
    };

    launches.push(newLaunch);

    res.status(201).json(newLaunch);
};
