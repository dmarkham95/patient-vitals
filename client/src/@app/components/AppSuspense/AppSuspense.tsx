import { AppLoading } from "@app";
import PropTypes from "prop-types";
import React from "react";

/**
 * React Suspense defaults
 * For to Avoid Repetition
 */ function AppSuspense(props) {
	return (
		<React.Suspense fallback={<AppLoading {...props.loadingProps} />}>
			{props.children}
		</React.Suspense>
	);
}

AppSuspense.propTypes = {
	loadingProps: PropTypes.object,
};

AppSuspense.defaultProps = {
	loadingProps: {
		delay: 300,
	},
};

export default AppSuspense;
