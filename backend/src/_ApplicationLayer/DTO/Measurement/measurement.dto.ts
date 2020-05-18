import { PatientDto } from "../Patient/patient.dto";

export class MeasurementDto {
  id: number;
  patientId: number;
  dateOfService: Date;
  pulse: number;
  weight: number;
  temperature: number;
  bpOver: number;
  bpUnder: number;
  patient?: PatientDto;
}
