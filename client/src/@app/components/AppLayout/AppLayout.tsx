import { withStyles } from '@material-ui/core';
import MainLayout from 'app/app-layouts/mainLayout/MainLayout';
import AppContext from 'app/AppContext';
import _ from 'lodash';
import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { matchRoutes } from 'react-router-config';
import styles from './styles';

type BaseProps = {
	className?: string;
	style?: React.CSSProperties;
	children?: React.ReactNode;
	classess?: any;
};

type Props = { settings?: any; classes?: any } & BaseProps & RouteComponentProps;
type State = {
	routes: any;
	awaitRender: boolean;
};
class AppLayout extends Component<Props, State> {
	constructor(props: Readonly<Props>, context: { routes: any }) {
		super(props);
		const { routes } = context;

		this.state = {
			awaitRender: false,
			routes,
		};
	}

	static getDerivedStateFromProps(props: any, state: any) {
		const { pathname } = props.location;
		const matched = matchRoutes(state.routes, pathname)[0];
		let newSettings = props.settings;

		if (state.pathname !== pathname) {
			if (matched && matched.route.settings) {
				if (!_.isEqual(props.settings, newSettings)) {
					props.setSettings(newSettings);
				}
			} else {
				if (!_.isEqual(props.settings, props.defaultSettings)) {
					newSettings = _.merge({}, props.defaultSettings);

					props.resetSettings();
				}
			}
		}

		return {
			awaitRender: !_.isEqual(props.settings, newSettings),
			pathname,
		};
	}

	render() {
		const { classes } = this.props;
		return <MainLayout classes={{ root: classes.root }} {...this.props} />;
	}
}

AppLayout.contextType = AppContext;

export default withStyles(styles, { withTheme: true })(withRouter(React.memo(AppLayout)));
