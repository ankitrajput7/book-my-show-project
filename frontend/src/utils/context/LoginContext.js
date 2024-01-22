import React, { createContext, useContext, useState } from "react";
import Login from "../../components/user/Login";
import Register from "../../components/user/Register";

const LoginContext = createContext();
export const useLoginContext = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [loginType, setLoginType] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  const openLogin = (type) => {
    setLoginType(type);
    setShowLogin(true);
    setShowRegister(false);
  };

  const openRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const closeLoginRegister = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <LoginContext.Provider
      value={{
        openLogin,
        openRegister,
        closeLoginRegister,
      }}
    >
      {children}
      {showLogin && <Login loginType={loginType} />}
      {showRegister && <Register loginType={loginType} />}
    </LoginContext.Provider>
  );
};
