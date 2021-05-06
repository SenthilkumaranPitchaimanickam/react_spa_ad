// import msalInstance from './authProvider';


// const getAccessToken = async (username) => {
//   const silentRequest = {
//     scopes: ['openid', 'profile', 'User.Read'],
//   };
//   const request = {
//     scopes: ['Mail.Read'],
//     loginHint: username, // For v1 endpoints, use upn from idToken claims
//   };
//   silentRequest.account = msalInstance.getAccountByUsername(username);
//   const token = await msalInstance.acquireTokenSilent(silentRequest).catch(async (error) => {
//     if (error instanceof InteractionRequiredAuthError) {
//       // fallback to interaction when silent call fails
//       return await msalInstance.acquireTokenPopup(request).catch((err) => {
//         // console.log('Error', err);
//       });
//     }
//   });
//   return token;
// };

// export default getAccessToken;