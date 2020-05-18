import { AppUtils } from '@app';
import { Card, CardHeader, Divider, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import { Bar } from 'react-chartjs-2';

type Props = {
	chartLabels: Array<string>;
	chartTitle: string;
	sourceTitle: string;
	sourceSubTitle: string;
	sourceTotal: string;
	sourceTotalTitle: string;
	sourceLabel: string;
	sourceData: number[];
	targetLabel: string;
	targetData: number[];
};

const ComparisonBarChartCard: React.FC<Props> = (props: Props) => {
	const theme = useTheme();

	const data = {
		labels: props.chartLabels,
		datasets: [
			{
				label: props.sourceLabel,
				borderColor: theme.palette.secondary.main,
				backgroundColor: theme.palette.secondary.main,
				borderWidth: 1,
				hoverBackgroundColor: theme.palette.secondary.dark,
				hoverBorderColor: theme.palette.secondary.dark,
				data: props.sourceData,
			},
			{
				label: props.targetLabel,
				borderColor: theme.palette.primary.main,
				backgroundColor: theme.palette.primary.main,
				borderWidth: 1,
				hoverBackgroundColor: theme.palette.primary.dark,
				hoverBorderColor: theme.palette.primary.dark,
				data: props.targetData,
			},
		],
	};

	const options = {
		spanGaps: false,
		legend: {
			display: false,
		},
		scales: {
			xAxes: [
				{
					gridLines: {
						display: false,
					},
				},
			],
		},
	};

	return (
		<Card elevation={4} className="p-4 text-center">
			<CardHeader title={props.sourceTitle} subheader={props.sourceSubTitle} />
			<div className="my-4">
				<Divider />
			</div>

			<div>
				<Typography className="mb-0" variant="h3">
					{AppUtils.numberWithCommas(props.sourceTotal)}
				</Typography>
				<Typography variant="subtitle1" color="textSecondary">
					{props.sourceTotalTitle}
				</Typography>
			</div>

			<div className="my-4">
				<Divider />
			</div>

			<div className="mt-5 mb-5">
				<Typography variant="h5">{props.chartTitle}</Typography>
			</div>

			<Bar data={data} options={options} />
		</Card>
	);
};

export default ComparisonBarChartCard;
