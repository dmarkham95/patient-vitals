import AppLayout from '@app/components/AppLayout/AppLayout';
import { StoreProvider } from 'easy-peasy';
import React from 'react';
import { Router } from 'react-router';
import history from '../appHistory';
import routes from './app-configs/routesConfig';
import AppContext from './AppContext';
import ErrorBoundary from './main/Error/error-boundary/ErrorBoundary';
import store from './store';

const App: React.FC = () => {
	return (
		<ErrorBoundary>
			<AppContext.Provider value={{ routes }}>
				<StoreProvider store={store}>
					<Router history={history}>
						<AppLayout />
					</Router>
				</StoreProvider>
			</AppContext.Provider>
		</ErrorBoundary>
	);
};

export default App;
