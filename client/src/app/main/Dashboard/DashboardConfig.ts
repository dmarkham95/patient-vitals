import AppRouteConfig from 'app/interfaces/routes/AppRouteConfig';
import React from 'react';

export const DashboardConfig: AppRouteConfig = {
	routes: [{ path: '/dashboard', component: React.lazy(() => import('./Dashboard')) }],
};
