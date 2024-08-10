// import React from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import "./loginRegister.css";
import { useState } from "react";

const LoginRegister = () => {
  const [action, setAction] = useState("");

  const registerLink = () => {
    setAction("active");
  };
  const loginLink = () => {
    setAction("");
  };

  return (
    // const const [state, setstate] = useState();
    <>
      <div className={`background ${action}`}>
        <div className={`wrapper ${action}`}>
          <div className="form-box">
            <h1 className="font-black text-4xl text-center">LOGIN</h1>
            <form action="">
              <div className="input-box">
                <FaUser className="icon" />
                <input
                  required
                  type="text"
                  placeholder="Username"
                  className="form-input px-4 py-3 rounded-full"
                />
              </div>
              <div className="input-box">
                <RiLockPasswordFill className="icon" />
                <input
                  required
                  type="password"
                  placeholder="Password"
                  className="form-input px-4 py-3 rounded-full"
                />
              </div>
              <div className="forgot ">
                {" "}
                <a href="#">Forgot password?</a>
              </div>
              <button
                className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
                type="button"
              >
                Login
              </button>
              <div className="register-link">
                <p>
                  Don&apos;t have an account yet?{" "}
                  <a href="#" onClick={registerLink}>
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className={`wrapper-register ${action}`}>
          <div className="form-box">
            <h1 className="font-black text-4xl text-center">REGISTER</h1>
            <form action="">
              <div className="input-box">
                <FaUser className="icon" />
                <input
                  required
                  type="text"
                  placeholder="Full Name"
                  className="form-input px-4 py-3 rounded-full"
                />
              </div>
              <div className="input-box">
                <MdEmail className="icon" />
                <input
                  required
                  type="text"
                  placeholder="E-mail"
                  className="form-input px-4 py-3 rounded-full"
                />
              </div>
              <div className="input-box">
                <IoCall className="icon" />
                <input
                  required
                  type="text"
                  placeholder="Phone Number"
                  className="form-input px-4 py-3 rounded-full"
                />
              </div>
              <div className="input-box">
                <FaUser className="icon" />
                <input
                  required
                  type="text"
                  placeholder="Username"
                  className="form-input px-4 py-3 rounded-full"
                />
              </div>
              <div className="input-box">
                <RiLockPasswordFill className="icon" />
                <input
                  required
                  type="password"
                  placeholder="Password"
                  className="form-input px-4 py-3 rounded-full"
                />
              </div>
              <div className="input-box">
                <RiLockPasswordFill className="icon" />
                <input
                  required
                  type="password"
                  placeholder="Confirm Password"
                  className="form-input px-4 py-3 rounded-full"
                />
              </div>
              <div className="landlord-tenant">
                {" "}
                <label id="details"> Are you a landlord or tenant : </label>
                <select id="details" name="detail" required>
                  <option value="volvo">Landlord</option>
                  <option value="saab">Tenant</option>
                </select>
              </div>
              <div className="terms  ">
                {" "}
                <label>
                  {" "}
                  <input type="checkbox" id="1" required /> I agree to terms and
                  conditions
                </label>
              </div>
              <button
                className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
                type="button"
              >
                Register
              </button>
              <div className="register-link">
                <p>
                  Already have an account?{" "}
                  <a href="#" onClick={loginLink}>
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginRegister;
