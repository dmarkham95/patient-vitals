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
import { PatientDto } from "_ApplicationLayer/DTO/Patient/patient.dto";
import { PATIENT_SERVICE } from "_Common/Constant/ServiceNames/Services";
import { logger } from "_Common/Utilities/Loggers/Logger";
import { IPatientService } from "_DomainLayer/Services/IPatientService";

@Controller("patients")
export class PatientController {
  private patientServive: IPatientService;

  constructor(@Inject(PATIENT_SERVICE) patientServive: IPatientService) {
    this.patientServive = patientServive;
  }

  @Get()
  public async getPatients(): Promise<Array<PatientDto>> {
    const patients = await this.patientServive.getPatients();
    return patients;
  }

  @Get(":id")
  public async getPatient(@Param("id") id: number): Promise<PatientDto> {
    if (!id) {
      throw new HttpException("BAD_REQUEST", HttpStatus.BAD_REQUEST);
    }
    const patient = await this.patientServive.getPatient(id);
    return patient;
  }

  @Post("create")
  //@UsePipes(new JoiValidationPipe(createPatientSchema))
  public async create(@Req() request: Request, @Body() _dto: PatientDto) {
    logger.info("Create Patient _dto", _dto);
    logger.info("Create Patient", request.body);
    let dto = request.body as PatientDto;
    if (!dto) {
      throw new HttpException("BAD_REQUEST", HttpStatus.BAD_REQUEST);
    }
    const patient = await this.patientServive.createPatient(dto);
    return patient;
  }

  @Post("update")
  //@UsePipes(new JoiValidationPipe(updatePatientDtoSchema))
  public async update(@Req() request: Request, @Body() _dto: PatientDto) {
    logger.info("Update Patient", _dto);
    let dto = request.body as PatientDto;
    if (!dto.id) {
      throw new HttpException("BAD_REQUEST", HttpStatus.BAD_REQUEST);
    }
    await this.patientServive.updatePatient(dto);
  }

  @Post("delete")
  //@UsePipes(new JoiValidationPipe(updatePatientDtoSchema))
  public async delete(@Req() request: Request, @Body() _dto: PatientDto) {
    logger.info("Delete Patient", _dto);
    let dto = request.body as PatientDto;
    if (!dto.id) {
      throw new HttpException("BAD_REQUEST", HttpStatus.BAD_REQUEST);
    }
    await this.patientServive.deletePatient(dto.id);
  }
}
