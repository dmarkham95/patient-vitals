
import { amber, blue, green } from "@material-ui/core/colors";
import { makeStyles, Theme } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) => ({
	root: {},
	success: {
		backgroundColor: green[600],
		color: "#FFFFFF",
	},
	error: {
		backgroundColor: theme.palette.error.dark,
		color: theme.palette.getContrastText(theme.palette.error.dark),
	},
	info: {
		backgroundColor: blue[600],
		color: "#FFFFFF",
	},
	warning: {
		backgroundColor: amber[600],
		color: "#FFFFFF",
	},
}));