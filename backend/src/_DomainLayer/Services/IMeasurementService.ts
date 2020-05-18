import { MeasurementDto } from "_ApplicationLayer/DTO/Measurement/measurement.dto";

export interface IMeasurementService {
  getPatientMeasurements(patientId: number): Promise<Array<MeasurementDto>>;
  getMeasurements(): Promise<Array<MeasurementDto>>;
  createMeasurement(measurement: MeasurementDto): Promise<MeasurementDto>;
  updateMeasurement(measurement: MeasurementDto): Promise<void>;
  deleteMeasurement(measurementId: number): Promise<void>;
}
