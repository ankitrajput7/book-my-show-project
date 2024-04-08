/**
 *  function for user name validation
 */
export function validateName(name) {
  const nameRegex = /^([a-zA-Z][A-Za-z0-9]{0,15})$/;
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

  // before validations we are removing last spaces of user data for better results
  for (let keys in formData) {
    if (formData[keys][formData[keys].length - 1] === " ") {
      formData[keys] = formData[keys].trimEnd();
    }
  }
  const { name, email, password, mobile } = formData;

  if (!name) {
    newError.name = "Enter your Name.";
  } else if (!validateName(name)) {
    newError.name =
      "Atleast 4 characters first two characters are alphabet with following only alphabets and numbers.";
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
      "Atleast 8 characters with 1Uppercase, 1Lowercase, 1number and 1special character in last space is not allowed.";
  }

  if (!mobile) {
    newError.mobile = "Enter your Mobile Number.";
  } else if (!validateMobile(mobile)) {
    newError.mobile = "Atleast 10 number.";
  }

  if (Object.keys(newError).length > 0) {
    return newError;
  } else {
    return { formData };
  }
}

/**
 *  function  for user login data validation
 */
export function userLoginDataValidation(formData) {
  for (let key in formData) {
    if (formData[key][formData[key].length - 1] === " ") {
      formData[key] = formData[key].trimEnd();
    }
  }

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
      "Atleast 8 characters with 1Uppercase, 1Lowercase, 1number and 1special character in last space is not allowed.";
  }

  if (Object.keys(newError).length > 0) {
    return newError;
  } else {
    return { formData };
  }
}

/**
 * function to convert minutes to hours
 */
export const convertMinToHourmin = (min) => {
  if (min < 60) {
    return `0h ${min}m`;
  } else {
    let hour = Math.floor(min / 60);
    let remainingMin = min % 60;

    return `${hour}h ${remainingMin}m`;
  }
};