import "./Input.css";
import React, { useEffect, useState } from "react";

export type InputProps = {
  type: string;
  value: string;
  valueChanged: (value: string) => void;
  placeholder?: string;
};

export const Input: React.FC<InputProps> = ({
  value = "",
  type,
  valueChanged,
  placeholder = "",
}: InputProps) => {
  const [inputText, setInputText] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputText(newValue);
    if (valueChanged) valueChanged(newValue);
  };

  useEffect(() => {
    setInputText(value);
  }, [value]);

  const inputType = type === "integer" ? "number" : type;
  const regexPattern = type === "integer" ? /^(?:^\d+$)$/ : /.*/;

  return (
    <div className="input">
      <input
        type={inputType}
        value={inputText}
        onChange={handleChange}
        pattern={String(regexPattern)}
        placeholder={placeholder}
      />
      {inputType === "text" && (
        <div
          className="inputClearButton"
          onClick={() => {
            setInputText("");
          }}
        >
          X
        </div>
      )}
    </div>
  );
};
