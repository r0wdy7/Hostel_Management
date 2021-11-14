import React from "react";

const Input = (props) => {
  return (
    <div className={props.className}>
      <label htmlFor={props.inputAttributes.id}>{props.label}</label>
      <input
        value={props.value}
        {...props.inputAttributes}
        onChange={props.onChange}
        // onBlur={props.onBlur}
      />
    </div>
  );
};

export default Input;
