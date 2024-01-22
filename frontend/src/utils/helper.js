/**
 *  function for user name validation
 */
export function validateName(name) {
  const nameRegex = /^([a-zA-Z]{4,15}[0-9]{0,10})$/;
  return nameRegex.test(name);
}

/**
 * function for user email validation
 */
export function validateEmail(email) {
  const emailRegex =
    /^(([a-zA-Z]{1,10}[a-zA-Z!@#$%^&*()_=+_0-9]{2,20}))@([a-zA-Z]{2,7}).([a-zA-Z]{2,3})$/;
  return emailRegex.test(email);
}

/**
 *  function for user password validation
 */
export function validatePassword(password) {
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  return passwordRegex.test(password);
}

/**
 * function for user mobile number validation
 */
export function validateMobile(mobile) {
  const mobileRegex = /^([+]\d{2}[ ])?\d{10}$/;
  return mobileRegex.test(mobile);
}

/**
 * function for user register data validations
 */
export function userRegisterDataValidation(formData) {
  let newError = {};
  const { name, email, password, mobile } = formData;

  if (!name) {
    newError.name = "Enter your Name.";
  } else if (!validateName(name)) {
    newError.name =
      "Name should not be less than 4 characters, special characters and extra spaces are not allowed.";
  }

  if (!email) {
    newError.email = "Enter your email.";
  } else if (!validateEmail(email)) {
    newError.email = "Enter valid email.";
  }
  if (!password) {
    newError.password = "Enter your Password.";
  } else if (!validatePassword(formData.password)) {
    newError.password =
      "Password should not be less than 8 characters with atleast 1 Uppercase , 1 Lowercase, 1 number and 1 special character.";
  }

  if (!mobile) {
    newError.mobile = "Enter your Mobile Number.";
  } else if (!validateMobile(mobile)) {
    newError.mobile =
      "Mobile number should not be less than 10 number characters with country code(+91).";
  }

  return newError;
}

/**
 *  function  for user login data validation
 */
export function userLoginDataValidation(formData) {
  const { email, password } = formData;
  const newError = {};

  if (!email) {
    newError.email = "Enter your email.";
  } else if (!validateEmail(email)) {
    newError.email = "Enter valid email.";
  }

  if (!password) {
    newError.password = "Enter your Password.";
  } else if (!validatePassword(password)) {
    newError.password =
      "Password should not be less than 8 characters with atleast 1 Uppercase , 1 Lowercase, 1 number and 1 special character.";
  }

  return newError;
}
