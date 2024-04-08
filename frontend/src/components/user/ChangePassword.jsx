import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { validatePassword } from "../../utils/helper";
import { changePasswordApi } from "../../utils/axios";

function ChangePassword() {
  let { token } = useParams();
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");

  function submitHandler(e) {
    e.preventDefault();

    if (!password) {
      setError("Enter password");
    } else if (!validatePassword(password)) {
      setError(
        "Password should contain atleast 8 characters with 1 number, 1 uppercase letter, 1 lowercase letter and 1 special character."
      );
    } else {
      if (password !== confirmPassword) {
        setError("Password not matched.");
      } else {
        changePasswordApi(token, password)
          .then((responce) => {
           alert(responce.message)
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }

  return (
    <div className="flex justify-center">
      <div className="w-fit bg-gray-200 mt-8 p-10 rounded shadow-sm">
        <h1 className="font-semibold text-base">Change your password</h1>
        <form className="flex flex-col mt-8 " onSubmit={submitHandler}>
          <label className="mb-2 text-base">New Password</label>
          <input
            className="border-[1px] border-black ring-1 ring-orange-200 p-1 outline-none w-[30ch] rounded mb-2"
            type="password"
            name="password"
            placeholder="new password"
            value={password}
            onChange={(e) => {
              setError("");
              setPassword(e.target.value);
            }}
            autoFocus
          ></input>

          <input
            className="border-[1px] border-black ring-1 ring-orange-200 p-1 outline-none w-[30ch] rounded "
            type="password"
            name="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => {
              setError("");
              setConfirmPassword(e.target.value);
            }}
            autoFocus
          ></input>

          <p className="text-xs text-red-500 flex-wrap w-[40ch] mt-1">
            {error}
          </p>

          <button
            className="bg-green-500 mt-4 rounded text-md font-medium p-1"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
