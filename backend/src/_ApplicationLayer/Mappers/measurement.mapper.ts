import { MeasurementDto } from "_ApplicationLayer/DTO/Measurement/measurement.dto";
import { Measurement } from "_DomainLayer/Entities/TypeOrm/measurement.entity";
import { IMapper } from "_DomainLayer/Services/IMapper ";
import { PatientMapper } from ".";

class MeasurementMapper implements IMapper<Measurement, MeasurementDto> {
  toDomain(dto: MeasurementDto): Measurement {
    let measurement: Measurement = {
      id: dto.id,
      patientId: dto.patientId,
      dateOfService: dto.dateOfService,
      pulse: dto.pulse,
      weight: dto.weight,
      temperature: dto.temperature,
      bpOver: dto.bpOver,
      bpUnder: dto.bpUnder,
    };

    return measurement;
  }

  toDTO(measurement: Measurement) {
    let dto: MeasurementDto = {
      id: measurement.id,
      patientId: measurement.patientId,
      dateOfService: measurement.dateOfService,
      pulse: measurement.pulse,
      weight: measurement.weight,
      temperature: measurement.temperature,
      bpOver: measurement.bpOver,
      bpUnder: measurement.bpUnder,
      patient: measurement.patient
        ? PatientMapper.toDTO(measurement.patient)
        : null,
    };

    return dto;
  }
}

const instance = new MeasurementMapper();

export default instance;
