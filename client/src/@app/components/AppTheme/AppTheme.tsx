import { red } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';

type Props = {
	children?: React.ReactNode;
};

const AppTheme: React.FC<Props> = (props: Props) => {
	let theme = createMuiTheme({
		palette: {
			primary: {
				light: '#63ccff',
				main: '#009be5',
				dark: '#006db3',
			},
			secondary: {
				light: '#C76A1D',
				main: '#FF994C',
				dark: '#FFCA7B',
				contrastText: '#FFF',
			},
			background: {
				paper: '#FFFFFF',
				default: '#F7F7F7',
			},
			error: red,
		},
	});

	return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default React.memo(AppTheme);
