import AppRouteConfig from 'app/interfaces/routes/AppRouteConfig';
import _ from 'lodash';
import { RouteConfig } from 'react-router-config';

class AppUtils {
	static searchInString(value: string, searchText: string): boolean {
		return value.toLowerCase().includes(searchText);
	}

	static generateGUID(): string {
		function S4(): string {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}

		return S4() + S4();
	}

	static numberWithCommas = (x): string => {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	static randomColor = () => {
		let hex = Math.floor(Math.random() * 16777215).toString(16);
		return '#' + hex;
	};

	static handleize(text: string): string {
		return text
			.toString()
			.toLowerCase()
			.replace(/\s+/g, '-') // Replace spaces with -
			.replace(/\W+/g, '') // Remove all non-word chars
			.replace(/--+/g, '-') // Replace multiple - with single -
			.replace(/^-+/, '') // Trim - from start of text
			.replace(/-+$/, ''); // Trim - from end of text
	}

	static generateRoutesFromConfigsV2(configs: AppRouteConfig[]): RouteConfig[] {
		let allRoutes: RouteConfig[] = [];
		configs.forEach(config => {
			if (config.routes) {
				allRoutes = [...allRoutes, ...this.setRoutesV2(config)];
			}
		});
		return allRoutes;
	}

	static setRoutesV2(config: AppRouteConfig): RouteConfig[] {
		let routes = config.routes || [];

		if (config.settings || config.auth) {
			routes = routes?.map(route => {
				let auth = config.auth || config.auth === undefined ? config.auth : undefined;
				auth = route.auth || route.auth === null ? route.auth : auth;
				const settings = _.merge({}, config.settings, route.settings);

				let appRoute: AppRouteConfig = {
					...route,
					auth: auth,
					settings: settings,
				};

				return appRoute;
			});
		}

		return [...routes];
	}

	static hasPermission(authArr: unknown[] | null | undefined, userRole: string | unknown[]): boolean {
		/**
		 * If auth array is not defined
		 * Pass and allow
		 */
		if (authArr === null || authArr === undefined) {
			// console.info("auth is null || undefined:", authArr);
			return true;
		}
		if (authArr.length === 0) {
			/**
			 * if auth array is empty means,
			 * allow only user role is guest (null or empty[])
			 */
			// console.info("auth is empty[]:", authArr);
			return !userRole || userRole.length === 0;
		}
		/**
		 * Check if user has grants
		 */
		// console.info("auth arr:", authArr);
		/*
            Check if user role is array,
            */
		if (userRole && Array.isArray(userRole)) {
			return authArr.some(r => userRole.includes(r));
		}

		/*
            Check if user role is string,
            */
		return authArr.includes(userRole);
	}
}

export default AppUtils;
