import React, { Component, Fragment } from 'react';
import { NavLink, withRouter } from "react-router-dom";
import * as BT from 'react-bootstrap';

import PropTypes from "prop-types";
import $ from "jquery";
import { connect } from "react-redux";
import { logout } from '../../Store/actions/loginActions';

import { GET_STORAGE, USER, CUSTOMER_URL, AJAX_PUBLIC_REQUEST, DISTRIBUTOR_URL, AJAX_REQUEST } from "../../Constants/AppConstants";

export class Header extends Component {

  constructor(props) {
      super(props);
      this.state = {
          user: JSON.parse(GET_STORAGE(USER)),
      };

  }

  logout = (e) => {
    e.preventDefault();
    AJAX_REQUEST("POST", "logout", {}).then(results => {
        if (parseInt(results.code) === 1000) { } else {
            // console.log(results.response.message);
        }
    });
    this.props.logout();
}

  render() {

    const isLogin = this.props.auth;

    return (
      <>
        <BT.Navbar bg="dark" variant="dark">
          <BT.Container>
            <BT.Navbar.Brand>
              <NavLink
                activeClassName="active"
                className="menu_item"
                to="/"
                exact
              >
                <span>Product Managment</span>
              </NavLink>
            </BT.Navbar.Brand>

            <BT.Nav className="me-auto">
              <BT.Nav.Link>
                <NavLink
                  activeClassName="active"
                  className="menu_item"
                  to="/"
                  exact
                >
                  <span>Home</span>
                </NavLink>
              </BT.Nav.Link>
              <BT.Nav.Link>
                <NavLink
                  activeClassName="active"
                  className="menu_item"
                  to="/products"
                  exact
                >
                  <span>Products</span>
                </NavLink>
              </BT.Nav.Link>
              {
                isLogin.isAuthenticated ? 
                <BT.Nav.Link>
                <NavLink
                  activeClassName="active"
                  className="menu_item"
                  to="/my-account"
                  exact
                >
                  <span>My Account</span>
                </NavLink>
              </BT.Nav.Link> : ''
              }
              
              {
                !isLogin.isAuthenticated ? 
                <BT.Nav.Link>
                <NavLink
                  activeClassName="active"
                  className="menu_item"
                  to="/register"
                  exact
                >
                  <span>Register</span>
                </NavLink>
              </BT.Nav.Link> : ''
              }
              

              {
                  !isLogin.isAuthenticated ?
                  <BT.Nav.Link>
                <NavLink
                  activeClassName="active"
                  className="menu_item ml-50"
                  to="/login"
                  exact
                >
                  <span>Login</span>
                </NavLink>
              </BT.Nav.Link> : ''
              }
              

              {
                isLogin.isAuthenticated ? 
                <BT.Nav.Link>
                <a
                  onClick={this.logout}
                  activeClassName="active"
                  className="menu_item ml-50"
                  href="#"
                >
                  <span>Logout</span>
                </a>
              </BT.Nav.Link> : ''
              }
              

            </BT.Nav>

          </BT.Container>
        </BT.Navbar>
      </>
    )
  }
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
      auth: state.auth
  };
}

export default withRouter(
  connect(
      mapStateToProps,
      { logout }
  )(Header)
);