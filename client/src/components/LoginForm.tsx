import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";
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

  if (!email.trim()) {
    toast.warning(
      "Email is required"
    );

    return;
  }

  if (!email.includes("@")) {
    toast.error(
      "Please enter a valid email address"
    );

    return;
  }

  if (!password.trim()) {
    toast.warning(
      "Password is required"
    );

    return;
  }

  if (password.length < 6) {
    toast.error(
      "Password must be at least 6 characters"
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
      // toast.success(
      //   "Login Successful"
      // );

      // setTimeout(() => {
        navigate("/students");
      // }, 1000);
    }
  } catch (error: any) {
    toast.error(
      error?.response?.data
        ?.message ||
        "Login Failed"
    );
  }
};
  return (

   <div className="page-container">
  <div
    className="card"
    style={{
      maxWidth: "450px"
    }}
  >
    <div className="form-header">
      <h1>🎓 Student Portal</h1>

      <p>
        Sign in to continue
      </p>
    </div>

    <form onSubmit={handleSubmit}>

      <div className="form-group">
        <label>Email</label>

        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          placeholder="Enter Email"
        />
      </div>

      <div
        className="form-group"
        style={{
          marginTop: "20px"
        }}
      >
        <label>Password</label>

        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          placeholder="Enter Password"
        />
      </div>

      <button
        type="submit"
        className="primary-btn"
      >
        Login
      </button>

    </form>

    <div
      style={{
        marginTop: "20px",
        textAlign: "center"
      }}
    >
      Not Registered?

      <Link
        to="/register"
        style={{
          marginLeft: "5px"
        }}
      >
        Register Here
      </Link>
    </div>

  </div>
</div>

  );
};

export default LoginForm;