import { AppMessage, AppSuspense } from '@app';
import AppContext from 'app/AppContext';
import React from 'react';
import { renderRoutes } from 'react-router-config';
import ToolbarLayout from './components/ToolbarLayout';
import useLayoutStyles from './styles/layout';

type Props = {
	children?: React.ReactNode;
};

function MainLayout(props: Props) {
	const classes = useLayoutStyles({});

	return (
		<AppContext.Consumer>
			{({ routes }) => (
				<div id="app-layout" className={classes.root}>
					<div className={classes.content}>
						<div className="flex flex-1 flex-col overflow-hidden relative">
							<ToolbarLayout />
							<div className="flex flex-auto flex-col relative h-full">
								<AppSuspense>{renderRoutes(routes)}</AppSuspense>
								{props.children}
							</div>
						</div>
					</div>

					<AppMessage />
				</div>
			)}
		</AppContext.Consumer>
	);
}

export default MainLayout;
