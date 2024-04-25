import { ChangeEvent, ReactNode } from "react";

interface FormRowProps {
  labelText: ReactNode;
  inputId: string;
  inputType: string;
  inputValue: string | number | undefined;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputRequired?: boolean;
  rowClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  inputActiveStyle?: string;
  labelActiveStyle?: string;
}

function FormRow({
  labelText,
  inputId,
  inputType,
  inputValue,
  handleChange,
  rowClassName,
  inputRequired = false,
  labelClassName,
  inputClassName,
  inputActiveStyle,
  labelActiveStyle
}: FormRowProps) {
  const hasValue = inputValue ? true : false;

  const inputStyle = `
    input input-bordered w-full max-w-md input-primary rounded-lg ${inputClassName}`;
  const labelStyle = `
    absolute left-4 text-description/70 
    peer-focus:-translate-y-7 peer-focus:text-primary
    transition-all duration-300 ${labelClassName}`;
  const activeInputStyle = `${inputStyle} border-primary ${inputActiveStyle}`;
  const activeLabelStyle = `${labelStyle} -translate-y-10 text-primary ${labelActiveStyle}`;

  return (
    <div
      className={`relative flex flex-col justify-center w-1/3 ${rowClassName}`}
    >
      <input
        className={hasValue ? activeInputStyle : inputStyle}
        id={inputId}
        type={inputType}
        value={inputValue}
        required={inputRequired}
        onChange={handleChange}
      />
      <label
        className={hasValue ? activeLabelStyle : labelStyle}
        htmlFor={inputId}
      >
        {labelText}
      </label>
    </div>
  );
}

export default FormRow;
