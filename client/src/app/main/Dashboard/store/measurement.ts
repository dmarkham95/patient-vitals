import MeasurementDialog from 'app/interfaces/measurement/MeasurementDialog';
import MeasurementModel from 'app/interfaces/measurement/MeasurementModel';
import { measurementService } from 'app/services/apiServices/measurement-service';
import { action, thunk } from 'easy-peasy';

const initalDialog: MeasurementDialog = {
	isOpen: false,
	data: null,
};

const MeasurementStore: MeasurementModel = {
	items: [],
	currentMeasurement: undefined,
	measurementDialog: initalDialog,
	setMeasurements: action((state, payload) => {
		state.items = payload;
	}),
	addMeasurement: action((state, payload) => {
		state.items.push(payload);
	}),
	setCurrentMeasurement: action((state, payload) => {
		state.currentMeasurement = payload;
	}),
	createMeasurement: thunk(
		async (state, entry): Promise<void> => {
			let newMeasurement = await measurementService.createMeasurement(entry);
			state.addMeasurement(newMeasurement);
		},
	),
	getMeasurements: thunk(async state => {
		const measurements = await measurementService.getMeasurements();
		state.setMeasurements(measurements);
	}),
	openDialog: action((state, payload) => {
		state.measurementDialog.isOpen = true;
		state.measurementDialog.data = payload;
	}),
	closeDialog: action(state => {
		state.measurementDialog.isOpen = false;
		state.measurementDialog.data = null;
	}),
};

export default MeasurementStore;
