import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsDateString, IsEnum, IsNotEmpty, IsPositive } from "class-validator";

export enum LaunchType {
    CREDIT = "credit",
    DEBIT = "debit",
}

@Entity()
export class Launch {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @IsDateString()
    @IsNotEmpty()
    date!: string;  // ISO string date

    @Column()
    @IsNotEmpty()
    description!: string;

    @Column("decimal", { precision: 10, scale: 2 })
    @IsPositive()
    amount!: number;

    @Column({
        type: "enum",
        enum: LaunchType,
    })
    @IsEnum(LaunchType)
    type!: LaunchType;
}
