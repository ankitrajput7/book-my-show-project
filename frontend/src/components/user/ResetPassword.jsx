import { useState } from "react";
import { validateEmail } from "../../utils/helper";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Enter your email.");
    } else if (!validateEmail(email)) {
      setError("Enter valid email.");
    }

    if (!error) {
      console.log(email);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-fit bg-gray-200 mt-8 p-10 rounded shadow-sm">
        <h1 className="font-semibold text-base">Reset your password</h1>
        <form className="flex flex-col mt-8 " onSubmit={submitHandler}>
          <label className="mb-2 text-base">Email</label>
          <input
            className="border-[1px] border-black ring-1 ring-orange-200 p-1 outline-none w-[30ch] rounded "
            type="text"
            name="email"
            value={email}
            onChange={(e) => {
              setError("");
              setEmail(e.target.value);
            }}
            autoFocus
          ></input>

          <p className="text-xs text-red-500"> {error}</p>

          <button
            className="bg-green-500 mt-4 rounded text-md font-medium p-1"
            type="submit"
          >
            Send password reset email
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
