import PatientModel from '../patient/PatientModel';
import MeasurementModel from '../measurement/MeasurementModel';

export default interface DashboardModel {
	patient: PatientModel;
	measurement: MeasurementModel;
}
