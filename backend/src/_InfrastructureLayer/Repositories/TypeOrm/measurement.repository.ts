import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { logThrowDBError } from "_Common/Utilities/Loggers/DbLogger";
import { Measurement } from "_DomainLayer/Entities/TypeOrm/measurement.entity";
import { IMeasurementRepository } from "_DomainLayer/Repositories/IMeasurementRepository";

@Injectable()
export class MeasurementRepository implements IMeasurementRepository {
  private measurementRepository: Repository<Measurement>;

  constructor(
    @InjectRepository(Measurement)
    measurementRepository: Repository<Measurement>
  ) {
    this.measurementRepository = measurementRepository;
  }

  public async getPatientMeasurements(id: number): Promise<Measurement[]> {
    let measurements = await this.measurementRepository
      .find({ where: { patientId: id }, order: { dateOfService: "ASC" } })
      .catch(
        logThrowDBError("MeasurementRepository getPatientMeasurements", null)
      );
    return measurements;
  }

  public async exists(id: number): Promise<boolean> {
    let count = await this.measurementRepository
      .count({ where: { id: id } })
      .catch(logThrowDBError("MeasurementRepository exists", { id }));
    return count > 0;
  }

  public async delete(id: number): Promise<void> {
    let exists = await this.exists(id);

    if (!exists) {
      throw new Error("Patient doesn't exists.");
    }

    let patientToRemove = await this.measurementRepository.findOne(id);
    await this.measurementRepository.remove(patientToRemove);
  }

  public async create(t: Measurement): Promise<Measurement> {
    let newPatient = await this.measurementRepository
      .save(t)
      .catch(logThrowDBError("MeasurementRepository create", t));
    let patient = this.getById(newPatient.id);
    return patient;
  }

  public async update(t: Measurement): Promise<void> {
    let toUpdate = await this.measurementRepository
      .findOne({ where: { id: t.id } })
      .catch(logThrowDBError("MeasurementRepository update", t));
    let updated = Object.assign(toUpdate, t);
    await this.measurementRepository.save(updated);
  }

  public async getById(id: number): Promise<Measurement> {
    let measurement = await this.measurementRepository
      .findOne({ where: { id: id }, relations: ["patient"] })
      .catch(logThrowDBError("MeasurementRepository getById", { id }));
    return measurement;
  }

  public async getAll(): Promise<Measurement[]> {
    let patients = await this.measurementRepository
      .find({ relations: ["patient"] })
      .catch(logThrowDBError("MeasurementRepository getAll", null));
    return patients;
  }
}
