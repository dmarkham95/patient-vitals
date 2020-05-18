import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
	root: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		'&.boxed': {
			maxWidth: 1280,
			margin: '0 auto',
			boxShadow: theme.shadows[3],
		},
		'&.container': {
			'& .container': {
				maxWidth: 1120,
				width: '100%',
				margin: '0 auto',
			},
			'& .navigation': {},
		},
	},
	content: {
		display: 'flex',
		overflow: 'auto',
		flex: '1 1 auto',
		flexDirection: 'column',
		width: '100%',
		'-webkit-overflow-scrolling': 'touch',
		zIndex: 4,
	},
	toolbarWrapper: {
		display: 'flex',
		position: 'relative',
		zIndex: 5,
	},
	toolbar: {
		display: 'flex',
		flex: '1 0 auto',
	},
	footerWrapper: {
		position: 'relative',
		zIndex: 5,
	},
	footer: {
		display: 'flex',
		flex: '1 0 auto',
	},
}));
