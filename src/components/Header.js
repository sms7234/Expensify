import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {startLogout} from '../actions/auth';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import DropdownButton from 'react-bootstrap/DropdownButton';

export const Header = (props) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Navbar bg="none" expand="sm" variant="dark">
          <Navbar.Brand>
            <Link to="/expenses" className="header__item--brand">Expensify</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="ml-auto">
              <Link to="/expenses" className="header__item">
                Dashboard
              </Link>
              <Link to="/expenses" className="header__item">
                Expenses
              </Link>
              <Link to="/categories" className="header__item">
                Categories
              </Link>
              <DropdownButton title="Import" variant="link" className="dropdown--header">
                <div className="header__dropdown--area">
                  <Link to="/importCategories" className="header__dropdown--item">Categories</Link>
                </div>
                <div className="header__dropdown--area">
                  <Link to="/importExpenses" className="header__dropdown--item">Expenses</Link>
                </div>
              </DropdownButton>
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
