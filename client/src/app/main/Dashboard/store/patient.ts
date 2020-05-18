import PatientDialog from 'app/interfaces/patient/PatientDialog';
import PatientModel from 'app/interfaces/patient/PatientModel';
import { patientService } from 'app/services/apiServices/patient-service';
import { action, computed, thunk } from 'easy-peasy';

const initalDialog: PatientDialog = {
	isOpen: false,
	data: null,
};

const PatientStore: PatientModel = {
	items: [],
	currentPatient: undefined,
	patientDialog: initalDialog,
	patientDetailsDialog: initalDialog,
	setPatients: action((state, payload) => {
		state.items = payload;
	}),
	addPatient: action((state, payload) => {
		state.items.push(payload);
	}),
	setCurrentPatient: action((state, payload) => {
		state.currentPatient = payload;
	}),
	createPatient: thunk(
		async (state, entry): Promise<void> => {
			let newPatient = await patientService.createPatient(entry);
			state.addPatient(newPatient);
		},
	),
	getPatients: thunk(async state => {
		const patients = await patientService.getPatients();
		state.setPatients(patients);
	}),
	openDialog: action((state, payload) => {
		state.patientDialog.isOpen = true;
		state.patientDialog.data = payload;
	}),
	closeDialog: action(state => {
		state.patientDialog.isOpen = false;
		state.patientDialog.data = null;
	}),
	openDetailsDialog: action((state, payload) => {
		state.patientDetailsDialog.isOpen = true;
		state.patientDetailsDialog.data = payload;
	}),
	closeDetailsDialog: action(state => {
		state.patientDetailsDialog.isOpen = false;
		state.patientDetailsDialog.data = null;
	}),
	totalPatients: computed(state => state.items.length),
};

export default PatientStore;
