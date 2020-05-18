import { Grid } from '@material-ui/core';
import { measurementService } from 'app/services/apiServices/measurement-service';
import { useStoreState } from 'app/store/hooks';
import moment from 'moment';
import React from 'react';
import { ComparisonBarChartCard } from '../components/widgets';

const SectionTwo: React.FC = () => {
	let currentYear = moment().year();
	let prevYear = moment().year() - 1;
	const labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
	const measurements = useStoreState(state => state.dashboard.measurement.items);
	const maleVisits = measurements.filter(m => m.patient.gender === 'Male');
	const femaleVisits = measurements.filter(m => m.patient.gender === 'Female');

	let maleVisitsCurrentYear = measurementService.groupVisitsByYearMonth(maleVisits, currentYear);
	let maleVisitsPrevYear = measurementService.groupVisitsByYearMonth(maleVisits, prevYear);
	let totalMaleVisitsCurrentYear = maleVisitsCurrentYear.reduce((visits, u) => visits + u.visits, 0);

	let femaleVisitsCurrentYear = measurementService.groupVisitsByYearMonth(femaleVisits, currentYear);
	let femaleVisitsPrevYear = measurementService.groupVisitsByYearMonth(femaleVisits, prevYear);
	let totalFemaleVisitsCurrentYear = femaleVisitsCurrentYear.reduce((visits, u) => visits + u.visits, 0);

	return (
		<div className="m-5">
			<Grid container spacing={4}>
				<Grid item xs={12} lg={6}>
					<ComparisonBarChartCard
						chartLabels={labels}
						chartTitle="Monthly Report"
						sourceTitle="Male Visits"
						sourceSubTitle="Male Visits To Date"
						sourceTotal={totalMaleVisitsCurrentYear.toString()}
						sourceTotalTitle="Total Male Visits Year To Date"
						sourceLabel={currentYear.toString()}
						sourceData={maleVisitsCurrentYear.map(v => v.visits)}
						targetLabel={prevYear.toString()}
						targetData={maleVisitsPrevYear.map(v => v.visits)}
					/>
				</Grid>
				<Grid item xs={12} lg={6}>
					<ComparisonBarChartCard
						chartLabels={labels}
						chartTitle="Monthly Report"
						sourceTitle="Female Visits"
						sourceSubTitle="Female Visits To Date"
						sourceTotal={totalFemaleVisitsCurrentYear.toString()}
						sourceTotalTitle="Total Female Visits Year To Date"
						sourceLabel={currentYear.toString()}
						sourceData={femaleVisitsCurrentYear.map(v => v.visits)}
						targetLabel={prevYear.toString()}
						targetData={femaleVisitsPrevYear.map(v => v.visits)}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default SectionTwo;
