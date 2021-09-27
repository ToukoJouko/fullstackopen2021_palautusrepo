import React from "react";

const Name = ({ name }) => {
  return (
    <li>
      {name.name} {name.number}
    </li>
  );
};

export default Name;
