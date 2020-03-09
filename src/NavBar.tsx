import React, { FC, useState } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import {
  Collapse,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from 'reactstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import { IAuth } from "./App";

const UserAvatar: FC<IAuth> = (props) => {
  if (props.user.avatar) {
    return <img src={props.user.avatar} alt="user" className="rounded-circle align-self-center mr-2"
                style={{ width: "32px" }}/>;
  }

  return <i className="far fa-user-circle fa-lg rounded-circle align-self-center mr-2" style={{ width: "32px" }}/>;
};

const AuthNavItem: FC<IAuth> = (props) => {
  if (props.isAuthenticated) {
    return (
      <UncontrolledDropdown>
        <DropdownToggle nav caret>
          <UserAvatar user={props.user}/>
        </DropdownToggle>
        <DropdownMenu right>
          <h5 className="dropdown-item-text mb-0">{props.user.displayName}</h5>
          <p className="dropdown-item-text text-muted mb-0">{props.user.email}</p>
          <DropdownItem divider/>
          <DropdownItem onClick={props.authButtonMethod}>Sign Out</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  return (
    <NavItem>
      <NavLink onClick={props.authButtonMethod}>Sign In</NavLink>
    </NavItem>
  );
};

const NavBar: FC<IAuth> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  let calendarLink = null;
  let userListLink = null;

  if (props.isAuthenticated) {
    calendarLink = (
      <NavItem>
        <RouterNavLink to="/calendar" className="nav-link" exact>Calendar</RouterNavLink>
      </NavItem>
    );
    userListLink = (
      <NavItem>
        <RouterNavLink to="/users" className="nav-link" exact>Users</RouterNavLink>
      </NavItem>
    );
  }

  return (
    <div>
      <Navbar color="dark" expand="md" fixed="top">
        <Container>
          <NavbarBrand href="/">React Graph Tutorial</NavbarBrand>
          <NavbarToggler onClick={toggle}/>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <RouterNavLink to="/" className="nav-link" exact>Home</RouterNavLink>
              </NavItem>
              {calendarLink}
              {userListLink}
            </Nav>
            <Nav className="justify-content-end" navbar>
              <NavItem>
                <NavLink href="https://edeveloper.microsoft.com/graph/docs/concepts/overview" target="_blank">
                  <i className="fas fa-external-link-alt mr-1"/>
                  Docs
                </NavLink>
              </NavItem>
              <AuthNavItem isAuthenticated={props.isAuthenticated} user={props.user}
                           authButtonMethod={props.authButtonMethod}/>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
export default NavBar
