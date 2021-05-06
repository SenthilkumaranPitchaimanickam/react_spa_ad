import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import moment from 'moment'
import TimeSlot from '../../components/TimeSlot';
import { StyledCard, StyledCardBody, StyledAccordion } from './styles';
import {GlobalContext} from '../../context/GlobalContext'

export default function AppointmentSchedule({ bays, appointments, intervals }) {
	const {state} = React.useContext(GlobalContext);

	const checkAvailability=(params)=>{

	}
	return (
		<React.Fragment>
			<StyledAccordion defaultActiveKey="0">
				{bays.map((bay, index) => {
					const appointmentsInBay = appointments?.filter(({bayId})=>bayId===bay?.bayId).filter((appointment)=>moment(appointment.start).format('YYYY-MM-DD')===moment(state?.date).format('YYYY-MM-DD'))
					return (
						<StyledCard>
							<Accordion.Toggle as={Card.Header} className="row pl-5" eventKey={bay?.bayId}>
								{bay.bayName}
							</Accordion.Toggle>
							<Accordion.Collapse eventKey={bay?.bayId}>
								<StyledCardBody>
									<TimeSlot date={state?.date} onClick = {(params)=>checkAvailability(params)} bay={bay} appointmentsInBay={appointmentsInBay} intervals={intervals} slots={[ 15, 30, 45 ]} />
								</StyledCardBody>
							</Accordion.Collapse>
						</StyledCard>
					);
				})}
			</StyledAccordion>
		</React.Fragment>
	);
}
