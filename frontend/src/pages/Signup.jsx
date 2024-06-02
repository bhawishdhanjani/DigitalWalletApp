import React, { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  console.log("Hiii");
  return (
    <div>
      <div className="bg-slate-300 h-screen flex justify-center items-center">
        <div className="bg-white w-80 h-max rounded-lg p-2 px-4">
          <Heading text={"Sign Up"} />
          <SubHeading text={"Enter you information to craeate an account"} />
          <InputBox
            fieldName={"First Name"}
            placeholder={"John"}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <InputBox
            fieldName={"Last Name"}
            placeholder={"Doe"}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />

          <InputBox
            fieldName={"Email"}
            placeholder={"johndoe@example.com"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <InputBox
            fieldName={"Password"}
            placeholder={"********"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="pt-4">
            <Button
              label={"Sign Up"}
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    username: email,
                    firstName,
                    lastName,
                    password,
                  }
                );
                localStorage.setItem("token", "Bearer " + response.data.token);
                navigate("/dashboard");
              }}
            />
          </div>

          <BottomWarning
            label={"Already have an account? "}
            to={"/signin"}
            buttonText={"Login"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
