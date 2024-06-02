import React from "react";

const InputBox = ({ fieldName, onChange, placeholder }) => {
  return (
    <div className="">
      <div className="text-sm font-medium py-2">{fieldName}</div>
      <div>
        <input
          onChange={onChange}
          placeholder={placeholder}
          className=" text-slate-500 w-full px-2 py-1 border border-slate-300  rounded "
          type="text"
          name=""
          id=""
        />
      </div>
    </div>
  );
};

export default InputBox;
