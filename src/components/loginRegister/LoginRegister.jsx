// import React from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import "./loginRegister.css";
import {useState, useContext, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login, register} from "../../actions/userActions.jsx";
import {useNavigate} from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import AuthContext from "../../context/AuthContext";

const LoginRegister = () => {
  // const dispatch = useDispatch()
  // const navigate = useNavigate()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [action, setAction] = useState("");

  const registerLink = () => {
    setAction("active");
  };
  const loginLink = () => {
    setAction("");
  };

  // const [action, setAction] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState()
  const [phone_number, setPhone_number] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [userType, setUserType] = useState()
  const [message, setMessage] = useState()
  
  const userLogin = useSelector((state) => state.userLogin);
  const userRegister = useSelector((state) => state.userRegister)
  const {error:errorRegister, loading:loadingRegister ,userInfo:userInfoRegister} = userRegister
  const { loading, userInfo, error } = userLogin;

  useEffect(() => {
    if (userInfo) {

      navigate('/')
      

      // registerLink();

    }
  }, [userInfo]);

  // const { loginUser, registerUser } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // loginUser(loginUsername, loginPassword);

    dispatch(login(loginUsername,loginPassword))
    // navigate('/')
    

    dispatch(login(loginUsername, loginPassword));
    console.log("submitted");

  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setMessage("Passwords do not match")
    } else {
      dispatch(register(email,password,username,name,phone_number,userType))
      navigate('/')
    }
    
  };

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  return (
    // const const [state, setstate] = useState();
    <>
      {/* Login */}
      <div className={`background ${action}`}>
        <div className={`wrapper ${action}`}>
          <div className="form-box">
            <h1 className="font-black text-4xl text-center">LOGIN</h1>
            <form onSubmit={handleLoginSubmit}>
              <div className="input-box">
                <FaUser className="icon" />
                <input
                  required
                  type="text"
                  placeholder="Username"
                  className="form-input px-4 py-3 rounded-full"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                />
              </div>
              <div className="input-box">
                <RiLockPasswordFill className="icon" />
                <input
                  required
                  type="password"
                  placeholder="Password"
                  className="form-input px-4 py-3 rounded-full"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <div className="forgot ">
                {" "}
                <a href="#">Forgot password?</a>
              </div>
              <button
                className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
                type="submit"
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
        {/* REGISTER */}
        <div className={`wrapper-register ${action}`}>
          <div className="form-box">
            <h1 className="font-black text-4xl text-center">REGISTER</h1>
            <form onSubmit={handleRegisterSubmit}>
              <div className="input-box">
                <FaUser className="icon" />
                <input
                  required
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="form-input px-4 py-3 rounded-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-box">
                <MdEmail className="icon" />
                <input
                  required
                  type="text"
                  name="email"
                  placeholder="E-mail"
                  className="form-input px-4 py-3 rounded-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-box">
                <IoCall className="icon" />
                <input
                  required
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className="form-input px-4 py-3 rounded-full"
                  value={phone_number}
                  onChange={(e) => setPhone_number(e.target.value)}
                />
              </div>
              <div className="input-box">
                <FaUser className="icon" />
                <input
                  required
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="form-input px-4 py-3 rounded-full"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-box">
                <RiLockPasswordFill className="icon" />
                <input
                  required
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-input px-4 py-3 rounded-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input-box">
                <RiLockPasswordFill className="icon" />
                <input
                  required
                  type="password"
                  name="password2"
                  placeholder="Confirm Password"
                  className="form-input px-4 py-3 rounded-full"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="landlord-tenant">
                {" "}
                <label id="details"> Are you a landlord or tenant : </label>
                <select
                  id="details"
                  name="role"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  required
                >
                  <option value="Landlord">Landlord</option>
                  <option value="Tenant">Tenant</option>
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
                type="submit"
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
