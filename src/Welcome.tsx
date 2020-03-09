import React, { FC } from 'react';
import { Button, Jumbotron } from 'reactstrap';
import { IAuth } from "./App";

const WelcomeContent: FC<IAuth> = (props) => {
  if (props.isAuthenticated) {
    return (
      <div>
        <h4>Welcome {props.user.displayName}</h4>
        <p>Use the navigation bar at the top of the page to get started.</p>
      </div>
    );
  }

  return <Button color="primary" onClick={props.authButtonMethod}>Click here to sign in</Button>;
};

const Welcome: FC<IAuth> = (props) => (
  <Jumbotron>
    <h1>React Graph Tutorial</h1>
    <p className="lead">
      This sample app shows how to use the Microsoft Graph API to access Outlook and OneDrive data from React
    </p>
    <WelcomeContent authButtonMethod={props.authButtonMethod} isAuthenticated={props.isAuthenticated}
                    user={props.user}/>
  </Jumbotron>
);
export default Welcome
