import React from 'react';
import { useMsal, useMsalAuthentication, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';
import pageInterface from './services/pageInterface';
import { dataHandler } from './utils';
import { GlobalContext } from './context/GlobalContext';
import { HashRouter as Router } from 'react-router-dom';
import Routes from './routes/index';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import './App.css';
import { useTranslation } from 'react-i18next';

function App() {
	const { t, i18n } = useTranslation();
	const { accounts } = useMsal();
	const request = {
		scopes: [ "openid", "profile", "offline_access", "api://c0cc9690-695d-4dfb-9495-a9f86c0a1052/User.Read"]
	};
	// Hook used for Authentication
	const { login, result, error } = useMsalAuthentication(InteractionType.Redirect, request);
	// Hook used to get account details once logged in
	if (login && result) console.log('Result: ', result);
	else if (error) console.log('Error while logging in: ', error);

	const services = pageInterface.init();
	const { dispatch } = React.useContext(GlobalContext);
	console.log("Accounts in app page", accounts[0]);
	sessionStorage.setItem('language', 'en');
	React.useEffect(() => {
		if (accounts[0]) {
			let id = accounts[0]?.username;
			console.log("hi data")
			try {
				services.appPage.fetchUserDetails(id).then((data) => {
					dispatch({ type: 'USER_DETAILS', payload: { userdetails: data.data } });
					if (data.data.language === 'en-US') {
						sessionStorage.setItem('language', 'en')
					}
					else {
						sessionStorage.setItem('language', data.data.language)
					}
				});
			} catch (error) {
			}
		}
	}, []);

	return (
		<div className="App">
			<Router>
				<AuthenticatedTemplate>
					<Header />
					<Routes />
					<Footer />
				</AuthenticatedTemplate>
			</Router>
			<UnauthenticatedTemplate>Login to Authenticate</UnauthenticatedTemplate>
		</div>
	);
}

export default App;
