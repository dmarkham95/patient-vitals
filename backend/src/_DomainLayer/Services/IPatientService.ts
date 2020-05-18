import { PatientDto } from "_ApplicationLayer/DTO/Patient/patient.dto";

export interface IPatientService {
  getPatient(patientId: number): Promise<PatientDto>;
  getPatients(): Promise<Array<PatientDto>>;
  createPatient(patient: PatientDto): Promise<PatientDto>;
  updatePatient(patient: PatientDto): Promise<void>;
  deletePatient(patientId: number): Promise<void>;
}
