import React, { ChangeEventHandler } from "react";
import "./Input.scss";

interface Props {
  type: string;
  value: any;
  placeholder?: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  style?: React.CSSProperties;
  disabled?: boolean;
  className?: string;
}

const Input: React.FC<Props> = (props) => {
  return (
    <label className="Input">
      {props.name}
      <input
        className="Input__field"
        type={props.type}
        placeholder={props.placeholder ? props.placeholder : ""}
        style={{ ...props.style }}
        value={props.value ? props.value : ""}
        onChange={props.onChange}
        disabled={props.disabled ? true : false}
      />
    </label>
  );
};

export default Input;
