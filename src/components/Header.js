import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {startLogout} from '../actions/auth';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export const Header = (props) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Navbar bg="none" expand="sm" variant="dark">
          <Navbar.Brand>
            <Link to="/dashboard" className="header__item--brand">Expensify</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="ml-auto">
              <Link to="/dashboard" className="header__item">
                Dashboard
              </Link>
              <Link to="/create" className="header__item">
                Add Expense
              </Link>
              <Link className="header__item">
                Categories
              </Link>
              <button className="header__item--button" onClick={props.startLogout}>
                Logout
              </button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined,mapDispatchToProps)(Header);

{/* <Link className="header__title" to="/dashboard">
    <h1>Expensify</h1>
</Link> */}
{/* <button className="button--link" onClick={props.startLogout}>Logout</button> */}
