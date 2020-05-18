import Measurement from 'app/interfaces/measurement/Measurement';
import MonthVisitCount from 'app/interfaces/measurement/MonthVisitCount';
import { AxiosRequestConfig } from 'axios';
import moment from 'moment';
import { Api } from './_Api';
import { apiConfig } from './_api-config';

class MeasurementService extends Api {
	public constructor(config: AxiosRequestConfig) {
		super(config);
	}

	public getMeasurements = async (): Promise<Array<Measurement>> => {
		const measurements = await this.get<Array<Measurement>>(`measurements`);
		return measurements.data;
	};

	public getMeasurement = async (measurementId: string): Promise<Measurement> => {
		const measurement = await this.get<Measurement>(`measurements/${measurementId}`);
		return measurement.data;
	};

	public getPatientMeasurements = async (patientId: number): Promise<Array<Measurement>> => {
		const measurements = await this.get<Array<Measurement>>(`measurements/patient/${patientId}`);
		return measurements.data;
	};

	public createMeasurement = async (data: Measurement): Promise<Measurement> => {
		let measurement = await this.post<Measurement>(`measurements/create`, data);
		return measurement.data;
	};

	public updateMeasurement = async (data: Measurement): Promise<Measurement> => {
		let measurement = await this.post<Measurement>(`measurements/update`, data);
		return measurement.data;
	};

	public deleteMeasurement = async (data: Measurement): Promise<void> => {
		await this.post<Measurement>(`measurements/delete`, data);
	};

	groupVisitsByYearMonth = (arr: Measurement[], year: number): Array<MonthVisitCount> => {
		let yearVisits = arr.filter(m => moment(m.dateOfService).year() === year);
		let visitsByMonth = yearVisits.reduce((results, currentVale) => {
			let month = moment(currentVale.dateOfService).month();
			if (!results[month]) results[month] = { month: month, visits: 1 };
			else results[month].visits++;
			return results;
		}, {});

		return Object.values(visitsByMonth);
	};
}

export const measurementService = new MeasurementService(apiConfig);
