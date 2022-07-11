import React from "react";
import "./CCButton.css";
type CCButtonProps = {
  enabled?: boolean;
  buttonPressed: (e: React.MouseEvent) => void;
  className?: string;
};
export const CCButton: React.FC<CCButtonProps> = ({
  enabled = true,
  buttonPressed,
  className = undefined,
  children,
}) => {
  let classNameText = "ccbutton" + (className ? ` ${className}` : "");
  if (!enabled) classNameText += " disabled";

  return (
    <div className={classNameText} onClick={buttonPressed}>
      {children}
    </div>
  );
};
