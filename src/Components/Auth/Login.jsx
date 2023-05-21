import React, { Component } from 'react'
import PropTypes from "prop-types";
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import history from '../../history';
import { logout } from '../../Store/actions/loginActions';
import { userLoginRequest } from '../../Store/actions/loginActions';
import validateLogin from '../../Validation/Login';
import AlertWrapper from '../Common/AlertWrapper';
import AlertWrapperSuccess from '../Common/AlertWrapperSuccess';

import { BASE_URL, AJAX_PUBLIC_REQUEST, REMOVE_STORAGE, GET_STORAGE, USER, GET_COOKIE, } from "../../Constants/AppConstants";

export class Login extends Component {

  constructor(props) {
    super(props);

    let settings = '';
        if(GET_STORAGE('settings')) {
            settings = JSON.parse(GET_STORAGE('settings'));
        } 

    this.state = {
      privacy_policy: settings? (settings.internal_pages?settings.internal_pages.privacy_policy:"/") : "/",
      loading: true,
      email : '',
      password : '',
      data: [],

      errors: {},
      isValid: false,
      isLoading: false,
      isFormValid: true,
      server_message: '',
      success_alert_wrapper_show: false,

    }

    document.title = "Login | Product Managment";

  }

  onSubmit = (e) => {
      e.preventDefault();
      const val_return = validateLogin(this.state);
      this.setState(val_return);
      if(val_return.isValid){

        this.setState({errors: {}, isLoading: true});

        let data = new FormData();
        data.append('email', this.state.email);
        data.append('password', this.state.password);

        this.props.userLoginRequest(data).then(results => {
            if( results.code === 1000 ) {
                if( results.hasOwnProperty('login') && results.login == true ){
                    history.push('/my-account');
                } else {
                    this.props.logout();
                    REMOVE_STORAGE(USER);
                    this.setState({
                        server_message: "Unauthorized Access",
                        isLoading:false,
                        isFormValid:false
                    });
                }
            } else {
                this.setState({
                    server_message: results.message,
                    isLoading:false,
                    isFormValid:false
                });                    
            }            
        });

      }

  }
  

  render() {

    const {email, password, loading, isLoading, server_message} = this.state;
    const errors_data = server_message;
    
    if(this.props.isAuthenticated){
      history.push('/');
    }

    return (
      <>

        <div className="container">
          <div className="row">

            <div className="col-sm-6 offset-3 p-4">

              <form onSubmit={this.onSubmit} method="post">

                <AlertWrapper errors_data={errors_data} isFormValid={this.state.isFormValid}/>

                <div class="form-outline mb-4">
                <label class="form-label" for="email">Email address</label>
                  <input 
                    type="email" 
                    name="email"
                    id="email" 
                    class="form-control" 
                    value={email}
                    onChange={ (e) => this.setState( { email: e.target.value } ) }
                  
                  />
                  
                </div>


                <div class="form-outline mb-4">
                <label class="form-label" for="password">Password</label>
                  <input 
                      type="password" 
                      id="password" 
                      name="password"
                      class="form-control" 
                      value={password}
                      onChange={ (e) => this.setState( { password: e.target.value } ) }
                  />
                  
                </div>

                <button 
                  disabled={this.state.isLoading}
                  type="submit" 
                  class="btn btn-primary btn-block mb-4">{this.state.isLoading ? 'Please Wait...' : 'Sign in'}</button>

                <div class="text-center">
                  <p>Not a member? <NavLink to="/register" exact>Register</NavLink></p>
                </div>
              </form>

            </div>
          </div>
        </div>

      </>
    )
  }
}

Login.propTypes = {
  userLoginRequest:PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  logout:PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return{
      isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps, { userLoginRequest, logout })(Login);