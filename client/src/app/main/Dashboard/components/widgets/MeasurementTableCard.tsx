import { Card, CardHeader, Divider } from '@material-ui/core';
import { useStoreState } from 'app/store/hooks';
import React from 'react';
import MeasurementTable from '../tables/MeasurementTable';

const MeasurementTableCard: React.FC = () => {
	const measurements = useStoreState(state => state.dashboard.measurement.items);

	return (
		<Card elevation={4} className="border-0 card-shadow-first p-4 mb-4">
			<CardHeader title="Patient Measurements" />
			<div className="my-4">
				<Divider />
			</div>
			<MeasurementTable hidePatientCol={false} measurements={measurements} />
		</Card>
	);
};

export default MeasurementTableCard;
