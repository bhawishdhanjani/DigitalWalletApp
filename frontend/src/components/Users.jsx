import React, { useEffect, useState } from "react";
import InputBox from "./InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
      .then((response) => {
        setUsers(response.data.user);
      });
  }, [filter]);
  return (
    <div className="flex flex-col">
      <div className="text-lg font-bold mt-6">Users</div>
      <input
        type="text"
        className="px-2 py-1 my-2 text-slate-500 border border-slate-500"
        placeholder="Search User.."
        name=""
        id=""
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />
      <div>
        {users.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </div>
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center h-ful">
        <Button
          onClick={(e) => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
          }}
          label={"Send Money"}
        />
      </div>
    </div>
  );
}

export default Users;
