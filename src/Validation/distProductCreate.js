import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function distValidateSignup(data) {
  let errors = {};

  if (validator.isEmpty(data.name)) {
    errors.name = 'This field is required';
  }
  if (validator.isEmpty(data.price)) {
    errors.price = 'This should be an email address';
  }
  if (validator.isEmpty(data.category)) {
    errors.category = 'This field is required';
  }
  // if (validator.isEmpty(data.image)) {
  //   errors.image = 'This field is required';
  // }


  return {
    errors,
    isValid: isEmpty(errors),
    isFormValid: isEmpty(errors)
  }
}