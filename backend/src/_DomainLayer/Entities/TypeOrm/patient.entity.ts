import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Measurement } from "./measurement.entity";

@Entity({ name: "Patients" })
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  middleName: string;

  @Column()
  gender: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  city: string;

  @Column()
  state: string;

  @OneToMany((type) => Measurement, (measurement) => measurement.patient, {
    cascade: true,
  })
  @JoinColumn({ name: "id", referencedColumnName: "patientId" })
  measurements?: Measurement[];
}
