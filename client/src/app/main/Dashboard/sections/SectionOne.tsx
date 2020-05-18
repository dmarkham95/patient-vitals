import { Grid } from '@material-ui/core';
import { useStoreState } from 'app/store/hooks';
import React from 'react';
import DataCard from '../components/widgets/DataCard';

const SectionOne: React.FC = () => {
	//const getPatients = useStoreActions(state => state.dashboard.patient.getPatients);
	//const getMeasurements = useStoreActions(state => state.dashboard.measurement.getMeasurements);
	const measurements = useStoreState(state => state.dashboard.measurement.items);
	const totalPatients = useStoreState(state => state.dashboard.patient.totalPatients);
	const totalMaleVisits = measurements.filter(m => m.patient.gender === 'Male');
	const totalFemaleVisits = measurements.filter(m => m.patient.gender === 'Female');

	return (
		<div className="m-5">
			<Grid container spacing={4}>
				<Grid item xs={12} sm={6} lg={3}>
					<DataCard icon="person" title="Total Patients" value={totalPatients.toString()} />
				</Grid>
				<Grid item xs={12} sm={6} lg={3}>
					<DataCard icon="healing" title="Total Visits" value={measurements.length.toString()} />
				</Grid>
				<Grid item xs={12} sm={6} lg={3}>
					<DataCard icon="healing" title="Total Male Visits" value={totalMaleVisits.length.toString()} />
				</Grid>
				<Grid item xs={12} sm={6} lg={3}>
					<DataCard icon="healing" title="Total Female Visits" value={totalFemaleVisits.length.toString()} />
				</Grid>
			</Grid>
		</div>
	);
};

export default SectionOne;
