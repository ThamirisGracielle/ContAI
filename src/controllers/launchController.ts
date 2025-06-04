import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Launch, LaunchType } from "../entity/Launch";
import { validate } from "class-validator";
import { Between, MoreThanOrEqual, LessThanOrEqual } from "typeorm";

const launchRepository = AppDataSource.getRepository(Launch);

// Helper function to group launches by month
const groupLaunchesByMonth = (launches: Launch[]) => {
    const grouped: Record<string, {
        launches: Launch[],
        totalCredit: number,
        totalDebit: number
    }> = {};

    launches.forEach(launch => {
        // Extract month and year from DD/MM/YYYY format
        const [day, month, year] = launch.date.split('/');
        const monthKey = `${month}/${year}`;
        
        if (!grouped[monthKey]) {
            grouped[monthKey] = {
                launches: [],
                totalCredit: 0,
                totalDebit: 0
            };
        }
        
        grouped[monthKey].launches.push(launch);
        
        if (launch.type === LaunchType.CREDIT) {
            grouped[monthKey].totalCredit += Number(launch.amount);
        } else {
            grouped[monthKey].totalDebit += Number(launch.amount);
        }
    });

    // Sort by year and month
    return Object.keys(grouped)
        .sort((a, b) => {
            const [monthA, yearA] = a.split('/');
            const [monthB, yearB] = b.split('/');
            return yearA === yearB 
                ? parseInt(monthA) - parseInt(monthB) 
                : parseInt(yearA) - parseInt(yearB);
        })
        .map(key => ({
            month: key,
            ...grouped[key]
        }));
};

export const getLaunches = async (req: Request, res: Response): Promise<Response> => {
    try {
        const launches = await launchRepository.find({
            order: {
                date: "ASC"
            }
        });
        
        const groupedLaunches = groupLaunchesByMonth(launches);
        return res.json(groupedLaunches);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching launches" });
    }
};

export const createLaunch = async (req: Request, res: Response): Promise<Response> => {
    try {
        const newLaunch = launchRepository.create(req.body);

        const errors = await validate(newLaunch);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        await launchRepository.save(newLaunch);
        return res.status(201).json(newLaunch);
    } catch (error) {
        console.error("Error creating launch:", error);
        return res.status(400).json({ message: "Error creating launch" });
    }
};

export const getLaunchesByMonth = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { month, year } = req.params;
        
        if (!month || !year) {
            return res.status(400).json({ message: "Month and year are required" });
        }
        
        const monthNum = parseInt(month);
        const yearNum = parseInt(year);
        
        if (isNaN(monthNum) || isNaN(yearNum) || monthNum < 1 || monthNum > 12) {
            return res.status(400).json({ message: "Invalid month or year" });
        }
        
        // Format month with leading zero if needed
        const monthStr = monthNum.toString().padStart(2, '0');
        
        // Find all launches for the specified month using regex pattern matching
        const pattern = `\\d{2}/${monthStr}/${yearNum}`;
        
        const launches = await launchRepository.find({
            where: {
                date: new RegExp(pattern)
            },
            order: {
                date: "ASC"
            }
        });
        
        const totalCredit = launches
            .filter(l => l.type === LaunchType.CREDIT)
            .reduce((sum, l) => sum + Number(l.amount), 0);
            
        const totalDebit = launches
            .filter(l => l.type === LaunchType.DEBIT)
            .reduce((sum, l) => sum + Number(l.amount), 0);
        
        return res.json({
            month: `${monthStr}/${yearNum}`,
            launches,
            totalCredit,
            totalDebit
        });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching launches by month" });
    }
};
