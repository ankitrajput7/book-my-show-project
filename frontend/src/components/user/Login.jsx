import { useState } from "react";
import { userLoginDataValidation } from "../../utils/helper";
import { useLoginContext } from "../../utils/context/LoginContext";
import { loginUserApi } from "../../utils/axios";
import { useDispatch } from "react-redux";
import { login, logout } from "../../utils/redux/loginSlice";
import { useLocalStorage } from "../../utils/hooks";
import InputBox from "./InputBox";

let initialState = {
  email: "",
  password: "",
};

function Login({ loginType }) {
  const dispatch = useDispatch();
  const { closeLoginRegister, openRegister } = useLoginContext();
  const [setToLocalStorage, removeFromLocalStorage] = useLocalStorage();
  const [formData, setformData] = useState(initialState);
  const [error, setError] = useState(initialState);
  const [showPassword, setShowPassword] = useState(true);

  /**
   *  function for handling user input
   */
  const handleInputData = (e) => {
    setError(initialState);
    setformData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   * function for handling user submit form
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const newError = userLoginDataValidation(formData);
    setError(newError);

    if (Object.keys(newError).length === 0) {
      loginUserApi({ ...formData, loginType })
        .then((result) => {
          if (result.status) {
            setToLocalStorage({
              loginToken: result.data[0].loginToken,
              login: true,
            });

            closeLoginRegister();
            dispatch(login());
          }
          alert(result.message);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  /**
   * function to toggle status of showPassword state
   */
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="w-full h-[100vh] flex">
      <div className="fixed w-full h-[100vh] top-0 left-0 bottom-0 right-0 bg-black/30"></div>

      <div className=" flex flex-col self center w-60 sm:w-80 rounded-lg fixed top-20 left-[20%] sm:left-[30%] md:left-[38%]  right-0  z-10 bg-white">
        <button
          className="self-end text-md font-semibold text-red-500 px-1"
          onClick={closeLoginRegister}
        >
          X
        </button>
        <div className=" mb-4 text-xl font-medium text-center">Login</div>

        <form onSubmit={handleSubmit} className="flex flex-col mx-8">
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
          <button
            className="mt-5 mb-2 bg-blue-900 text-white p-[6px] text-sm"
            type="Submit"
          >
            Login
          </button>
        </form>

        <button className="text-xs text-red-500 mb-10" onClick={openRegister}>
          Not registered@ create account
        </button>
      </div>
    </div>
  );
}

export default Login;
