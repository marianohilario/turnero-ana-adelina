import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity({
    name: "appointments",
})
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "date" })
    date: Date;

    @Column({ type: "time" })
    time: string;

    @Column({
        default: "active",
    })
    status: string;

    @ManyToOne(() => User, (user) => user.appointments)
    user: User;
}
