import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  if (!email.includes("@")) {
    alert("Invalid Email");

    return;
  }

  if (password.length < 6) {
    alert(
      "Password must be minimum 6 characters"
    );

    return;
  }

  try {
    const response =
      await API.post("/login", {
        email,
        password,
      });

    if (response.data.success) {
      alert("Login Successful");

      navigate("/students");
    }
  } catch (error: any) {
    alert(
      error.response.data.message
    );
  }
};

  return (
    <div
      style={{
        width: "400px",
        margin: "50px auto",
      }}
    >
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br />
        <br />

        <button type="submit">
          Login
        </button>
      </form>

      <br />

      <p>
        Not Registered?{" "}
        <Link to="/register">
          Register Here
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;