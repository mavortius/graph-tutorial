import { UserAgentApplication } from "msal";
import config from "./config";

const userAgentApplication = new UserAgentApplication({
  auth: {
    authority: config.authority,
    validateAuthority: config.validateAuthority,
    clientId: config.appId,
    redirectUri: config.redirectUri
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true
  }
});
export default userAgentApplication;
