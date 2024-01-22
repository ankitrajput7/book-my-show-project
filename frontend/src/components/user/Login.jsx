import { useState } from "react";
import { validateEmail, validatePassword } from "../../utils/helper";
import { useLoginContext } from "../../utils/context/LoginContext";
import { loginUserApi } from "../../utils/axios";
import { useDispatch } from "react-redux";
import { login, logout } from "../../utils/redux/loginSlice";
import { useLocalStorage } from "../../utils/hooks";

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

  const handleFormData = (e) => {
    setError(initialState);
    setformData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const newError = {};

    if (!email) newError.email = "Enter your email.";
    else if (!validateEmail(email)) newError.email = "Enter valid email.";

    if (!password) newError.password = "Enter your Password.";
    else if (!validatePassword(password))
      newError.password =
        "Password should not be less than 8 characters with atleast 1 Uppercase , 1 Lowercase, 1 number and 1 special character.";

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

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="w-full h-[100vh] flex">
      <div className="fixed w-full h-[100vh] top-0 left-0 bottom-0 right-0 bg-black/30"></div>

      <div className=" flex flex-col self center w-60 sm:w-80 rounded-lg fixed top-20 left-[20%] sm:left-[30%] md:left-[38%]  right-0  z-10 bg-white">
        <button
          className="self-end text-sm text-red-600 px-1 "
          onClick={closeLoginRegister}
        >
          Close
        </button>
        <div className=" mt-4 text-xl text-center">Login</div>

        <form onSubmit={handleSubmit} className="flex flex-col mx-8">
          <section>
            <label htmlFor="emailInput" className="flex flex-col">
              Email
              <input
                id="emailInput"
                className="border-[1px] border-black outline-none p-1"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleFormData}
              />
            </label>
            <div className="text-red-500 text-xs mb-2">{error.email}</div>
          </section>

          <section>
            <label htmlFor="passwordInput" className="flex flex-col">
              <div className="flex justify-between">
                <h2>Password</h2>
                <button
                  className="self-end text-xs text-green-500"
                  type="button"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? "show" : "hide"}
                </button>
              </div>

              <input
                id="passwordInput"
                className="border-[1px] border-black outline-none p-1"
                type={showPassword ? "password" : "text"}
                name="password"
                value={formData.password}
                onChange={handleFormData}
                autoComplete="new-password"
              />
            </label>
            <div className="text-red-500 text-xs">{error.password}</div>
          </section>

          <button
            className="mt-6 mb-2 bg-green-500 text-white p-1"
            type="Submit"
          >
            Login
          </button>
        </form>

        <button className="text-xs text-red-500 mb-20" onClick={openRegister}>
          Not registered@ create account
        </button>
      </div>
    </div>
  );
}

export default Login;
