import { AppUtils } from '@app';
import AppRouteConfig from 'app/interfaces/routes/AppRouteConfig';
import { DashboardConfig } from 'app/main/Dashboard/DashboardConfig';
import { ErrorPageConfig } from 'app/main/Error/ErrorPageConfig';
import * as React from 'react';
import { Redirect } from 'react-router';

const routeConfigs = [ErrorPageConfig, DashboardConfig];

const routes: AppRouteConfig[] = [
	...AppUtils.generateRoutesFromConfigsV2(routeConfigs),
	{
		path: '/',
		exact: true,
		component: () => <Redirect to="/dashboard" />,
	},
	{
		component: () => <Redirect to="/error-404" />,
	},
];

export default routes;
