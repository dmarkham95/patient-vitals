import { IconButton, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import React from 'react';

const UserMenu: React.FC = () => {
	return (
		<div>
			<IconButton
				aria-label="account of current user"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				color="inherit"
			>
				<AccountCircle />

				<div className="hidden md:flex flex-col items-start">
					<Typography component="span" className="normal-case font-600 flex">
						TestUser
					</Typography>
				</div>
			</IconButton>
		</div>
	);
};

export default UserMenu;
