import { Inject, Injectable } from "@nestjs/common";
import { MEASUREMENT_REPOSITORY } from "_Common/Constant/RepositoryNames/Repositories";
import { IMeasurementService } from "_DomainLayer/Services/IMeasurementService";
import { IMeasurementRepository } from "_DomainLayer/Repositories/IMeasurementRepository";
import { MeasurementDto } from "_ApplicationLayer/DTO/Measurement/measurement.dto";
import { MeasurementMapper } from "_ApplicationLayer/Mappers";

@Injectable()
export class MeasurementService implements IMeasurementService {
  private measurementRepository: IMeasurementRepository;

  constructor(
    @Inject(MEASUREMENT_REPOSITORY)
    measurementRepository: IMeasurementRepository
  ) {
    this.measurementRepository = measurementRepository;
  }

  public async getPatientMeasurements(
    patientId: number
  ): Promise<MeasurementDto[]> {
    try {
      const measurements = await this.measurementRepository.getPatientMeasurements(
        patientId
      );
      return measurements.map((m) => MeasurementMapper.toDTO(m));
    } catch (error) {
      throw error;
    }
  }

  public async getMeasurements(): Promise<MeasurementDto[]> {
    try {
      const measurements = await this.measurementRepository.getAll();
      return measurements.map((p) => MeasurementMapper.toDTO(p));
    } catch (error) {
      throw error;
    }
  }

  public async createMeasurement(dto: MeasurementDto): Promise<MeasurementDto> {
    try {
      const measurementEntity = MeasurementMapper.toDomain(dto);
      const measurement = await this.measurementRepository.create(
        measurementEntity
      );
      return MeasurementMapper.toDTO(measurement);
    } catch (error) {
      throw error;
    }
  }

  public async updateMeasurement(dto: MeasurementDto): Promise<void> {
    try {
      const measurementEntity = MeasurementMapper.toDomain(dto);
      await this.measurementRepository.update(measurementEntity);
    } catch (error) {
      throw error;
    }
  }

  public async deleteMeasurement(measurementId: number): Promise<void> {
    try {
      await this.measurementRepository.delete(measurementId);
    } catch (error) {
      throw error;
    }
  }
}
