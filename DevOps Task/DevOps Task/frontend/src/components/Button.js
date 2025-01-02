import React from "react";

function Button(props) {
  return (
    <div className="mt-4 flex justify-center">
      <button
        onClick={props.onClick}
        className="py-2 px-4 mb-4 rounded-lg text-white mx-auto 
        bg-[#1E1E1F]
        transition duration-300 ease-in-out cursor-pointer"
      >
        {props.text}
      </button>
    </div>
  );
}

export default Button;
