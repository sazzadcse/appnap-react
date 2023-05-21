import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function distValidateSignup(data) {
  let errors = {};

  if (validator.isEmpty(data.name)) {
    errors.name = 'This field is required';
  }
  if (validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  if (!validator.isEmail(data.email)) {
    errors.username = 'This should be an email address';
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (validator.isEmpty(data.confirm_password)) {
    errors.confirm_password = 'This field is required';
  }
  if (data.password != data.confirm_password) {
    errors.confirm_password = 'Confirm password not match';
  }

  if (validator.isEmpty(data.phone)) {
    errors.phone = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
    isFormValid: isEmpty(errors)
  }
}