import React from "react";
import "./Auth.css";
import { Link } from "react-router-dom";

export default function ForgetPassword() {
  return (
    <section className="registration">
      <div className="forget">
        <form>
          <h2>Forget Password</h2>

          <div className="input-box">
            <input type="email" required />
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
