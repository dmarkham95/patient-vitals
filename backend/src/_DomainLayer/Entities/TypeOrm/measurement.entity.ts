import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "./patient.entity";

@Entity({ name: "Measurements" })
export class Measurement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientId: number;

  @Column()
  dateOfService: Date;

  @Column()
  pulse: number;

  @Column()
  weight: number;

  @Column()
  temperature: number;

  @Column()
  bpOver: number;

  @Column()
  bpUnder: number;

  @ManyToOne((type) => Patient, (patient) => patient.measurements)
  patient?: Patient;
}
