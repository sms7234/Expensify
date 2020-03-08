import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {startLogout} from '../actions/auth';

export const Header = (props) => (
  <header>
    <h1>Expensify App</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>Home Page </NavLink>
    <NavLink to="/create" activeClassName="is-active" exact={true}>Create Page </NavLink>
    <NavLink to="/help" activeClassName="is-active" exact={true}>Help Page </NavLink>
    <button onClick={props.startLogout}>Logout</button>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined,mapDispatchToProps)(Header);
