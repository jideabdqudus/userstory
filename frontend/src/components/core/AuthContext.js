import { createContext, useContext } from "react";

export const AuthContext = createContext({});

export const AuthProvider = AuthContext.Provider;
export const AuthConsumer = AuthContext.Consumer;

export function useAuth() {
  return useContext(AuthContext);
}