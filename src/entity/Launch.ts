import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { IsEnum, IsNotEmpty, IsPositive, Matches } from "class-validator";

export enum LaunchType {
    CREDIT = "credit",
    DEBIT = "debit",
}

@Entity()
export class Launch {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @IsNotEmpty({ message: "Date is required" })
    @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, { 
        message: "Date must be in format DD/MM/YYYY" 
    })
    date!: string;  // DD/MM/YYYY format

    @Column()
    @IsNotEmpty({ message: "Description is required" })
    description!: string;

    @Column("decimal", { precision: 10, scale: 2 })
    @IsPositive({ message: "Amount must be a positive number" })
    amount!: number;

    @Column({
        type: "enum",
        enum: LaunchType,
    })
    @IsEnum(LaunchType, { message: "Type must be either credit or debit" })
    type!: LaunchType;

    @CreateDateColumn()
    createdAt!: Date;
}
