import { Action, Thunk } from 'easy-peasy';
import Measurement from './Measurement';
import MeasurementDialog from './MeasurementDialog';

export default interface MeasurementModel {
	items: Measurement[];
	currentMeasurement?: Measurement;
	setMeasurements: Action<MeasurementModel, Measurement[]>;
	addMeasurement: Action<MeasurementModel, Measurement>;
	setCurrentMeasurement: Action<MeasurementModel, Measurement>;
	createMeasurement: Thunk<MeasurementModel, Measurement>;
	getMeasurements: Thunk<MeasurementModel>;
	openDialog: Action<MeasurementModel, Measurement>;
	closeDialog: Action<MeasurementModel>;
	measurementDialog: MeasurementDialog;
}
