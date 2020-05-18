import { Allow } from "class-validator";
import * as Joi from "joi";
import { APIErrors } from "_Common/Exceptions/api.exceptions";
import { MeasurementDto } from "../Measurement/measurement.dto";

export class PatientDto {
  @Allow()
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  fullName?: string;
  gender: string;
  dateOfBirth: Date;
  city: string;
  state: string;
  cityState?: string;
  age: number;
  measurements: MeasurementDto[];
}

export const createPatientSchema = Joi.object().keys({
  firstName: Joi.string()
    .required()
    .error(new APIErrors.JoiValidationError("Unknown firstName")),
  middleName: Joi.string()
    .required()
    .error(new APIErrors.JoiValidationError("Unknown middleName")),
  lastName: Joi.string()
    .required()
    .error(new APIErrors.JoiValidationError("Unknown lastName")),
  gender: Joi.string()
    .required()
    .error(new APIErrors.JoiValidationError("Unknown gender")),
  city: Joi.string()
    .required()
    .error(new APIErrors.JoiValidationError("Unknown city")),
  state: Joi.string()
    .required()
    .error(new APIErrors.JoiValidationError("Unknown state")),
  dateOfBirth: Joi.date()
    .required()
    .error(new APIErrors.JoiValidationError("Unknown dateOfBirth")),
});
