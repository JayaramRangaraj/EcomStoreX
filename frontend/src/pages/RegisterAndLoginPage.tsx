import RegisterForm from "@/components/RegisterForm";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";
import { useState } from "react";

const RegisterAndLoginPage = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState<boolean>(true);
  const toggleLoginForm = () =>
    setIsLoginFormVisible((prevState) => !prevState);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 flex justify-center items-center">
        {isLoginFormVisible && <LoginForm toggleLoginForm={toggleLoginForm} />}
        {!isLoginFormVisible && <RegisterForm toggleLoginForm={toggleLoginForm} />}
      </div>
    </div>
  );
};

export default RegisterAndLoginPage;
