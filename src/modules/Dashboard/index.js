import React from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import './Dashboard.scss';
import AppointmentView from '../Layout/AppointmentView';

const Dashboard = () => {
	const { state } = React.useContext(GlobalContext);
	return (
		<React.Fragment>
			<div className="appointmentDashboard">
				<div className="outerWrapper container-fluid">
					<AppointmentView />
				</div>
			</div>
		</React.Fragment>
	);
};
export default Dashboard;
