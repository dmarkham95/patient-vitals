import { MEASUREMENT_REPOSITORY } from "_Common/Constant/RepositoryNames/Repositories";
import { MEASUREMENT_SERVICE } from "_Common/Constant/ServiceNames/Services";
import { ClassProvider, Module } from "@nestjs/common";
import { MeasurementRepository } from "_InfrastructureLayer/Repositories/TypeOrm/measurement.repository";
import { MeasurementService } from "_ApplicationLayer/Services/measurement.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Measurement } from "_DomainLayer/Entities/TypeOrm/measurement.entity";
import { MeasurementController } from "./measurement.controller";

const measurementRepositoryProvider: ClassProvider = {
  provide: MEASUREMENT_REPOSITORY,
  useClass: MeasurementRepository,
};

const measurementServiceProvider: ClassProvider = {
  provide: MEASUREMENT_SERVICE,
  useClass: MeasurementService,
};

@Module({
  imports: [TypeOrmModule.forFeature([Measurement])],
  controllers: [MeasurementController],
  providers: [measurementRepositoryProvider, measurementServiceProvider],
  exports: [measurementServiceProvider],
})
export class MeasurementModule {}
