import AppRouteConfig from 'app/interfaces/routes/AppRouteConfig';
import React from 'react';

export const ErrorPageConfig: AppRouteConfig = {
	routes: [
		{
			path: '/error-500',
			component: React.lazy(() => import('./500/Error500Page')),
		},
		{
			path: '/error-404',
			component: React.lazy(() => import('./404/Error404Page')),
		},
		{
			path: '/unauthorized',
			component: React.lazy(() => import('./401/Error401Page')),
		},
	],
};
