import React from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { DashboardContainer } from './styles';
import AppointmentSchedule from './AppointmentSchedule';
export default function Appointments() {
	const { state } = React.useContext(GlobalContext);
	const { appointments, bays } = state;
	const workingHours = [ 7, 20 ];
	let intervals = [];
	for (let i = workingHours[0]; i < workingHours[1]; i++) {
		intervals.push({ startTime: i, endTime: i + 1 });
	}
	return (
		<DashboardContainer className="px-1">
			<AppointmentSchedule bays={bays} appointments={appointments} intervals={intervals} />
		</DashboardContainer>
	);
}
