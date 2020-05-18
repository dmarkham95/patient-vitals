import { Measurement } from "_DomainLayer/Entities/TypeOrm/measurement.entity";
import { BaseRepository } from "./IBaseRepository";

export interface IMeasurementRepository extends BaseRepository<Measurement> {
  getPatientMeasurements(id: number): Promise<Array<Measurement>>;
}
