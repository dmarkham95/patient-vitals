import Measurement from '../measurement/Measurement';

export default interface Patient {
	id?: number;
	firstName: string;
	middleName: string;
	lastName: string;
	fullName?: string;
	gender: string;
	dateOfBirth: Date;
	city: string;
	state: string;
	cityState?: string;
	age?: number;
	measurements?: Measurement[];
}
