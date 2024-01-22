import { useState } from "react";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateMobile,
} from "../../utils/helper";
import { useLoginContext } from "../../utils/context/LoginContext";
import { loginUserApi, registerUserApi } from "../../utils/axios";

let initialState = {
  name: "",
  email: "",
  password: "",
  mobile: "",
};

function Register({ loginType }) {
  const [formData, setformData] = useState(initialState);
  const [error, setError] = useState(initialState);
  const [showPassword, setShowPassword] = useState(true);
  const { openLogin, closeLoginRegister } = useLoginContext();

  const handleFormData = (e) => {
    e.stopPropagation();

    setError(initialState);
    setformData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, mobile } = formData;
    const newError = {};

    if (!name) newError.name = "Enter your Name.";
    else if (!validateName(name))
      newError.name =
        "Name should not be less than 4 characters, special characters and extra spaces are not allowed.";

    if (!email) newError.email = "Enter your email.";
    else if (!validateEmail(email)) newError.email = "Enter valid email.";

    if (!password) newError.password = "Enter your Password.";
    else if (!validatePassword(formData.password))
      newError.password =
        "Password should not be less than 8 characters with atleast 1 Uppercase , 1 Lowercase, 1 number and 1 special character.";

    if (!mobile) newError.mobile = "Enter your Mobile Number.";
    else if (!validateMobile(mobile))
      newError.mobile =
        "Mobile number should not be less than 10 number characters with country code(+91).";

    setError(newError);

    if (Object.keys(newError).length === 0) {
      registerUserApi({ ...formData, loginType })
        .then((result) => {
          console.log(result);
          alert(result.message);
          openLogin();
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      console.log(newError);
    }
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const renderInput = (value, fieldName, name, type = "text", autoComplete = "on") => (
    <section>
      <label htmlFor={`${fieldName}Input`} className="flex flex-col">
        {fieldName === "password" ? (
          <div className="flex justify-between">
            <h2>{name}</h2>
            <button
              className="self-end text-xs text-green-500 "
              type="button"
              onClick={toggleShowPassword}
            >
              {showPassword ? "show" : "hide"}
            </button>
          </div>
        ) : (
          name
        )}

        <input
          id={`${fieldName}Input`}
          className="border-[1px] border-black outline-none p-1"
          type={type}
          name={fieldName}
          value={value}
          onChange={handleFormData}

          autoComplete={autoComplete}
        />
      </label>

      <div
        className={`text-red-500 text-xs mb-2`}
      >
        {error[fieldName]}
      </div>
    </section>
  );

  return (
    <>
      <div className="w-full h-[100vh] fixed top-0 left-0 right-0 bottom-0 bg-black/30"></div>

      <div className="flex flex-col w-96 m-auto rounded-sm mt-6 fixed top-10 left-1/3 bg-white">
        <button
          className="text-red-500 text-sm self-end mr-1"
          onClick={closeLoginRegister}
        >
          close
        </button>
        <div className=" mt-4 text-xl text-center">Register</div>

        <form onSubmit={handleSubmit} className="flex flex-col mx-8">
          {renderInput(formData.name, "name", "Name")}
          {renderInput(formData.email, "email", "Email")}
          {renderInput(
            formData.password,
            "password",
            "Password",
            showPassword ? "password" : "text",
            "new-password"
          )}
          {renderInput(formData.mobile, "mobile", "Mobile Number")}

          <input
            className="mt-6 mb-2 bg-green-500 text-white p-1 cursor-pointer"
            type="Submit"
            value="Register"
          />
        </form>

        <button className="text-red-500 text-xs mb-16" onClick={openLogin}>
          already registered@ login
        </button>
      </div>
    </>
  );
}

export default Register;
