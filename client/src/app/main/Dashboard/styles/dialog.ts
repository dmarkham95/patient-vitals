import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
	createStyles({
		largeAvatar: {
			width: '90px',
			height: '90px',
			backgroundColor: theme.palette.primary.main,
		},
		largeIcon: {
			fontSize: '4.5rem !important',
		},
		datePicker: {
			display: 'block',
			boxSizing: 'border-box',
			width: '100%',
			borderRadius: '4px',
			border: '1px solid white',
			padding: '10px 15px',
			marginBottom: '10px',
			fontSize: '14px',
		},
	}),
);
