import ReactErrorPage from "./ReactErrorPage";
import { Component } from "react";
import React from "react";

class ErrorBoundary extends Component {
	state = {
		hasError: false,
	};

	constructor(props: Readonly<{}>) {
		super(props);
		this.state = {
			hasError: false,
		};
	}
	componentDidCatch(error: any, info: any) {
		// Display fallback UI
		this.setState({ hasError: true });
		//Todo log to backend logging system

		// Just logging it in the console for demo purposes
		console.error("ErrorBoundary", error, info);
	}
	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <ReactErrorPage />;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
