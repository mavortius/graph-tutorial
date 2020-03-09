import { AuthResponse } from "msal";
import * as graph from "@microsoft/microsoft-graph-client";

const getAuthenticatedClient = (accessToken: AuthResponse) => {
  return graph.Client.init({
    authProvider: (done) => {
      done(null, accessToken.accessToken);
    }
  });
};

export const getUserDetails = async (accessToken: AuthResponse) => {
  const client = getAuthenticatedClient(accessToken);
  return await client.api('/me').get();
};

export const getUsers = async (accessToken: AuthResponse) => {
  const client = getAuthenticatedClient(accessToken);
  return await client.api('/users').get();
};

export const getEvents = async (accessToken: AuthResponse) => {
  const client = getAuthenticatedClient(accessToken);
  return await client.api('/me/events')
    .select('subject,organizer,start,end')
    .orderby('createdDateTime DESC')
    .get();
};
