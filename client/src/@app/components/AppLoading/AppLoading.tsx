import { useTimeout } from "@app/hooks";
import { LinearProgress, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useState } from "react";

function AppLoading(props: { delay: any; }) {
	const [showLoading, setShowLoading] = useState(!props.delay);

	useTimeout(() => {
		setShowLoading(true);
	}, props.delay);

	if (!showLoading) {
		return null;
	}

	return (
		<div className="flex flex-1 flex-col items-center justify-center">
			<Typography className="text-20 mb-16" color="textSecondary">
				Loading...
			</Typography>
			<LinearProgress className="w-xs" color="secondary" />
		</div>
	);
}

AppLoading.propTypes = {
	delay: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};

AppLoading.defaultProps = {
	delay: false,
};

export default AppLoading;

