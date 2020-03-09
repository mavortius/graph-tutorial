export default {
  appId: process.env.REACT_APP_CLIENT_ID || '',
  authority: `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}/`,
  validateAuthority: false,
  redirectUri: 'http://localhost:3000',
  scopes: [
    'user.read',
    'calendars.read'
  ]
};
