import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { MsalProvider } from '@azure/msal-react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import msalInstance from './modules/authentication/authProvider';
import { ThemeProvider, GlobalStyles, theme } from './style';
import { GlobalContextProvider } from './context/GlobalContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import  "./i18n";


ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme.main}>
			<GlobalStyles />
			<GlobalContextProvider>
				<MsalProvider instance={msalInstance}>
					<Suspense fallback={null}>
						<App />
					</Suspense>
				</MsalProvider>
			</GlobalContextProvider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
