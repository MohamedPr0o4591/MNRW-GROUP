import React, { useEffect, useState } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import axios from "axios";

function LoginPage(props) {
  const initial = {
    email: "",
    password: "",
  };
  const [userInfo, setUserInfo] = useState(initial);
  const [rememberCheck, setRememberCheck] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const eye = document.getElementById("eyeball");
    const beam = document.getElementById("beam");
    const passwordInput = document.getElementById("password");

    if (!eye || !beam || !passwordInput) return;

    const handleMouseMove = (e) => {
      let rect = beam.getBoundingClientRect();
      let mouseX = rect.right + rect.width / 2;
      let mouseY = rect.top + rect.height / 2;
      let rad = Math.atan2(mouseX - e.pageX, mouseY - e.pageY);
      let degrees = rad * (20 / Math.PI) * -1 - 350;

      root.style.setProperty("--beamDegrees", `${degrees}deg`);
    };

    const handleEyeClick = (e) => {
      e.preventDefault();
      if (passwordInput.value != "") {
        passwordInput.type =
          passwordInput.type === "password" ? "text" : "password";
        if (passwordInput.type != "password") {
          document.body.classList.add("show-password");
        } else document.body.classList.remove("show-password");
      }
      passwordInput.focus();
    };

    root.addEventListener("mousemove", handleMouseMove);
    eye.addEventListener("click", handleEyeClick);

    return () => {
      root.removeEventListener("mousemove", handleMouseMove);
      eye.removeEventListener("click", handleEyeClick);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInfo.email || !userInfo.password) {
      console.error("Please enter both email/username and password.");
      return;
    }

    let emailKey = userInfo.email.includes("@") ? "u_email" : "u_name";

    const formData = new FormData();
    formData.append(emailKey, userInfo.email);
    formData.append("u_pass", userInfo.password);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_HOST}/auth/Login.php`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.message == "Login successfully") {
        props.toast("success", "Login Successfully");
        if (rememberCheck) localStorage.setItem("token", response.data.user.id);
        else sessionStorage.setItem("token", response.data.user.id);
        location.pathname = "/";
      } else props.toast("error", "Login Failed");
    } catch (error) {
      props.toast("error", "Login Failed");
    }
  };

  return (
    <section className="registration">
      <div className="login-component">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>

          <div className="input-box">
            <input
              type="text"
              required
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              value={userInfo.email}
            />
            <span>Email or username</span>
          </div>

          <div className="input-box input-wrapper">
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
              value={userInfo.password}
            />
            <button type="button" id="eyeball">
              <div className="eye"></div>
            </button>
            <div id="beam"></div>
            <span>Password</span>
          </div>
          <div className="remember-box">
            <input
              type="checkbox"
              id="remember"
              onChange={() => setRememberCheck(!rememberCheck)}
            />
            <label htmlFor="remember"></label>
          </div>

          <div className="last">
            <input type="submit" value="Login" />

            <div className="more-option">
              <Link to="forget">
                <span>Forget Password?!</span>
              </Link>

              <Link to="create">
                <span>Create An Account</span>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
