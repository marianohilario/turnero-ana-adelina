import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Appointment } from "./Appointment";

@Entity({
    name: "services",
})
export class Services {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: "time" })
    duration: string;

    @Column()
    price: number;

    @Column()
    img: string;

    @OneToMany(() => Appointment, (appointment) => appointment.service)
    appointments: Appointment[];
}
