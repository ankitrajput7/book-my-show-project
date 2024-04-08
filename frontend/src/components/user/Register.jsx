import { useState } from "react";
import { userRegisterDataValidation } from "../../utils/helper";
import { useLoginContext } from "../../utils/context/LoginContext";
import { registerUserApi } from "../../utils/axios";
import InputBox from "./InputBox";

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

  /**
   *  function to handle input values
   */
  const handleInputData = (e) => {
    e.stopPropagation();

    setError(initialState);
    setformData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  /**
   * function to handle submit button of form
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationResults = userRegisterDataValidation(formData);

    if (Object.keys(validationResults)[0] !== "formData") {
      setError(validationResults);
    } else {
      registerUserApi({ ...validationResults.formData, loginType })
        .then((result) => {
          // console.log(result);
          alert(result.message);
          openLogin();
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  /**
   * toggle show password state
   */
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <>
      <div className="w-full h-[100vh] fixed top-0 left-0 right-0 bottom-0 bg-black/30"></div>

      <div className="flex flex-col w-[450px] m-auto rounded mt-6 fixed top-10 left-1/3 bg-white">
        <button
          className="text-red-500 text-md font-semibold self-end mr-1"
          onClick={closeLoginRegister}
        >
          X
        </button>
        <div className=" mb-4 text-xl font-medium text-center">Register</div>

        <form onSubmit={handleSubmit} className="flex flex-col mx-10">
          <InputBox
            error={error}
            handleInputData={handleInputData}
            value={formData.name}
            fieldName="name"
            name="Name"
          ></InputBox>

          <InputBox
            error={error}
            handleInputData={handleInputData}
            value={formData.email}
            fieldName={"email"}
            name={"Email"}
          ></InputBox>

          <InputBox
            error={error}
            handleInputData={handleInputData}
            value={formData.password}
            fieldName={"password"}
            name={"Password"}
            type={showPassword ? "password" : "text"}
            autoComplete={"new-password"}
            toggleShowPassword={toggleShowPassword}
            showPassword={showPassword}
          ></InputBox>

          <InputBox
            error={error}
            handleInputData={handleInputData}
            value={formData.mobile}
            fieldName={"mobile"}
            name={"Mobile Number"}
          ></InputBox>

          <input
            className="mt-6 mb-2 bg-blue-900 text-sm text-white p-2 cursor-pointer"
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
