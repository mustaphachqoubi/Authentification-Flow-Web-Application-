export const Label = ({ name, required, type, placeholder, className, children }) => {
  return (
  <label className="flex flex-col font-semibold gap-1">
          {name}
          <input
            required={required}
            type={type}
            className={className === "" ? "rounded-md p-2 bg-gray-200 font-normal text-md text-gray-500 focus:outline-none" : className}
            placeholder={placeholder}
          />
      {children}
        </label>
  )
}
