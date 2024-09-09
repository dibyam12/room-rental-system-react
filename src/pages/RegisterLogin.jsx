import Header from "../components/header/Header";
import LoginRegister from "../components/loginRegister/LoginRegister";
const RegisterLogin = () => {
  return (
    <>
      <div className="container1 flex flex-col h-screen">
        
        <div className="w-full flex justify-center items-center h-full">
          <LoginRegister />
        </div>
      </div>
    </>
  );
};

export default RegisterLogin;
