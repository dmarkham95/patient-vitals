import DateFnsUtils from '@date-io/date-fns';
import { Button, Dialog, DialogActions, DialogContent, Grid, TextField, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import PollIcon from '@material-ui/icons/Poll';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Measurement from 'app/interfaces/measurement/Measurement';
import Patient from 'app/interfaces/patient/Patient';
import dialogStyles from 'app/main/Dashboard/styles/dialog';
import { useStoreActions, useStoreState } from 'app/store/hooks';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

const MeasurementSchema = yup.object().shape({
	patientId: yup
		.number()
		.required('Required')
		.typeError('Please select a Patient from the dropdown.'),
	dateOfService: yup
		.date()
		.max(new Date())
		.typeError('Invalid Date')
		.required('Required'),
	pulse: yup
		.number()
		.required('Required')
		.typeError('Must be a number'),
	weight: yup
		.number()
		.required('Required')
		.typeError('Must be a number'),
	temperature: yup
		.number()
		.required('Required')
		.typeError('Must be a number'),
	bpOver: yup
		.number()
		.required('Required')
		.typeError('Must be a number'),
	bpUnder: yup
		.number()
		.required('Required')
		.typeError('Must be a number'),
});

const defaultValues: Measurement = {
	patientId: null,
	dateOfService: null,
	pulse: null,
	weight: null,
	temperature: null,
	bpOver: null,
	bpUnder: null,
};

const MeasurementDialog: React.FC = () => {
	const classes = dialogStyles({});
	const measurementDialog = useStoreState(state => state.dashboard.measurement.measurementDialog);
	const patients = useStoreState(state => state.dashboard.patient.items);
	const closeDialog = useStoreActions(state => state.dashboard.measurement.closeDialog);
	const createMeasurement = useStoreActions(state => state.dashboard.measurement.createMeasurement);
	const { register, getValues, handleSubmit, errors, reset, control } = useForm<Measurement>({
		validationSchema: MeasurementSchema,
		defaultValues,
	});
	const showMessage = useStoreActions(state => state.global.message.showMessage);

	const onSubmit = async (data: Measurement) => {
		try {
			await createMeasurement(data);
			closeDialog();
			showMessage({
				message: 'Measurement saved',
				variant: 'success',
			});
		} catch (error) {
			showMessage({
				message: 'Error creating Measurement. Please try again',
				variant: 'error',
			});
		}

		reset();
	};

	let vals = getValues();

	return (
		<Dialog fullWidth onClose={() => closeDialog()} scroll="body" maxWidth="sm" open={measurementDialog.isOpen}>
			<Grid container spacing={0}>
				<Grid item xs={12} lg={12}>
					<DialogContent>
						<form id="patient" onSubmit={handleSubmit(onSubmit)} noValidate className="pt-4">
							<div className="text-center">
								<div className="inline-block">
									<Avatar className={classes.largeAvatar}>
										<PollIcon className={classes.largeIcon} fontSize="large" />
									</Avatar>
								</div>

								<div className="mb-4 mt-4">
									<Typography variant="h4">Create Patient Measurements</Typography>
								</div>
								<div className="mb-4 mt-4">
									<Typography variant="subtitle1" color="textSecondary">
										Fill in the fields below to add new patient measurements.
									</Typography>
								</div>
							</div>

							<div className="mt-4">
								<div className="mb-3">
									<Controller
										as={Autocomplete}
										control={control}
										name="patientId"
										id="combo-box-patient"
										options={patients}
										getOptionLabel={(option: Patient) => (option.fullName ? option.fullName : '')}
										onChange={([, data]) => (data ? String(data.id) : null)}
										valueName={'id'}
										getOptionSelected={(option: Patient, value: Patient) => {
											return option.id === value.id;
										}}
										renderInput={params => (
											<TextField
												{...params}
												label="Patient"
												variant="outlined"
												error={!!errors.patientId}
												helperText={errors.patientId ? errors.patientId.message : ''}
											/>
										)}
									/>
								</div>
								<div className="mb-3">
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<Controller
											as={KeyboardDatePicker}
											control={control}
											inputRef={register}
											name="dateOfService"
											value={vals.dateOfService}
											disableToolbar
											variant="inline"
											format="MM/dd/yyyy"
											margin="normal"
											id="date-of-service"
											label="Date of Service"
											inputVariant="outlined"
											fullWidth
											onChange={([, data]) => data}
											KeyboardButtonProps={{
												'aria-label': 'change date',
											}}
											error={!!errors.dateOfService}
											helperText={errors.dateOfService ? errors.dateOfService.message : ''}
										/>
									</MuiPickersUtilsProvider>
								</div>

								<div className="mb-3">
									<TextField
										inputRef={register}
										label="Pulse"
										name="pulse"
										fullWidth
										variant="outlined"
										placeholder="Enter patient pulse rate"
										type="number"
										error={!!errors.pulse}
										helperText={errors.pulse ? errors.pulse.message : ''}
									/>
								</div>
								<div className="mb-3">
									<TextField
										inputRef={register}
										label="Weight"
										name="weight"
										fullWidth
										variant="outlined"
										placeholder="Enter patient weight"
										type="number"
										error={!!errors.weight}
										helperText={errors.weight ? errors.weight.message : ''}
									/>
								</div>

								<div className="mb-3">
									<TextField
										inputRef={register}
										label="Temperature"
										name="temperature"
										fullWidth
										variant="outlined"
										placeholder="Enter patient temperature"
										type="number"
										error={!!errors.temperature}
										helperText={errors.temperature ? errors.temperature.message : ''}
									/>
								</div>

								<div className="mb-3 flex flex-wrap -mx-2">
									<div className="w-full md:w-1/2 px-2 mb-6 md:mb-0">
										<TextField
											inputRef={register}
											label="Blood Pressure Over"
											name="bpOver"
											fullWidth
											variant="outlined"
											placeholder="Enter patient BP Over"
											type="number"
											error={!!errors.bpOver}
											helperText={errors.bpOver ? errors.bpOver.message : ''}
										/>
									</div>

									<div className="w-full md:w-1/2 px-2 mb-6 md:mb-0">
										<TextField
											inputRef={register}
											label="Blood Pressure Under"
											name="bpUnder"
											fullWidth
											variant="outlined"
											placeholder="Enter patient BP Under"
											type="number"
											error={!!errors.bpUnder}
											helperText={errors.bpUnder ? errors.bpUnder.message : ''}
										/>
									</div>
								</div>
							</div>
						</form>
					</DialogContent>
					<DialogActions className="mb-5">
						<Button onClick={() => closeDialog()} variant="contained" color="default" className="mb-5">
							Cancel
						</Button>
						<Button form="patient" type="submit" color="primary" variant="contained" className="mb-5">
							Create Measurement
						</Button>
					</DialogActions>
				</Grid>
			</Grid>
		</Dialog>
	);
};

export default MeasurementDialog;
