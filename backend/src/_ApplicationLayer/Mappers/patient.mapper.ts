import * as moment from "moment";
import { PatientDto } from "_ApplicationLayer/DTO/Patient/patient.dto";
import { Patient } from "_DomainLayer/Entities/TypeOrm/patient.entity";
import { IMapper } from "_DomainLayer/Services/IMapper ";
import { MeasurementMapper } from ".";

class PatientMapper implements IMapper<Patient, PatientDto> {
  toDomain(dto: PatientDto): Patient {
    let patient: Patient = {
      id: dto.id,
      firstName: dto.firstName,
      lastName: dto.lastName,
      middleName: dto.middleName,
      gender: dto.gender,
      dateOfBirth: dto.dateOfBirth,
      city: dto.city,
      state: dto.state,
    };

    return patient;
  }

  toDTO(patient: Patient) {
    let dto: PatientDto = {
      id: patient.id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      middleName: patient.middleName,
      fullName: `${patient.lastName}, ${patient.firstName} ${patient.middleName}`,
      gender: patient.gender,
      dateOfBirth: patient.dateOfBirth,
      city: patient.city,
      state: patient.state,
      cityState: `${patient.city}, ${patient.state}`,
      age: moment().diff(patient.dateOfBirth, "years", false),
      measurements: patient.measurements
        ? patient.measurements.map((m) => MeasurementMapper.toDTO(m))
        : [],
    };

    return dto;
  }
}

const instance = new PatientMapper();

export default instance;
