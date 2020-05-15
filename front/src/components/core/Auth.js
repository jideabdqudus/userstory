import React, { useState } from "react";
import { AuthProvider } from "./";

const Auth = ({ children }) => {
  const existingAuthData = JSON.parse(localStorage.getItem("auth"));
  const [authData, setAuthData] = useState(existingAuthData);

  const setAuth = data => {
    data
      ? localStorage.setItem("auth", JSON.stringify(data))
      : localStorage.clear();
    setAuthData(data);
  };

  const logout = () => {
    setAuth();
  };

  const authProviderValue = {
    ...authData,
    setAuthData: setAuth,
    logout
  };

  return <AuthProvider value={authProviderValue}>{children}</AuthProvider>;
};

export default Auth;
