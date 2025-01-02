import React from "react";

function Heading(props) {
  return (
    <div className="mt-6 xsm:mx-2 font-bold font-poppins text-lg">
      {props.heading}
    </div>
  );
}

export default Heading;
