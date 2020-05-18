import { Theme } from '@material-ui/core/styles';

export default (theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		color: theme.palette.text.primary,
		'& code:not([class*="language-"])': {
			color: theme.palette.secondary.dark,
			backgroundColor: '#F5F5F5',
			padding: '2px 3px',
			borderRadius: 2,
			lineHeight: 1.7,
		},
		'& table.simple tbody tr td': {
			borderColor: theme.palette.divider,
		},
		'& table.simple thead tr th': {
			borderColor: theme.palette.divider,
		},
		'& a:not([role=button])': {
			color: theme.palette.secondary.main,
			textDecoration: 'none',
			'&:hover': {
				textDecoration: 'underline',
			},
		},
		'& [class^="border-"]': {
			borderColor: theme.palette.divider,
		},
		'& [class*="border-"]': {
			borderColor: theme.palette.divider,
		},
	},
});
