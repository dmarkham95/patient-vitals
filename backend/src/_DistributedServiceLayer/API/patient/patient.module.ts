import { PATIENT_REPOSITORY } from "_Common/Constant/RepositoryNames/Repositories";
import { PATIENT_SERVICE } from "_Common/Constant/ServiceNames/Services";
import { ClassProvider, Module } from "@nestjs/common";
import { PatientRepository } from "_InfrastructureLayer/Repositories/TypeOrm/patient.repository";
import { PatientService } from "_ApplicationLayer/Services/patient.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Patient } from "_DomainLayer/Entities/TypeOrm/patient.entity";
import { PatientController } from "./patient.controller";

const patientRepositoryProvider: ClassProvider = {
  provide: PATIENT_REPOSITORY,
  useClass: PatientRepository,
};

const patientServiceProvider: ClassProvider = {
  provide: PATIENT_SERVICE,
  useClass: PatientService,
};

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  controllers: [PatientController],
  providers: [patientRepositoryProvider, patientServiceProvider],
  exports: [patientServiceProvider],
})
export class PatientModule {}
