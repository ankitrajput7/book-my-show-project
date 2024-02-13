/**
 * state less component which is not dependent on any state
 */

import { Link } from "react-router-dom";

function InputBox({
  error,
  handleInputData,
  value,
  fieldName,
  name,
  type = "text",
  autoComplete = "on",
  toggleShowPassword,
  showPassword,
}) {
  return (
    <section className="mb-2">
      <label htmlFor={`${fieldName}Input`} className="flex flex-col text-sm">
        {fieldName === "password" ? (
          <div className="flex justify-between">
            <h2>{name}</h2>
            <button
              className="self-end text-xs font-medium text-blue-900 "
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
          className="border-[1px] border-black outline-none p-1 rounded ring-1 ring-gray-400 mt-1"
          type={type}
          name={fieldName}
          value={value}
          onChange={handleInputData}
          autoComplete={autoComplete}
        />
      </label>
      {fieldName === "password" && (
        <Link to={"/password_reset"}>
          <p className="text-xs font-semibold text-[#548fba]">
            forget password
          </p>
        </Link>
      )}

      <div className={`text-red-500 text-xs mb-`}>{error[fieldName]}</div>
    </section>
  );
}

export default InputBox;
