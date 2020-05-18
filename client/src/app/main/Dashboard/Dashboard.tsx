import { AppSplashScreen } from '@app';
import { useStoreActions } from 'app/store/hooks';
import React, { useEffect } from 'react';
import MeasurementDialog from './components/dialogs/MeasurementDialog';
import PatientDetailsDialog from './components/dialogs/PatientDetailsDialog';
import PatientDialog from './components/dialogs/PatientDialog';
import { MeasurementAreaChart } from './components/widgets';
import DashboardHeader from './DashboardHeader';
import { SectionFour, SectionOne, SectionThree, SectionTwo } from './sections';

const Dashboard: React.FC = () => {
	const getPatients = useStoreActions(state => state.dashboard.patient.getPatients);
	const getMeasurements = useStoreActions(state => state.dashboard.measurement.getMeasurements);
	const [loading, setLoading] = React.useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			await getPatients();
			await getMeasurements();
			setLoading(false);
		};
		fetchData();
	}, []); // eslint-disable-line

	if (loading) {
		return <AppSplashScreen />;
	}

	return (
		<div className="w-full">
			<DashboardHeader />
			<MeasurementAreaChart />
			<SectionOne />
			<SectionTwo />
			<SectionThree />
			<SectionFour />

			<PatientDialog />
			<MeasurementDialog />
			<PatientDetailsDialog />
		</div>
	);
};

export default Dashboard;
