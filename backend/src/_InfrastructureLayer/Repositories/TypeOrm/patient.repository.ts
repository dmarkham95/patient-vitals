import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { logThrowDBError } from "_Common/Utilities/Loggers/DbLogger";
import { Patient } from "_DomainLayer/Entities/TypeOrm/patient.entity";
import { IPatientRepository } from "_DomainLayer/Repositories/IPatientRepository";

@Injectable()
export class PatientRepository implements IPatientRepository {
  private patientRepository: Repository<Patient>;

  constructor(
    @InjectRepository(Patient)
    patientRepository: Repository<Patient>
  ) {
    this.patientRepository = patientRepository;
  }

  public async exists(id: number): Promise<boolean> {
    let count = await this.patientRepository
      .count({ where: { id: id } })
      .catch(logThrowDBError("PatientRepository exists", { id }));
    return count > 0;
  }

  public async delete(id: number): Promise<void> {
    let exists = await this.exists(id);

    if (!exists) {
      throw new Error("Patient doesn't exists.");
    }

    let patientToRemove = await this.patientRepository.findOne(id);
    await this.patientRepository.remove(patientToRemove);
  }

  public async create(t: Patient): Promise<Patient> {
    console.log("PatientRepository create", t);
    let patient = await this.patientRepository
      .save(t)
      .catch(logThrowDBError("PatientRepository create", t));
    return patient;
  }

  public async update(t: Patient): Promise<void> {
    let toUpdate = await this.patientRepository
      .findOne({ where: { id: t.id } })
      .catch(logThrowDBError("PatientRepository update", t));
    let updated = Object.assign(toUpdate, t);
    await this.patientRepository.save(updated);
  }

  public async getById(id: number): Promise<Patient> {
    let patient = await this.patientRepository
      .findOne({ where: { id: id }, relations: ["measurements"] })
      .catch(logThrowDBError("PatientRepository getById", { id }));
    return patient;
  }

  public async getAll(): Promise<Patient[]> {
    let patients = await this.patientRepository
      .find()
      .catch(logThrowDBError("PatientRepository getAll", null));
    return patients;
  }
}
