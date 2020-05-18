import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
	pageTitle: {
		margin: '0.5rem -2rem 2rem',
		padding: '2rem 3rem 2rem 2rem',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		position: 'relative',
	},
	pageTitleHeader: {
		paddingRight: '1rem',
	},
	pageTitleDescription: {
		margin: '.5rem 0 0',
		fontSize: '1.045rem',
		opacity: '.6',
		fontWeight: 400,
	},
});
