import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    OneToMany,
} from "typeorm";
import { UserCredential } from "./Credential";
import { Appointment } from "./Appointment";

@Entity({
    name: "users",
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column()
    email: string;

    @Column({ type: "date" })
    birthdate: Date;

    @Column({ type: "integer" })
    nDni: number;

    @Column()
    phone: string;

    @OneToOne(() => UserCredential)
    @JoinColumn()
    credential: UserCredential;

    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments: Appointment[];
}
