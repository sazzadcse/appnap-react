import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateLogin(data) {
  let errors = {};

  if (validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
    isFormValid:isEmpty(errors)
  }
}