export const Label = ({ name, required, type, placeholder, className, children, value, handleInput }) => {
  //         onChange={(e) => handleInput(e.target.value)}
//         disabled={disabled === undefined || disabled === null || disabled === "" ? false : true}

  return (
  <label className="flex flex-col font-semibold gap-1">
          {name}
          <input
        onChange={() => console.log("")}
        maxLength={type === "code" ? 1 : 5000}
          value={type === "submit" ? value : null}
            required={required}
            type={type}
            className={className === "" ? "rounded-md p-2 bg-gray-200 font-normal text-md text-gray-500 focus:outline-none" : className}
            placeholder={placeholder}
          />
      {children}
        </label>
  )
}
