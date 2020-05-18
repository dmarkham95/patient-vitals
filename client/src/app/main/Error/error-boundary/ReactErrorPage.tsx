import { Typography } from '@material-ui/core';
import React from 'react';

const ReactErrorPage = () => {
	return (
		<div style={{ background: 'white' }} className="flex flex-col flex-1 items-center justify-center p-16">
			<div className="max-w-512 text-center">
				<img style={{ width: '550px', margin: 'auto' }} src="/logo512.png" alt="logo" />

				<Typography variant="h1" color="inherit" className="font-medium mb-16">
					Oops!
				</Typography>

				<Typography variant="h5" color="textSecondary" className="mb-16">
					Well, you broke the internet!
				</Typography>

				<Typography variant="h5" color="textSecondary" className="mb-48">
					Just kidding, looks like we're having issue. You may refresh the page or try again later.
				</Typography>
			</div>
		</div>
	);
};

export default ReactErrorPage;
