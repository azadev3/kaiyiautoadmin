import React from "react";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const InputField: React.FC<InputFieldProps> = ({ label, ...inputProps }) => {
  return (
    <div className="input-field">
      {label && <label>{label}</label>}
      <input {...inputProps} />
    </div>
  );
};

export default InputField;
