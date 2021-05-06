export const REDUCER = (state, action) => {
	const { payload } = action;
	switch (action.type) {
		case 'UPDATE': {
			return {
				...state,
				...payload
			};
		}
		case 'UPDATE_APPOINTMENTS': {
			const {appointments} = payload;
			const appointmentIndices = appointments?.map(({id})=>id);
			return {
				...state,
				...payload, appointmentIndices
			};
		}
		case 'UPDATE_APPOINTMENT': {
			const {appointment} = payload;
			const {id} = appointment
			const indexOfItem = state.appointmentIndices.indexOf(id);
			let newAppointments = [ ...state?.appointments ];
			newAppointments[indexOfItem]= appointment;

			return {
				...state,
				appointments: newAppointments
			};
		}
		case 'ADD_APPOINTMENT': {
			const { appointment } = payload;
			let { appointments, appointmentIndices } = state;
			let newAppointments = [ ...appointments, appointment ];
			let newAppointmentsIndices = [ ...appointmentIndices, appointment?.id ];
			return {
				...state,
				appointments: newAppointments,
				appointmentIndices:newAppointmentsIndices
			};
		}

		case 'DELETE_APPOINTMENT': {
			const { appointmentId } = payload;
			const indexOfItem = state.appointmentIndices.indexOf(appointmentId);
			let newAppointments = state?.appointments
			newAppointments.splice(indexOfItem, 1) ;
			let newAppointmentsIndices =  state?.appointmentIndices;
			newAppointmentsIndices.splice(indexOfItem, 1) ;
			return {
				...state,
				appointments: newAppointments,
				appointmentIndices:newAppointmentsIndices
			};
		}

		case 'CANCEL_APPOINTMENT': {
			const {appointment} = payload;
			const {id ,status,isCancelled,cancellationReason} = appointment;
			const indexOfItem = state.appointmentIndices.indexOf(id);
			let newAppointments = [ ...state?.appointments ];
			newAppointments[indexOfItem].status = status;
			newAppointments[indexOfItem].isCancelled = isCancelled;
			newAppointments[indexOfItem].cancellationReason = cancellationReason;
			return {
				...state,
				 appointments: newAppointments
			};
		}

		case 'USER_DETAILS': {
			console.log("userdetails",payload.userdetails)
			const userdetails = payload.userdetails;
			return {
				...state,
				userdetails: userdetails,
				
			};
		}
		case 'UPDATE_USER_DETAILS': {
			console.log("update userdetails",payload.language)
			const language = payload.language;
			const userdetails=state.userdetails;
			userdetails.language=language;
			return {
				...state,
				userdetails: userdetails,
				
			};
		}
		default:
			return state;
	}
};
