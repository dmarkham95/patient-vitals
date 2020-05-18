// Prefix the token with an underscore because Nest uses the token
// "UserRepository" for the TypeORM repository already. Need to find a better
// solution.
export const MEASUREMENT_REPOSITORY = "_MeasurementRepository";
export const PATIENT_REPOSITORY = "_PatientRepository";
export const AUTH_REPOSITORY = "_AuthRepository";
export const USER_REPOSITORY = "_UserRepository";
export const ACCOUNT_REPOSITORY = "_ACCOUNT_REPOSITORY";
