import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Appbar = ({}) => {
  const [firstName, setFirstName] = useState("U");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/getUser", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => setFirstName(res.data.firstName));
  }, []);

  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">
        Payment App
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">
          Hello {firstName}
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center mr-2">
          <button
            onClick={() => {
              localStorage.clear("token");
              navigate("/");
            }}
            className="border-red-400 text-red-400 border-2 rounded p-1"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
