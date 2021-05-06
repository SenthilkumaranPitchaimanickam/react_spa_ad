import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink,
	useParams,
	useRouteMatch,
	useHistory
} from 'react-router-dom';
import './AppointmentView.css';
import { route_path } from '../../routes/constants';
import { useTranslation } from 'react-i18next';
const WaitingList = React.lazy(() => import('../WaitingList/index'));


const AppointmentView = () => {
	const { t } = useTranslation(['translations']);
	const history = useHistory();
	let { path, url } = useRouteMatch();
  const viewWaitingList = () =>{
    history.push({
      pathname: `${url}/waitinglist`,
	});
}
  
	return (
		<React.Fragment>
			<div className="buttonSection">
				
				<NavLink to={`${url}/waitingList`} type="button" onClick={viewWaitingList} className="btn pt-3 btn-Appointment">
				{t('translations:view_waiting_list','View Waiting List')}
				</NavLink>
			</div>
			<Switch>
        		<Route path={`${path}${route_path?.waitingList.index}`}>
					<WaitingList/>
				</Route>
			</Switch>
		</React.Fragment>
	);
};

export default AppointmentView;
