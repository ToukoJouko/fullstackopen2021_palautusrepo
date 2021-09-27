import React from "react";

const Filter = (props) => {
  return (
    <div>
      find countries{" "}
      <input value={props.input_value} onChange={props.searching} />
    </div>
  );
};

export default Filter;
