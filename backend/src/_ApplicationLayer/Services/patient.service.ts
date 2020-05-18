import { Inject, Injectable } from "@nestjs/common";
import { PatientDto } from "_ApplicationLayer/DTO/Patient/patient.dto";
import { PatientMapper } from "_ApplicationLayer/Mappers";
import { PATIENT_REPOSITORY } from "_Common/Constant/RepositoryNames/Repositories";
import { IPatientRepository } from "_DomainLayer/Repositories/IPatientRepository";
import { IPatientService } from "_DomainLayer/Services/IPatientService";

@Injectable()
export class PatientService implements IPatientService {
  private patientRepository: IPatientRepository;

  constructor(
    @Inject(PATIENT_REPOSITORY)
    patientRepository: IPatientRepository
  ) {
    this.patientRepository = patientRepository;
  }

  public async getPatient(patientId: number): Promise<PatientDto> {
    try {
      const p = await this.patientRepository.getById(patientId);
      return PatientMapper.toDTO(p);
    } catch (error) {
      throw error;
    }
  }

  public async getPatients(): Promise<PatientDto[]> {
    try {
      const patients = await this.patientRepository.getAll();
      return patients.map((p) => PatientMapper.toDTO(p));
    } catch (error) {
      throw error;
    }
  }

  public async createPatient(dto: PatientDto): Promise<PatientDto> {
    try {
      console.log("createPatient create", dto);
      const patientEntity = PatientMapper.toDomain(dto);
      const patient = await this.patientRepository.create(patientEntity);
      return PatientMapper.toDTO(patient);
    } catch (error) {
      throw error;
    }
  }

  public async updatePatient(dto: PatientDto): Promise<void> {
    try {
      const patientEntity = PatientMapper.toDomain(dto);
      await this.patientRepository.update(patientEntity);
    } catch (error) {
      throw error;
    }
  }

  public async deletePatient(patientId: number): Promise<void> {
    try {
      await this.patientRepository.delete(patientId);
    } catch (error) {
      throw error;
    }
  }
}
