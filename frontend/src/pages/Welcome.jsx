import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const alreadyLogin = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (alreadyLogin) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  }, []);

  return <div></div>;
};

export default Welcome;
