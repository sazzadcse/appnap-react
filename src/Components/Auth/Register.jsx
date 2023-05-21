import React, { Component } from 'react';
import { BASE_URL, AJAX_PUBLIC_REQUEST } from "../../Constants/AppConstants";
import distRegistration from '../../Validation/distRegistration';
import AlertWrapper from '../Common/AlertWrapper';
import AlertWrapperSuccess from '../Common/AlertWrapperSuccess';

export class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      name : '',
      email : '',
      password : '',
      confirm_password : '',
      phone : '',
      data: [],

      errors: {},
      isValid: false,
      isLoading: false,
      isFormValid: true,
      server_message: '',
      success_alert_wrapper_show: false,

    }

    document.title = "Registration | Product Managment";
    
  }

  // define submit handaler
  onSubmit = (e) => {
    e.preventDefault();
    const val_return = distRegistration(this.state);
    this.setState(val_return);
    if (val_return.isValid) {

        let data = new FormData();
        data.append('name', this.state.name);
        data.append('email', this.state.email);
        data.append('password', this.state.password);
        data.append('confirm_password', this.state.confirm_password);
        data.append('phone', this.state.phone);

        this.setState({ errors: {}, isLoading: true });

        AJAX_PUBLIC_REQUEST("POST", "register", data).then(results => {

          if (parseInt(results.code) === 1000) {

              this.setState({
                  isLoading: false,
                  isFormValid: true,
                  server_message: results.message,
                  success_alert_wrapper_show: true,
                  name: '',
                  email: '',
                  password: '',
                  confirm_password: '',
                  phone: '',
              });

          } else {
              this.setState({
                  server_message: results.message,
                  isLoading: false,
                  isFormValid: false,
                  success_alert_wrapper_show: false,
              });

          }
      });

    }
  }

  render() {

    const { loading, message, errors, name, email, password, confirm_password, phone, server_message } = this.state;
    const errors_data = server_message;

    return (
      <>
        <div className="container">

          <div className="row">
            <div className="col-sm-6 offset-3 p-4">
              <h4 className="card-title mt-3 text-center">Create Account</h4>
              <p className="text-center">Get started with your free account</p>
            </div>
          
          </div>

          <div className="row">

            <div className="col-sm-6 offset-3">

            <AlertWrapper errors_data={errors_data} isFormValid={this.state.isFormValid} />
            <AlertWrapperSuccess errors_data={errors_data} success_alert_wrapper_show={this.state.success_alert_wrapper_show} />

              <form onSubmit={this.onSubmit} method="post">

                <div className="form-outline mb-4">
                <label className="form-label" for="name">Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    className="form-control" 
                    value={name}
                    onChange={ (e) => this.setState({ name:e.target.value }) }
                    />
                </div>

                <div className="form-outline mb-4">
                <label className="form-label" for="email">Email address</label>
                  <input 
                      type="email" 
                      name="email" 
                      id="email" 
                      className="form-control" 
                      value={email}
                      onChange={ (e) => this.setState( { email : e.target.value } ) }
                      />
                </div>

                <div className="form-outline mb-4">
                <label className="form-label" for="password">Password</label>
                  <input 
                      type="password" 
                      name="password" 
                      id="password" 
                      className="form-control" 
                      value={password}
                      onChange={ (e) => this.setState( { password : e.target.value } ) }
                      />
                </div>
                
                <div className="form-outline mb-4">
                <label className="form-label" for="confirm_password">Confirm Password</label>
                  <input 
                      type="password" 
                      name="confirm_password" 
                      id="confirm_password" 
                      className="form-control" 
                      value={confirm_password}
                      onChange={ (e) => this.setState( { confirm_password : e.target.value } ) }
                      />
                </div>
                
                <div className="form-outline mb-4">
                <label className="form-label" for="phone">Phone</label>
                  <input 
                    type="text" 
                    name="phone" 
                    id="phone" 
                    className="form-control" 
                    value={phone}
                    onChange={ (e) => this.setState( { phone : e.target.value } ) }
                    />
                </div>

                <button 
                    disabled={this.state.isLoading}
                    type="submit" className="btn btn-primary btn-block mb-4">{this.state.isLoading ? 'Please Wait...' : 'Register'}</button>

              </form>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Register;