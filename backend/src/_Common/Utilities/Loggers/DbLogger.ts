import { AWSError } from "aws-sdk";
import { logger } from "_Common/Utilities/Loggers/Logger";

export function logDBError(errorDesc: string, err: AWSError, params: any) {
  let errMessage;
  if (!err.requestId) {
    // Not AWSError
    errMessage = err.message;
  }
  logger.error(`DB Error: ${errorDesc}`, {
    data: {
      params: params,
      error: errMessage || err,
    },
  });
}

export function logThrowDBError(errorDesc: string, params: any) {
  return (err: AWSError) => {
    logDBError(errorDesc, err, params);
    throw err;
  };
}

export function logThrowError(errorDesc: string, params: any) {
  return (err) => {
    logError(errorDesc, err, params);
    throw err;
  };
}

export function logError(errorDesc: string, err: any, params: any) {
  let errMessage;
  if (!err.requestId) {
    // Not AWSError
    errMessage = err.message;
  }
  logger.error(`Error: ${errorDesc}`, {
    data: {
      params: params,
      error: errMessage || err,
    },
  });
}
