import React, {useState, useEffect } from 'react';
import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import './Header.css';
// import { getAccessToken } from '../../services/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Hamburger, profile, CostcoLogo } from '../../assets/images';
import { GlobalContext } from '../../context/GlobalContext';
import NotificationList from '../../modules/AppointmentNotifications/NotificationsList';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import pageInterface from '../../services/pageInterface';
const Header = () => {
	const services = pageInterface.init();
	const [selectedLanguage,changeSelectedLanguage]=useState('en');
	const { t , i18n} = useTranslation();
	const { accounts } = useMsal();
	const {state,dispatch} = React.useContext(GlobalContext);
	const changeLanguage = (e) => {
		
		let reqData=state?state.userdetails:null;
		reqData.language=e.target.value
		console.log("hi app")
		try {
			services.appPage.postUserDetails(reqData).then((data) => {
				console.log("hi header",data.data)
				dispatch({ type: 'UPDATE_USER_DETAILS', payload: { language: e.target.value } });
				sessionStorage.setItem('language',e.target.value)
		  });
		  } catch (error) {
		  
		  }
		i18n.changeLanguage(e.target.value);
		changeSelectedLanguage(e.target.value)
	  };
	 const details=[{value:"en",label:"en"},{value:"cf","label":"cf"}]
	return (
		<React.Fragment>
			<div class="headerBox">
				<div class="costcoHeader">
					{' '}
					<img src={CostcoLogo} alt="Costco Wholesale" />{' '}
				</div>
				<div class="headerRightContainer">
					<div class="notificationBox">
						<form class="form-inline my-2 my-lg-0 headerRightBox">
						
							<div class="notificationIcon  headerRightIconBox ">
								<FontAwesomeIcon icon={faSearch} />
							</div>
							
							<NotificationList /> {' '}
							
							<div class="notificationIcon headerRightIconBox">
								{' '}
								<FontAwesomeIcon icon={faCartPlus} />{' '}
							</div>
							
              {/* Language Selection in Header */}
							<select value={state?state.userdetails.language:null}  onChange={(e)=>changeLanguage(e)} className="languageContainer ">
								<option value="en" className="languageOptions">en</option>
								<option value="fr" className="languageOptions">fr</option>
							</select>
				
						</form>
					</div>
					<div class="profileBox">
						<AuthenticatedTemplate>
							<div class=" profileText ">{accounts[0]?.name}</div>
						</AuthenticatedTemplate>
						<div class="profilePic mr0">
							<span>
								{' '}
								<img src={profile} alt="" height="32" />
							</span>{' '}
						</div>
					</div>
				</div>
			</div>
			<div class="menuBox">
				<nav class="navbar navbar-expand-lg navbar-light headerNavBar col-4">
					<button className="hamburgerBtn" type="button">
						{' '}
						<span class="">
							<img src={Hamburger} alt="" />
						</span>{' '}
					</button>
					<div class="headerNav" id="">
						{' '}
						{t('translations:dashboard','DASHBOARD')}{' '}
					</div>
				</nav>
				<div class="warehouseTimeBox col-4">
					<div class="warehouseTitle">
						{state?.bayInfo?.name} <br />
						<span class="warehouseID"> {state?.bayInfo?.id}  </span>
					</div>
					{/* <div class="warehouseTimeLabel">
						{moment().format('ddd, D MMM').toLocaleUpperCase()}
						<br />
						<span class="warehouseTime">{moment().format('hh:mm a').toLocaleUpperCase()}</span>
					</div> */}
				</div>
			</div>
		</React.Fragment>
	);
};

export default Header;
