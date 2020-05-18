import { Card, CardHeader, Divider } from '@material-ui/core';
import { useStoreState } from 'app/store/hooks';
import React from 'react';
import PatientTable from '../tables/PatientTable';

const PatientTableCard: React.FC = () => {
	const patients = useStoreState(state => state.dashboard.patient.items);

	return (
		<Card elevation={4} className="border-0 card-shadow-first p-4 mb-4">
			<CardHeader title="Patients" />
			<div className="my-4">
				<Divider />
			</div>
			<PatientTable patients={patients} />
		</Card>
	);
};

export default PatientTableCard;
