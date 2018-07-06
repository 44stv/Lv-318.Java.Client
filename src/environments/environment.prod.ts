export const environment = {
  production: false,

  // serverURL: 'http://localhost:8080',
  serverURL: 'http://ec2-18-184-79-174.eu-central-1.compute.amazonaws.com',

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
