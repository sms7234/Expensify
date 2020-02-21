import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Expensify App</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>Home Page </NavLink>
    <NavLink to="/create" activeClassName="is-active" exact={true}>Create Page </NavLink>
    <NavLink to="/help" activeClassName="is-active" exact={true}>Help Page </NavLink>
  </header>
)

export default Header;
