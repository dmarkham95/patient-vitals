import DashboardStore from 'app/main/Dashboard/store';
import { createStore } from 'easy-peasy';
import Store from '../interfaces/Store';
import GlobalStore from './global';

const store: Store = {
	global: GlobalStore,
	dashboard: DashboardStore,
};

export default createStore<Store>(store);
