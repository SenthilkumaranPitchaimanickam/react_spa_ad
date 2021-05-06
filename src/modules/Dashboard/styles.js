import { css, styled } from '../../style';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { DatePickers } from 'costco-common-lib';
import { NavLink } from 'react-router-dom';

export const DashboardContainer = styled(Container)`
padding: 0 0 0 0;
margin: 2px 10px 0 0;
max-width: 1600px
`;

export const DashboardRow = styled(Row)`
padding: 0 0 0 0;
margin: 0 0 0 0;

`;
export const DashboardCol = styled(Col)`
padding: 0 0 0 0;
margin: 0 0 0 0;
flex: ${({ theme, span = 1 }) => span};
min-height:100vh;
`;

export const AppointmentContainer = styled(DashboardContainer)`
margin: 5px 5px 0 0;
padding: 10px 10px 10px 10px;
background-color:  ${({ theme }) => theme.colors.dashboard.appointment.container};
min-height:300px;
`;

export const DateHeader = styled(Row)`
font-size: 14px;
height:40px;
background-color:  ${({ theme }) => theme.colors.dashboard.primary};
margin:0px 5px 0px 5px;
border-radius:4px;
justify-content: center;
align-items: center;
color:  ${({ theme }) => theme.colors.primary.light};
`;

export const StyledCard = styled(Card)``;

export const StyledAccordion = styled(Accordion)`
.card-header {
    background-color:${({ theme }) => theme.colors.primary.light};
    color: ${({ theme }) => theme.colors.primary.base};
    margin: 0 0 0 -30px;
    box-shadow:  ${({ theme }) => `0 8px 7px -6px ${theme.colors.border.primary}`}; ;
}
`;

export const StyledCardBody = styled(StyledCard.Body)`
    padding:0;
`;

export const StyledAccordionToggle = styled(Accordion.Toggle)`
background-color: ${({ theme }) => theme.colors.primary.light};
`;

export const StyledDatePicker = styled(DatePickers)`
input{
}
`;

export const StyledNavHeader = styled(Row)`
`;

export const StyledNavLink = styled(NavLink)`
font-size:16px;
font-weight:600;
text-decoration:none;
color: ${({ theme }) => theme.colors.primary.base};
text-decoration-line: underline;
text-underline-offset: 5px;
`;
