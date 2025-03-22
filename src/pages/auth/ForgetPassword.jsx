import React, { useState } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import axios from "axios";
import emailjs from "@emailjs/browser";

export default function ForgetPassword(props) {
  const [emailUser, setEmailUser] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailUser !== "") {
      let email = emailUser.trim();
      let formData = new FormData();
      formData.append("u_email", email);

      let res = await axios.post(
        `${import.meta.env.VITE_API_HOST}/auth/checkEmailExists.php`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.message == "Email already exists") {
        let randPass = Math.random().toString(36).slice(2);
        let formPass = new FormData();

        formPass.append("u_email", email);
        formPass.append("u_pass", randPass);

        let res = await axios.patch(
          `${import.meta.env.VITE_API_HOST}/auth/updatePassword.php`,
          {
            u_email: email,
            u_pass: randPass,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        if (res.data.message == "Password updated successfully") {
          emailjs
            .send(
              import.meta.env.VITE_SERVICE_ID,
              import.meta.env.VITE_TEMPLATE_ID,
              {
                message: `Your new password is: ${randPass}`,
                email_user: email,
              },
              {
                publicKey: import.meta.env.VITE_PUBLIC_KEYMAN,
              }
            )
            .then(
              () => {
                console.log("SUCCESS!");
              },
              (error) => {
                console.log("FAILED...", error.text);
              }
            );

          props.toast(
            "success",
            "we sent the new password into your email ,please check your email"
          );
        }
      } else props.toast("error", "Email doesn't exist");
    } else props.toast("warning", "Please enter your email");
  };

  return (
    <section className="registration">
      <div className="forget">
        <form onSubmit={handleSubmit}>
          <h2>Forget Password</h2>

          <div className="input-box">
            <input
              type="email"
              required
              value={emailUser}
              onChange={(e) => setEmailUser(e.target.value)}
            />
            <span>Enter your e-mail</span>
          </div>

          <div className="last">
            <input type="submit" value="Reset Password" />

            <div className="more-option">
              <Link to={"/registration"}>
                <p>Back to login</p>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
