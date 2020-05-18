import DateFnsUtils from '@date-io/date-fns';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	FormControl,
	FormControlLabel,
	FormHelperText,
	FormLabel,
	Grid,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Patient from 'app/interfaces/patient/Patient';
import dialogStyles from 'app/main/Dashboard/styles/dialog';
import { useStoreActions, useStoreState } from 'app/store/hooks';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

const PatientSchema = yup.object().shape({
	firstName: yup
		.string()
		.trim()
		.min(2, 'Must be at least 2 characters.')
		.max(20, 'Can be no longer than 20 characters')
		.required('Required'),
	middleName: yup
		.string()
		.trim()
		.min(1, 'Must be at least 1 characters.')
		.max(20, 'Can be no longer than 20 characters')
		.required('Required'),
	lastName: yup
		.string()
		.trim()
		.min(2, 'Must be at least 2 characters.')
		.max(20, 'Can be no longer than 20 characters')
		.required('Required'),
	gender: yup
		.string()
		.trim()
		.required('Required'),
	dateOfBirth: yup
		.date()
		.max(new Date())
		.typeError('Invalid Date')
		.required('Required'),
	city: yup
		.string()
		.trim()
		.required('Required'),
	state: yup
		.string()
		.trim()
		.typeError('Please select a State from the dropdown.')
		.required('Required'),
});

const defaultValues: Patient = {
	firstName: '',
	middleName: '',
	lastName: '',
	gender: '',
	dateOfBirth: null,
	city: '',
	state: '',
};

