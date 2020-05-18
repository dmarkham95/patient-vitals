import Patient from '../patient/Patient';

export default interface Measurement {
	id?: number;
	patientId: number;
	dateOfService: Date;
	pulse: number;
	weight: number;
	temperature: number;
	bpOver: number;
	bpUnder: number;
	patient?: Patient;
}
