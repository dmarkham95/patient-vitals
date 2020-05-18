import { Module } from "@nestjs/common";
import { MySqlDatabaseModule } from "_InfrastructureLayer/Databases/TypeOrm/database.module";
import { PatientModule } from "./patient/patient.module";
import { MeasurementModule } from "./measurement/measurement.module";

@Module({
  imports: [MySqlDatabaseModule, PatientModule, MeasurementModule],
})
export class ApiDDBModule {}