const PatientDialog: React.FC = () => {
	const classes = dialogStyles({});
	const patientDialog = useStoreState(state => state.dashboard.patient.patientDialog);
	const closeDialog = useStoreActions(state => state.dashboard.patient.closeDialog);
	const createPatient = useStoreActions(state => state.dashboard.patient.createPatient);
	const { register, getValues, handleSubmit, errors, reset, control } = useForm<Patient>({
		validationSchema: PatientSchema,
		defaultValues,
	});
	const showMessage = useStoreActions(state => state.global.message.showMessage);

	const onSubmit = async (data: Patient) => {
		try {
			await createPatient(data);
			closeDialog();
			showMessage({
				message: 'Patient saved',
				variant: 'success',
			});
		} catch (error) {
			showMessage({
				message: 'Error creating Patient. Please try again',
				variant: 'error',
			});
		}

		reset();
	};

	const states = [
		{
			name: 'Alabama',
			abbreviation: 'AL',
		},
		{
			name: 'Alaska',
			abbreviation: 'AK',
		},
		{
			name: 'American Samoa',
			abbreviation: 'AS',
		},
		{
			name: 'Arizona',
			abbreviation: 'AZ',
		},
		{
			name: 'Arkansas',
			abbreviation: 'AR',
		},
		{
			name: 'California',
			abbreviation: 'CA',
		},
		{
			name: 'Colorado',
			abbreviation: 'CO',
		},
		{
			name: 'Connecticut',
			abbreviation: 'CT',
		},
		{
			name: 'Delaware',
			abbreviation: 'DE',
		},
		{
			name: 'District Of Columbia',
			abbreviation: 'DC',
		},
		{
			name: 'Federated States Of Micronesia',
			abbreviation: 'FM',
		},
		{
			name: 'Florida',
			abbreviation: 'FL',
		},
		{
			name: 'Georgia',
			abbreviation: 'GA',
		},
		{
			name: 'Guam',
			abbreviation: 'GU',
		},
		{
			name: 'Hawaii',
			abbreviation: 'HI',
		},
		{
			name: 'Idaho',
			abbreviation: 'ID',
		},
		{
			name: 'Illinois',
			abbreviation: 'IL',
		},
		{
			name: 'Indiana',
			abbreviation: 'IN',
		},
		{
			name: 'Iowa',
			abbreviation: 'IA',
		},
		{
			name: 'Kansas',
			abbreviation: 'KS',
		},
		{
			name: 'Kentucky',
			abbreviation: 'KY',
		},
		{
			name: 'Louisiana',
			abbreviation: 'LA',
		},
		{
			name: 'Maine',
			abbreviation: 'ME',
		},
		{
			name: 'Marshall Islands',
			abbreviation: 'MH',
		},
		{
			name: 'Maryland',
			abbreviation: 'MD',
		},
		{
			name: 'Massachusetts',
			abbreviation: 'MA',
		},
		{
			name: 'Michigan',
			abbreviation: 'MI',
		},
		{
			name: 'Minnesota',
			abbreviation: 'MN',
		},
		{
			name: 'Mississippi',
			abbreviation: 'MS',
		},
		{
			name: 'Missouri',
			abbreviation: 'MO',
		},
		{
			name: 'Montana',
			abbreviation: 'MT',
		},
		{
			name: 'Nebraska',
			abbreviation: 'NE',
		},
		{
			name: 'Nevada',
			abbreviation: 'NV',
		},
		{
			name: 'New Hampshire',
			abbreviation: 'NH',
		},
		{
			name: 'New Jersey',
			abbreviation: 'NJ',
		},
		{
			name: 'New Mexico',
			abbreviation: 'NM',
		},
		{
			name: 'New York',
			abbreviation: 'NY',
		},
		{
			name: 'North Carolina',
			abbreviation: 'NC',
		},
		{
			name: 'North Dakota',
			abbreviation: 'ND',
		},
		{
			name: 'Northern Mariana Islands',
			abbreviation: 'MP',
		},
		{
			name: 'Ohio',
			abbreviation: 'OH',
		},
		{
			name: 'Oklahoma',
			abbreviation: 'OK',
		},
		{
			name: 'Oregon',
			abbreviation: 'OR',
		},
		{
			name: 'Palau',
			abbreviation: 'PW',
		},
		{
			name: 'Pennsylvania',
			abbreviation: 'PA',
		},
		{
			name: 'Puerto Rico',
			abbreviation: 'PR',
		},
		{
			name: 'Rhode Island',
			abbreviation: 'RI',
		},
		{
			name: 'South Carolina',
			abbreviation: 'SC',
		},
		{
			name: 'South Dakota',
			abbreviation: 'SD',
		},
		{
			name: 'Tennessee',
			abbreviation: 'TN',
		},
		{
			name: 'Texas',
			abbreviation: 'TX',
		},
		{
			name: 'Utah',
			abbreviation: 'UT',
		},
		{
			name: 'Vermont',
			abbreviation: 'VT',
		},
		{
			name: 'Virgin Islands',
			abbreviation: 'VI',
		},
		{
			name: 'Virginia',
			abbreviation: 'VA',
		},
		{
			name: 'Washington',
			abbreviation: 'WA',
		},
		{
			name: 'West Virginia',
			abbreviation: 'WV',
		},
		{
			name: 'Wisconsin',
			abbreviation: 'WI',
		},
		{
			name: 'Wyoming',
			abbreviation: 'WY',
		},
	];

	let vals = getValues();
	return (
		<Dialog fullWidth onClose={() => closeDialog()} scroll="body" maxWidth="sm" open={patientDialog.isOpen}>
			<Grid container spacing={0}>
				<Grid item xs={12} lg={12}>
					<DialogContent>
						<form id="patient" onSubmit={handleSubmit(onSubmit)} noValidate className="pt-4">
							<div className="text-center">
								<div className="inline-block">
									<Avatar className={classes.largeAvatar}>
										<PersonIcon className={classes.largeIcon} fontSize="large" />
									</Avatar>
								</div>

								<div className="mb-4 mt-4">
									<Typography variant="h4">Create Patient</Typography>
								</div>
								<div className="mb-4 mt-4">
									<Typography variant="subtitle1" color="textSecondary">
										Fill in the fields below to add new patient.
									</Typography>
								</div>
							</div>

							<div className="mt-4">
								<div className="mb-3">
									<TextField
										inputRef={register}
										label="First Name"
										name="firstName"
										fullWidth
										variant="outlined"
										placeholder="Enter your First Name"
										type="text"
										error={!!errors.firstName}
										helperText={errors.firstName ? errors.firstName.message : ''}
									/>
								</div>
								<div className="mb-3">
									<TextField
										inputRef={register}
										label="Middle Name"
										name="middleName"
										fullWidth
										variant="outlined"
										placeholder="Enter your Middle Name"
										type="text"
										error={!!errors.middleName}
										helperText={errors.middleName ? errors.middleName.message : ''}
									/>
								</div>

								<div className="mb-3">
									<TextField
										inputRef={register}
										label="Last Name"
										name="lastName"
										fullWidth
										variant="outlined"
										placeholder="Enter your Last Name"
										type="text"
										error={!!errors.lastName}
										helperText={errors.lastName ? errors.lastName.message : ''}
									/>
								</div>
								<div className="mb-3">
									<Controller
										as={
											<FormControl error={!!errors.gender} variant="outlined">
												<FormLabel component="legend">Gender</FormLabel>
												<RadioGroup aria-label="gender">
													<FormControlLabel
														value="Female"
														control={<Radio />}
														label="Female"
													/>
													<FormControlLabel value="Male" control={<Radio />} label="Male" />
												</RadioGroup>
												<FormHelperText>
													{errors.gender ? errors.gender.message : ''}
												</FormHelperText>
											</FormControl>
										}
										name="gender"
										control={control}
									/>
								</div>
								<div className="mb-3">
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<Controller
											as={KeyboardDatePicker}
											control={control}
											inputRef={register}
											name="dateOfBirth"
											value={vals.dateOfBirth}
											disableToolbar
											variant="inline"
											format="MM/dd/yyyy"
											margin="normal"
											id="date-of-birth"
											label="Date of Birth"
											inputVariant="outlined"
											fullWidth
											onChange={([, data]) => data}
											KeyboardButtonProps={{
												'aria-label': 'change date',
											}}
											error={!!errors.dateOfBirth}
											helperText={errors.dateOfBirth ? errors.dateOfBirth.message : ''}
										/>
									</MuiPickersUtilsProvider>
								</div>
								<div className="mb-3">
									<TextField
										inputRef={register}
										label="City"
										name="city"
										fullWidth
										variant="outlined"
										placeholder="Enter your city"
										type="text"
										error={!!errors.city}
										helperText={errors.city ? errors.city.message : ''}
									/>
								</div>
								<div className="mb-3">
									<Controller
										as={Autocomplete}
										control={control}
										name="state"
										id="combo-box-state"
										options={states}
										getOptionLabel={(option: any) => option['name']}
										onChange={([, data]) => data.abbreviation}
										valueName={'abbreviation'}
										getOptionSelected={(option, value) => value}
										renderInput={params => (
											<TextField
												{...params}
												label="State"
												variant="outlined"
												error={!!errors.state}
												helperText={errors.state ? errors.state.message : ''}
											/>
										)}
									/>
								</div>
							</div>
						</form>
					</DialogContent>
					<DialogActions className="mb-5">
						<Button onClick={() => closeDialog()} variant="contained" color="default" className="mb-5">
							Cancel
						</Button>
						<Button form="patient" type="submit" color="primary" variant="contained" className="mb-5">
							Create Patient
						</Button>
					</DialogActions>
				</Grid>
			</Grid>
		</Dialog>
	);
};

export default PatientDialog;
