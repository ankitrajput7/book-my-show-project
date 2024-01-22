/**
 * state less component which is not dependent on any state
 */

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
          onChange={handleInputData}
          autoComplete={autoComplete}
        />
      </label>

      <div className={`text-red-500 text-xs mb-2`}>{error[fieldName]}</div>
    </section>
  );
}

export default InputBox;
