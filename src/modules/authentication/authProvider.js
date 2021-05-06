import { PublicClientApplication } from "@azure/msal-browser";
// import constants from './constants';

var Config = require("Config");

//Msal Instance that will be used to Login, get account details and get access token

const msalConfig = {
  auth: {
    clientId: Config.msal.clientId,
    authority: `https://login.microsoftonline.com/${Config.msal.tenantId}/`,
    redirectUri: Config.msal.redirectUrls.path,
  },
}

const authProvider = new PublicClientApplication(msalConfig);

export default authProvider;
