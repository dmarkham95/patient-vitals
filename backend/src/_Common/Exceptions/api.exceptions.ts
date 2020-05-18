import { HttpStatus } from '@nestjs/common';
import { APIError, APIErrorAlias } from './api.error';

// tslint:disable-next-line:no-namespace
export namespace APIErrors {
  // tslint:disable-next-line:max-classes-per-file
  export class JoiValidationError extends APIError {
    constructor(message?: string) {
      super({
        message: message || 'Validation Error',
        alias: APIErrorAlias.ValidationError,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  // // tslint:disable-next-line:max-classes-per-file
  // export class ContestNotFoundError extends APIError {
  //   constructor(contestId: string, discipline: Discipline) {
  //     super({
  //       message: `Contest: ${contestId}, Discipline: ${DisciplineUtility.getName(
  //         discipline,
  //       )} was not found in the database`,
  //       alias: APIErrorAlias.NotFound,
  //       status: HttpStatus.BAD_REQUEST,
  //     });
  //   }
  // }

  // tslint:disable-next-line:max-classes-per-file
  export class UnitNotFoundError extends APIError {
    constructor(unitId: string) {
      super({
        message: `Unit Id: ${unitId} was not found in the database`,
        alias: APIErrorAlias.NotFound,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

   // tslint:disable-next-line:max-classes-per-file
   export class RoleNotFoundError extends APIError {
    constructor(roleId: string) {
      super({
        message: `Role Id: ${roleId} was not found in the database`,
        alias: APIErrorAlias.NotFound,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  // // tslint:disable-next-line:max-classes-per-file
  // export class DuplicateAthleteError extends APIError {
  //   constructor(email: string) {
  //     super({
  //       message: `Athlete with email: ${email} already exists`,
  //       alias: APIErrorAlias.OperationFailed,
  //       status: HttpStatus.BAD_REQUEST,
  //     });
  //   }
  // }

  // tslint:disable-next-line:max-classes-per-file
  export class OperationFailedError extends APIError {
    constructor(message: string, params: any) {
      super({
        message: `Operation Failed: ${message}, Params: ${params}`,
        alias: APIErrorAlias.OperationFailed,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
