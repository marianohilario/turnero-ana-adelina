import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "credentials",
})
export class UserCredential {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
    })
    username: string;

    @Column()
    password: string;
}
