import { Action, Computed, Thunk } from 'easy-peasy';
import Patient from './Patient';
import PatientDetailsDialog from './PatientDetailsDialog';
import PatientDialog from './PatientDialog';

export default interface PatientModel {
	items: Patient[];
	currentPatient?: Patient;
	setPatients: Action<PatientModel, Patient[]>;
	addPatient: Action<PatientModel, Patient>;
	setCurrentPatient: Action<PatientModel, Patient>;
	createPatient: Thunk<PatientModel, Patient>;
	getPatients: Thunk<PatientModel>;
	openDialog: Action<PatientModel, Patient>;
	closeDialog: Action<PatientModel>;
	patientDialog: PatientDialog;
	patientDetailsDialog: PatientDetailsDialog;
	openDetailsDialog: Action<PatientModel, Patient>;
	closeDetailsDialog: Action<PatientModel>;
	totalPatients: Computed<PatientModel, number>;
}
