import React, { useState } from "react";
import "./Auth.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CreateAccount(props) {
  const nav = useNavigate();

  let initial = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [userInfo, setUserInfo] = useState(initial);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("u_name", userInfo.username);
    formData.append("email", userInfo.email);
    formData.append("pass", userInfo.password);

    try {
      if (userInfo.password !== userInfo.confirmPassword) {
        props.toast("warning", "Password doesn't match");
      } else {
        let res = await axios.post(
          `${import.meta.env.VITE_API_HOST}/auth/Register.php`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (res.data.message == "Success") {
          props.toast("success", "Registration Successfully");

          setInterval(() => {
            nav("/registration");
          }, 4000);
        }
      }
    } catch (err) {
      props.toast(
        "error",
        "This user already exists , please change your username or email"
      );
    }
  };

  return (
    <section className="registration">
      <div className="create">
        <form onSubmit={handleSubmit}>
          <h2>Create An Account</h2>
          <div className="input-box">
            <input
              type="text"
              required
              onChange={(e) =>
                setUserInfo({ ...userInfo, username: e.target.value })
              }
              value={userInfo.username}
            />
            <span>Username</span>
          </div>
          <div className="input-box">
            <input
              type="email"
              required
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              value={userInfo.email}
            />
            <span>E-mail</span>
          </div>

          <div className="pass-box">
            <div className="input-box">
              <input
                type="password"
                required
                onChange={(e) =>
                  setUserInfo({ ...userInfo, password: e.target.value })
                }
                value={userInfo.password}
              />
              <span>Password</span>
            </div>

            <div className="input-box">
              <input
                type="password"
                required
                onChange={(e) =>
                  setUserInfo({ ...userInfo, confirmPassword: e.target.value })
                }
                value={userInfo.confirmPassword}
              />
              <span>Confirm Password</span>
            </div>
          </div>

          <div className="last">
            <input type="submit" value="Create Account" />

            <div className="more-option">
              <Link to="/registration">
                <span>Have An Account?</span>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreateAccount;
