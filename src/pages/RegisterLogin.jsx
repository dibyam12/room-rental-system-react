import Header from "../components/header/Header";
import LoginRegister from "../components/loginRegister/LoginRegister";
import Registerverify from "../components/registerverify/Registerverify.jsx";
import {useLocation} from "react-router-dom";
const RegisterLogin = () => {
    const location = useLocation();
  return (
    <>
      <div className="container1 flex flex-col h-screen">
        
        <div className="w-full flex justify-center items-center h-full">
            {location.pathname === "/login" ? (<LoginRegister />) : ( <Registerverify />)}
          
           
        </div>
      </div>
    </>
  );
};

export default RegisterLogin;
