import { ChangeEvent, FC } from "react";

interface FormInputProps {
  id: number;
  name: string;
  value: string;
  label: string;
  pattern: string;
  errorMessage: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: FC<FormInputProps> = ({
  id,
  name,
  label,
  value,
  pattern,
  onChange,
  errorMessage,
  ...inputProps
}) => {
  const showError =
    value !== "" && (pattern ? !new RegExp(pattern).test(value) : true);

  return (
    <div className="flex flex-col mb-3 w-full">
      <label className="mb-1">{label}</label>
      <input
        {...inputProps}
        name={name}
        value={value}
        onChange={onChange}
        className={`${
          showError ? "border-red-500" : ""
        } p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500`}
      />
      {showError && (
        <span className="text-xs text-red-500">{errorMessage}</span>
      )}
    </div>
  );
};

export default FormInput;
