import DashboardModel from './dashboard/DashboardModel';
import GlobalModel from './global/GlobalStore';

export default interface Store {
	global: GlobalModel;
	dashboard: DashboardModel;
}
