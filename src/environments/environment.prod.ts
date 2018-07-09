export const environment = {
  production: true,

  //serverURL: 'https://localhost:8080',
   serverURL: 'https://uatransport.tk',

  accessTokenHeader: 'Authorization',
  refreshTokenHeader: 'Refresh-token',

  auth: {
    clientID: 'fMvXBLfJoy8yuoUoTGnTa8kI-3gEePfQ',
    domain: 'uatransport.eu.auth0.com',
    audience: 'http://localhost:4200',
    redirect: 'http://localhost:4200/callback',
    scope: 'openid profile email'
  }
};
