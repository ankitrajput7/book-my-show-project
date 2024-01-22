export function validateName(name) {
  const nameRegex = /^([a-zA-Z]{4,15}[0-9]{0,10})$/;
  return nameRegex.test(name);
}

export function validateEmail(email) {
  const emailRegex = /^(([a-zA-Z]{1,10}[a-zA-Z!@#$%^&*()_=+_0-9]{2,20}))@([a-zA-Z]{2,7}).([a-zA-Z]{2,3})$/;
  return emailRegex.test(email);
}

export function validatePassword(password) {
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  return passwordRegex.test(password);
}

export function validateMobile(mobile) {
  const mobileRegex = /^([+]\d{2}[ ])?\d{10}$/;
  return mobileRegex.test(mobile);
}
