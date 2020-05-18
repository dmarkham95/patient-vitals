import DashboardModel from 'app/interfaces/dashboard/DashboardModel';
import MeasurementModel from './measurement';
import PatientModel from './patient';

const DashboardStore: DashboardModel = {
	patient: PatientModel,
	measurement: MeasurementModel,
};

export default DashboardStore;
