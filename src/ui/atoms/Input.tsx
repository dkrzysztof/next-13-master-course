import { HTMLInputTypeAttribute } from "react";

type InputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  initialValue?: string;
  hidden?: boolean;
  type?: HTMLInputTypeAttribute;
};

export const Input = ({
  label,
  name,
  placeholder,
  initialValue,
  type = "text",
  hidden,
}: InputProps) => {
  return (
    <div className="mb-4">
      {hidden || (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <input
        hidden={hidden}
        type={hidden ? "hidden" : type}
        id={name}
        name={name}
        className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all"
        placeholder={placeholder || ""}
        required
        defaultValue={initialValue}
      />
    </div>
  );
};
