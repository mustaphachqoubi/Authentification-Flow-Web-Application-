import React from "react"


export const Label = ({
  name,
  required,
  type,
  placeholder,
  className,
  children,
  value,
  handleInput,
  onchange,
  title
}) => {
  return (
    <label className="flex flex-col font-semibold gap-1">
      {title}
      <input
        name={name}
        onChange={onchange}
        maxLength={type === "code" ? 1 : 5000}
        required={required}
        type={type}
        className={
          className === ""
            ? "rounded-md p-2 bg-gray-200 font-normal text-md text-gray-500 focus:outline-none"
            : className
        }
        placeholder={placeholder}
      />
      {children}
    </label>
  );
};
