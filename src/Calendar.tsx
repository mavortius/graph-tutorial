import React, { FC, useEffect, useState } from 'react';
import { AuthResponse } from "msal";
import { Table } from 'reactstrap';
import moment from 'moment';
import config from './config';
import { getEvents } from './graph-service';
import userAgentApplication from "./auth-service";

function formatDateTime(dateTime: any) {
  return moment.utc(dateTime).local().format('M/D/YY h:mm A');
}

type Props = {
  showError: (message: string, debug: string) => void
}

const Calendar: FC<Props> = (props) => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const doGetEvents = async () => {
      try {
        const accessToken: AuthResponse = await userAgentApplication.acquireTokenSilent({
          scopes: config.scopes
        });
        const e = await getEvents(accessToken);
        setEvents(e.value);
      } catch (err) {
        props.showError('ERROR', JSON.stringify(err));
      }
    };
    doGetEvents();
  }, []);

  return (
    <div>
      <h1>Calendar</h1>
      <Table>
        <thead>
        <tr>
          <th scope="col">Organizer</th>
          <th scope="col">Subject</th>
          <th scope="col">Start</th>
          <th scope="col">End</th>
        </tr>
        </thead>
        <tbody>
        {events.map((event) => (
          <tr key={event.id}>
            <td>{event.organizer.emailAddress.name}</td>
            <td>{event.subject}</td>
            <td>{formatDateTime(event.start.dateTime)}</td>
            <td>{formatDateTime(event.end.dateTime)}</td>
          </tr>
        ))}
        </tbody>
      </Table>
    </div>
  );
};
export default Calendar
