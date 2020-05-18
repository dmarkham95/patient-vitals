import { IconButton } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import Patient from 'app/interfaces/patient/Patient';
import { useStoreActions } from 'app/store/hooks';
import moment from 'moment';
import React from 'react';
import ReactTable, { Column } from 'react-table';

type Props = {
	patients: Array<Patient>;
};

const PatientTable: React.FC<Props> = (props: Props) => {
	const openDetailsDialog = useStoreActions(state => state.dashboard.patient.openDetailsDialog);
	const getFormattedDate = date => {
		if (date) {
			date = moment.utc(date).format('MM/DD/YYYY');
		}
		return date;
	};

	const columns: Array<Column<Patient>> = [
		{
			Header: '',
			maxWidth: 50,
			Cell: row => (
				<div className="flex items-center">
					<IconButton
						onClick={ev => {
							ev.stopPropagation();
							var current = row.original;
							onViewDetails(current as Patient);
						}}
					>
						<InfoIcon color="primary" />
					</IconButton>
				</div>
			),
		},
		{
			id: 'fullName',
			Header: 'Patient Name',
			filterable: true,
			accessor: d => d.fullName,
		},
		{
			id: 'gender',
			Header: 'Gender',
			filterable: true,
			accessor: d => d.gender,
		},
		{
			id: 'dateOfBirth',
			Header: 'Date Of Birth',
			filterable: true,
			Cell: row => getFormattedDate(row.value),
			accessor: d => d.dateOfBirth,
		},
		{
			id: 'age',
			Header: 'Age',
			filterable: true,
			accessor: d => d.age,
		},
		{
			id: 'cityState',
			Header: 'Location',
			filterable: true,
			accessor: d => d.cityState,
		},
	];

	const onViewDetails = (m: Patient) => {
		//dispatch(openPolicyDialog(m));
		console.log(m);
		openDetailsDialog(m);
	};
	return (
		<ReactTable<Patient>
			style={{
				maxHeight: '450px',
			}}
			className="-striped -highlight border-0"
			data={props.patients}
			columns={columns}
			noDataText="No Patients found"
			minRows={0}
		></ReactTable>
	);
};

export default React.memo(PatientTable);
