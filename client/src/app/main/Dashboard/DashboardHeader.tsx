import { Button, Paper } from '@material-ui/core';
import { useStoreActions } from 'app/store/hooks';
import React, { Fragment } from 'react';
import useStyles from './styles/dashboardHeader';

const DashboardHeader: React.FC = () => {
	const classes = useStyles({});

	const openPatientDialog = useStoreActions(state => state.dashboard.patient.openDialog);
	const openMeasurementDialog = useStoreActions(state => state.dashboard.measurement.openDialog);

	return (
		<Fragment>
			<Paper square elevation={3} className={classes.pageTitle}>
				<div className="flex flex-1 items-center">
					<div className={classes.pageTitleHeader}>
						<h1 style={{ margin: '0' }}>Patient Vitals</h1>
						<div className={classes.pageTitleDescription}>Patient Vitals Dashboard</div>
					</div>
				</div>
				<div className="flex items-center">
					<Button
						style={{ marginRight: '10px' }}
						color="primary"
						variant="contained"
						onClick={() => openPatientDialog(null)}
					>
						New Patient
					</Button>
					<Button color="primary" variant="contained" onClick={() => openMeasurementDialog(null)}>
						New Measurement
					</Button>
				</div>
			</Paper>
		</Fragment>
	);
};

export default DashboardHeader;
