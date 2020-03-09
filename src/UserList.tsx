import React, { FC, useEffect, useState } from 'react';
import { AuthResponse } from "msal";
import { Table } from 'reactstrap';
import config from './config';
import { getUsers } from './graph-service';
import userAgentApplication from "./auth-service";

type Props = {
  showError: (message: string, debug: string) => void
}

const UserList: FC<Props> = (props) => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const doGetUsers = async () => {
      try {
        const accessToken: AuthResponse = await userAgentApplication.acquireTokenSilent({
          scopes: config.scopes
        });
        const u = await getUsers(accessToken);
        setUsers(u.value);
      } catch (err) {
        props.showError('ERROR', JSON.stringify(err));
      }
    };
    doGetUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <Table>
        <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
        </tr>
        </thead>
        <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.displayName}</td>
            <td>{user.mail || user.userPrincipalName}</td>
          </tr>
        ))}
        </tbody>
      </Table>
    </div>
  );
};
export default UserList
