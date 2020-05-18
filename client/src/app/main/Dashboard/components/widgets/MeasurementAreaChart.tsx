import { Button, makeStyles, Typography, useTheme } from '@material-ui/core';
import { measurementService } from 'app/services/apiServices/measurement-service';
import { useStoreState } from 'app/store/hooks';
import _ from 'lodash';
import moment from 'moment';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

const useStyles = makeStyles(theme => ({
	root: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
	},
}));

const MeasurementAreaChart: React.FC = () => {
	let currentYear = moment().year();
	const [datasetYear, setDatasetYear] = useState(currentYear);
	const classes = useStyles({});
	const theme = useTheme();
	const measurements = useStoreState(state => state.dashboard.measurement.items);
	const visits = measurementService.groupVisitsByYearMonth(measurements, datasetYear);
	const distinctYears = _.uniq(measurements.map(u => moment(u.dateOfService).year())).sort();
	//.reduce((un, u) => ({ ...un, u }), {});

	console.log('distinctYears', distinctYears);

	const chartData = {
		labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
		datasets: [
			{
				label: 'Visits',
				fill: 'start',
				data: visits.map(v => v.visits),
				borderColor: theme.palette.secondary.main,
				backgroundColor: theme.palette.secondary.main,
				pointBackgroundColor: theme.palette.secondary.dark,
				pointHoverBackgroundColor: theme.palette.secondary.main,
				pointBorderColor: theme.palette.secondary.contrastText,
				pointHoverBorderColor: theme.palette.secondary.contrastText,
			},
		],
		options: {
			spanGaps: false,
			legend: {
				display: false,
			},
			maintainAspectRatio: false,
			layout: {
				padding: {
					top: 32,
					left: 32,
					right: 32,
				},
			},
			elements: {
				point: {
					radius: 4,
					borderWidth: 2,
					hoverRadius: 4,
					hoverBorderWidth: 2,
				},
				line: {
					tension: 0,
				},
			},
			scales: {
				xAxes: [
					{
						gridLines: {
							display: false,
							drawBorder: false,
							tickMarkLength: 18,
						},
						ticks: {
							fontColor: '#ffffff',
						},
					},
				],
				yAxes: [
					{
						display: false,
						// ticks: {
						// 	min: 1.5,
						// 	max: 5,
						// 	stepSize: 0.5,
						// },
					},
				],
			},
			plugins: {
				filler: {
					propagate: false,
				},
				xLabelsOnTop: {
					active: true,
				},
			},
		},
	};
	return (
		<div className={classes.root}>
			<div className="container relative p-16 sm:p-10 flex flex-row justify-between items-center">
				<div className="flex-col">
					<Typography className="h2" color="textPrimary">
						Visitors
					</Typography>
					<Typography className="h5" color="textSecondary">
						Unique visitors by year and month
					</Typography>
				</div>

				<div className="flex flex-row items-center">
					{distinctYears.map(key => (
						<Button
							key={key}
							className="py-8 px-12"
							size="small"
							onClick={() => setDatasetYear(key)}
							disabled={key === datasetYear}
						>
							{key}
						</Button>
					))}
				</div>
			</div>
			<div className="container relative h-200 sm:h-256 pb-6">
				<Line data={chartData} options={chartData.options} />
			</div>
		</div>
	);
};

export default MeasurementAreaChart;
