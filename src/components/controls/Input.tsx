import "../css/Input.css";
import React, { useEffect, useState } from "react";

export type InputProps = {
  type: string;
  value: string;
  valueChanged: (value: string) => void;
};

export const Input = ({ value = "", type, valueChanged }: InputProps) => {
  const [inputText, setInputText] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    valueChanged?.call(this, e.target.value);
    setInputText(e.target.value);
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
