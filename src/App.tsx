import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import { AuthResponse } from 'msal';
import NavBar from './NavBar';
import ErrorMessage from './ErrorMessage';
import Welcome from './Welcome';
import config from "./config";
import { getUserDetails } from "./graph-service";
import userAgentApplication from "./auth-service";
import 'bootstrap/dist/css/bootstrap.css';
import Calendar from "./Calendar";
import UserList from "./UserList";

export interface IError {
  debug?: any;
  message: string;
}

export interface IAuth {
  isAuthenticated?: boolean,
  user: any,
  authButtonMethod?: (event: React.MouseEvent<any>) => void
}

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState<IError | null>(null);

  useEffect(() => {
    const account = userAgentApplication.getAccount();
    setIsAuthenticated(account != null);

    if (account) {
      getUserProfile();
    }
  }, []);

  let err = null;

  if (error) {
    err = <ErrorMessage debug={error.message} message={error.debug}/>
  }

  const login = async () => {
    try {
      await userAgentApplication.loginPopup({
        scopes: config.scopes,
        prompt: 'select_account'
      });
      await getUserProfile();
    } catch (err) {
      let error: IError;

      if (typeof (err) === "string") {
        const errParts = err.split('|');
        error = errParts.length > 1 ?
          { message: errParts[1], debug: errParts[0] } :
          { message: err };
      } else {
        error = {
          message: err.message,
          debug: JSON.stringify(err)
        };
      }

      setIsAuthenticated(false);
      setUser({});
      setError(error);
    }
  };

  const logout = () => {
    userAgentApplication.logout();
  };

  const getUserProfile = async () => {
    try {
      const accessToken: AuthResponse = await userAgentApplication.acquireTokenSilent({
        scopes: config.scopes
      });

      if (accessToken) {
        const userDetails = await getUserDetails(accessToken);
        setUser({
          displayName: userDetails.displayName,
          email: userDetails.email || userDetails.userPrincipalName
        });
        setIsAuthenticated(true);
        setError(null);
      }
    } catch (err) {
      setIsAuthenticated(false);
      setUser({});

      if (typeof (err) === 'string') {
        const errParts = err.split('|');
        setError(errParts.length > 1 ? { message: errParts[1], debug: errParts[0] } : { message: err });
      } else {
        setError({ message: err.message, debug: JSON.stringify(err) });
      }
    }
  };

  const setErrorMessage = (message: string, debug: string) => {
    setError({message: message, debug: debug});
  };

  return (
    <Router>
      <div>
        <NavBar isAuthenticated={isAuthenticated} user={user} authButtonMethod={isAuthenticated ? logout : login}/>
        <Container>
          {err}
          <Route exact path="/" render={(props) =>
            <Welcome isAuthenticated={isAuthenticated} user={user} authButtonMethod={login}/>
          }/>
          <Route exact path="/calendar" render={(props) =>
            <Calendar {...props} showError={setErrorMessage}/>
          }/>
          <Route exact path="/users" render={(props) =>
            <UserList {...props} showError={setErrorMessage}/>
          }/>
        </Container>
      </div>
    </Router>
  );
};

export default App;
