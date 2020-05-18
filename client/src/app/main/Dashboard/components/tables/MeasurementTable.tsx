import Measurement from 'app/interfaces/measurement/Measurement';
import moment from 'moment';
import React from 'react';
import ReactTable, { Column } from 'react-table';

type Props = {
	measurements: Array<Measurement>;
	hidePatientCol: boolean;
};

const MeasurementTable: React.FC<Props> = (props: Props) => {
	const getFormattedDate = date => {
		if (date) {
			date = moment.utc(date).format('MM/DD/YYYY');
		}
		return date;
	};

	const columns: Array<Column<Measurement>> = [
		{
			id: 'patient.fullName',
			Header: 'Patient',
			filterable: true,
			accessor: d => d.patient.fullName,
		},
		{
			id: 'date',
			Header: 'Visit Date',
			filterable: true,
			Cell: row => getFormattedDate(row.value),
			accessor: d => d.dateOfService,
		},
		{
			id: 'weight',
			Header: 'Weight',
			filterable: true,
			accessor: d => d.weight,
		},
		{
			id: 'pulse',
			Header: 'Pulse Rate',
			filterable: true,
			accessor: d => d.pulse,
		},
		{
			id: 'temperature',
			Header: 'Temperature',
			filterable: true,
			accessor: d => d.temperature,
		},
		{
			id: 'bpOver',
			Header: 'Blood Pressure',
			filterable: true,
			Cell: row => `${row.original.bpOver}/${row.original.bpUnder}`,
			accessor: d => d.bpOver,
		},
	];

	if (props.hidePatientCol) {
		columns.shift();
	}

	return (
		<ReactTable<Measurement>
			style={{
				maxHeight: '450px',
				minHeight: '450px',
			}}
			className="-striped -highlight border-0"
			data={props.measurements}
			columns={columns}
			noDataText="No Measurements found"
			minRows={0}
		></ReactTable>
	);
};

export default React.memo(MeasurementTable);
