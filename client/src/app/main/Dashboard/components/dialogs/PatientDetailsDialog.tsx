import { Box, Dialog, Grid, Tab, Tabs, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Measurement from 'app/interfaces/measurement/Measurement';
import dialogStyles from 'app/main/Dashboard/styles/dialog';
import { measurementService } from 'app/services/apiServices/measurement-service';
import { useStoreActions, useStoreState } from 'app/store/hooks';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import MeasurementTable from '../tables/MeasurementTable';
import { DataCard, TrendChartCard } from '../widgets';

interface TabPanelProps {
	children?: React.ReactNode;
	index: any;
	value: any;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={4}>{children}</Box>}
		</div>
	);
}

const PatientDetailsDialog: React.FC = () => {
	const classes = dialogStyles({});
	const patientDetailsDialog = useStoreState(state => state.dashboard.patient.patientDetailsDialog);
	const patient = useStoreState(state => state.dashboard.patient.patientDetailsDialog.data);
	const closeDialog = useStoreActions(state => state.dashboard.patient.closeDetailsDialog);

	const [tabValue, setTab] = React.useState(0);
	const [measurements, setMeasurements] = useState<Array<Measurement>>([]);

	useEffect(() => {
		const fetchData = async () => {
			let m = await measurementService.getPatientMeasurements(patient.id);
			setMeasurements(m);
		};

		if (!patient) {
			return;
		}

		fetchData();
	}, [patient]);

	if (!patient) {
		return null;
	}

	const avgWeight = Math.round(measurements.reduce((m, u) => m + u.weight, 0) / measurements.length);
	const avgPulse = Math.round(measurements.reduce((m, u) => m + u.pulse, 0) / measurements.length);
	const avgTemperature = Math.round(measurements.reduce((m, u) => m + u.temperature, 0) / measurements.length);
	const avgBpOver = Math.round(measurements.reduce((m, u) => m + u.bpOver, 0) / measurements.length);
	const avgBpUnder = Math.round(measurements.reduce((m, u) => m + u.bpUnder, 0) / measurements.length);

	const trendWeight = measurements.map(m => m.weight);
	const trendPulse = measurements.map(m => m.pulse);
	const trendTemperature = measurements.map(m => m.temperature);
	const trendBpOver = measurements.map(m => m.bpOver);
	const trendBpUnder = measurements.map(m => m.bpUnder);

	const handleTabChange = (event, newValue) => {
		setTab(newValue);
	};

	return (
		<Dialog fullWidth onClose={() => closeDialog()} scroll="body" maxWidth="lg" open={patientDetailsDialog.isOpen}>
			<Grid container spacing={0}>
				<Grid className="bg-indigo-500" item xs={12} lg={5}>
					<div className="p-4">
						<div className="text-center">
							<div className="inline-block">
								<Avatar className={classes.largeAvatar}>
									<PersonIcon className={classes.largeIcon} fontSize="large" />
								</Avatar>
							</div>

							<div className="mb-4 mt-4">
								<Typography variant="h4">{`${patient.firstName} ${patient.middleName} ${patient.lastName}`}</Typography>
							</div>
							<div className="mt-4">
								<Typography variant="h5">Gender</Typography>
							</div>
							<div className="mb-4">
								<Typography component={'span'} variant="subtitle1" color="textSecondary">
									{patient.gender}
								</Typography>
							</div>
							<div className="mt-4">
								<Typography variant="h5">Date Of Birth</Typography>
							</div>
							<div className="mb-4">
								<Typography component={'span'} variant="subtitle1" color="textSecondary">
									{moment(patient.dateOfBirth).format('MM/DD/YYYY')}
								</Typography>
							</div>
							<div className="mt-4">
								<Typography variant="h5">City and State</Typography>
							</div>
							<div className="mb-4">
								<Typography component={'span'} variant="subtitle1" color="textSecondary">
									{patient.cityState}
								</Typography>
							</div>
						</div>
					</div>
				</Grid>
				<Grid className="min-h-full" item xs={12} lg={7}>
					<div>
						<Tabs
							value={tabValue}
							indicatorColor="primary"
							textColor="primary"
							variant="fullWidth"
							onChange={handleTabChange}
						>
							<Tab className="py-3" label="Patient Measurements" />
							<Tab className="py-3" label="Measurements Avg." />
							<Tab className="py-3" label="Measurements Trends" />
						</Tabs>
						<TabPanel value={tabValue} index={0}>
							<MeasurementTable hidePatientCol={true} measurements={measurements} />
						</TabPanel>
						<TabPanel value={tabValue} index={1}>
							<Grid container spacing={4}>
								<Grid item xs={12} sm={6} md={4}>
									<DataCard title="Weight" value={avgWeight.toString()} icon="web_asset" />
								</Grid>
								<Grid item xs={12} sm={6} md={4}>
									<DataCard title="Pulse Rate" value={avgPulse.toString()} icon="linear_scale" />
								</Grid>
								<Grid item xs={12} sm={6} md={4}>
									<DataCard
										title="Temperature"
										value={avgTemperature.toString()}
										icon="battery_charging_full"
									/>
								</Grid>
								<Grid item xs={12} sm={6} md={4}>
									<DataCard title="BP Over" value={avgBpOver.toString()} icon="ev_station" />
								</Grid>
								<Grid item xs={12} sm={6} md={4}>
									<DataCard title="BP Under" value={avgBpUnder.toString()} icon="ev_station" />
								</Grid>
							</Grid>
							>
						</TabPanel>
						<TabPanel value={tabValue} index={2}>
							<Grid container spacing={4}>
								<Grid item xs={12} sm={6} md={6}>
									<TrendChartCard title="Weight" data={trendWeight} icon="web_asset" />
								</Grid>
								<Grid item xs={12} sm={6} md={6}>
									<TrendChartCard title="Pulse Rate" data={trendPulse} icon="linear_scale" />
								</Grid>
								<Grid item xs={12} sm={6} md={6}>
									<TrendChartCard
										title="Temperature"
										data={trendTemperature}
										icon="battery_charging_full"
									/>
								</Grid>
								<Grid item xs={12} sm={6} md={6}>
									<TrendChartCard title="BP Over" data={trendBpOver} icon="ev_station" />
								</Grid>
								<Grid item xs={12} sm={6} md={6}>
									<TrendChartCard title="BP Under" data={trendBpUnder} icon="ev_station" />
								</Grid>
							</Grid>
						</TabPanel>
					</div>
				</Grid>
			</Grid>
		</Dialog>
	);
};

export default PatientDetailsDialog;
