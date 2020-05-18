import { Patient } from "_DomainLayer/Entities/TypeOrm/patient.entity";
import { BaseRepository } from "./IBaseRepository";

export interface IPatientRepository extends BaseRepository<Patient> {}
