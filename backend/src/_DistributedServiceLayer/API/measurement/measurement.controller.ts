import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Req,
} from "@nestjs/common";
import { Request } from "express";
import { MeasurementDto } from "_ApplicationLayer/DTO/Measurement/measurement.dto";
import { MEASUREMENT_SERVICE } from "_Common/Constant/ServiceNames/Services";
import { logger } from "_Common/Utilities/Loggers/Logger";
import { IMeasurementService } from "_DomainLayer/Services/IMeasurementService";

@Controller("measurements")
export class MeasurementController {
  private measurementServive: IMeasurementService;

  constructor(
    @Inject(MEASUREMENT_SERVICE) measurementServive: IMeasurementService
  ) {
    this.measurementServive = measurementServive;
  }

  @Get()
  public async getMeasurements(): Promise<Array<MeasurementDto>> {
    const measurements = await this.measurementServive.getMeasurements();
    return measurements;
  }

  @Get("patient/:patientId")
  public async getPatientMeasurements(
    @Param("patientId") patientId: number
  ): Promise<Array<MeasurementDto>> {
    if (!patientId) {
      throw new HttpException("BAD_REQUEST", HttpStatus.BAD_REQUEST);
    }

    const measurements = await this.measurementServive.getPatientMeasurements(
      patientId
    );
    return measurements;
  }

  @Post("create")
  //@UsePipes(new JoiValidationPipe(createMeasurementDtoSchema))
  public async create(@Req() request: Request, @Body() _dto: MeasurementDto) {
    logger.info("Create Measurement", _dto);
    let dto = request.body as MeasurementDto;
    if (!dto) {
      throw new HttpException("BAD_REQUEST", HttpStatus.BAD_REQUEST);
    }
    const measurement = await this.measurementServive.createMeasurement(dto);
    return measurement;
  }

  @Post("update")
  //@UsePipes(new JoiValidationPipe(updateMeasurementDtoSchema))
  public async update(@Req() request: Request, @Body() _dto: MeasurementDto) {
    logger.info("Update Measurement", _dto);
    let dto = request.body as MeasurementDto;
    if (!dto.id) {
      throw new HttpException("BAD_REQUEST", HttpStatus.BAD_REQUEST);
    }
    await this.measurementServive.updateMeasurement(dto);
  }

  @Post("delete")
  //@UsePipes(new JoiValidationPipe(updateMeasurementDtoSchema))
  public async delete(@Req() request: Request, @Body() _dto: MeasurementDto) {
    logger.info("Delete Measurement", _dto);
    let dto = request.body as MeasurementDto;
    if (!dto.id) {
      throw new HttpException("BAD_REQUEST", HttpStatus.BAD_REQUEST);
    }
    await this.measurementServive.deleteMeasurement(dto.id);
  }
}
