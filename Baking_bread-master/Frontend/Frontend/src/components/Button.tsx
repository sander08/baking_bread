import React from "react";
import "./Button.scss";

interface Props {
  text: any;
  onClick?: Function;
  style?: React.CSSProperties;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<Props> = props => {
  return (
    <div
      className={`Button ${props.className} ${
        props.disabled ? "disabled" : ""
      }`}
      style={{ ...props.style }}
      onClick={() => {
        if (!props.disabled && props.onClick) {
          props.onClick();
        }
      }}
    >
      <span>{props.text}</span>
    </div>
  );
};

export default Button;
