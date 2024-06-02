import React, { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <div className="bg-slate-300 h-screen flex justify-center items-center">
        <div className="bg-white w-80 h-max rounded-lg p-2 px-4">
          <Heading text={"Sign In"} />
          <SubHeading text={"Enter you credentials to access your account"} />
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
              label={"Sign In"}
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signin",
                  {
                    username: email,
                    password,
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                localStorage.setItem("token", "Bearer " + response.data.token);
                navigate("/dashboard");
              }}
            />
          </div>

          <BottomWarning
            label={"Don't have an account? "}
            to={"/signup"}
            buttonText={"Sign Up"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
