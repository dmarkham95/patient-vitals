import { Icon, IconButton, Snackbar, SnackbarContent } from '@material-ui/core';
import { useStoreActions, useStoreState } from 'app/store/hooks';
import clsx from 'clsx';
import React from 'react';
import useStyles from './styles';

const variantIcon = {
	success: 'check_circle',
	warning: 'warning',
	error: 'error_outline',
	info: 'info',
};

const AppMessage: React.FC = () => {
	const messageOptions = useStoreState(state => state.global.message);
	const messageActions = useStoreActions(state => state.global.message);
	const classes = useStyles({});

	return (
		<Snackbar
			{...messageOptions.options}
			open={messageOptions.isOpen}
			onClose={() => messageActions.hideMessage()}
			classes={{
				root: classes.root,
			}}
		>
			<SnackbarContent
				className={clsx(classes[messageOptions.options.variant])}
				message={
					<div className="flex items-center">
						{variantIcon[messageOptions.options.variant] && (
							<Icon className="mr-8" color="inherit">
								{variantIcon[messageOptions.options.variant]}
							</Icon>
						)}
						{messageOptions.options.message}
					</div>
				}
				action={[
					<IconButton
						key="close"
						aria-label="Close"
						color="inherit"
						onClick={() => messageActions.hideMessage()}
					>
						<Icon>close</Icon>
					</IconButton>,
				]}
			/>
		</Snackbar>
	);
};

export default AppMessage;
