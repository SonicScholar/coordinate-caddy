import React from "react";
import "./CCButton.css";
type CCButtonProps = {
  buttonContent: string;
  enabled?: boolean;
  buttonPressed: (e: React.MouseEvent) => void;
  className?: string;
};
export const CCButton = ({
  buttonContent: buttonText,
  enabled = true,
  buttonPressed,
  className = undefined,
}: CCButtonProps) => {
  let classNameText = "ccbutton" + (className ? ` ${className}` : "");
  if (!enabled) classNameText += " disabled";

  return (
    <div className={classNameText} onClick={buttonPressed}>
      {buttonText}
    </div>
  );
};
