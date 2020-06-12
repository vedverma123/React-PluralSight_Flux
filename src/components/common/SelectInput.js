import React from "react";

function SelectInput(props) {
  let wrapperClass = "form-group";
  return (
    <div className={wrapperClass}>
      <label htmlFor={props.id}>{props.label}</label>
      <div className="field">
        <select
          id={props.id}
          name={props.name}
          value={props.value}
          className="form-control"
          onChange={props.onChange}
        >
          <option value="" />
          <option value="1">Test Author1 </option>
          <option value="2">Test Author2 </option>
        </select>
      </div>
      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </div>
  );
}

export default SelectInput;
