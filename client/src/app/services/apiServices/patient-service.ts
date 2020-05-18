import Patient from 'app/interfaces/patient/Patient';
import { AxiosRequestConfig } from 'axios';
import { Api } from './_Api';
import { apiConfig } from './_api-config';

class PatientService extends Api {
	public constructor(config: AxiosRequestConfig) {
		super(config);
	}

	public getPatients = async (): Promise<Array<Patient>> => {
		const patients = await this.get<Array<Patient>>(`patients`);
		return patients.data;
	};

	public getPatient = async (patientId: string): Promise<Patient> => {
		const patient = await this.get<Patient>(`patients/${patientId}`);
		return patient.data;
	};

	public createPatient = async (data: Patient): Promise<Patient> => {
		let patient = await this.post<Patient>(`patients/create`, data);
		return patient.data;
	};

	public updatePatient = async (data: Patient): Promise<Patient> => {
		let patient = await this.post<Patient>(`patients/update`, data);
		return patient.data;
	};

	public deletePatient = async (data: Patient): Promise<void> => {
		await this.post<Patient>(`patients/delete`, data);
	};
}

export const patientService = new PatientService(apiConfig);
