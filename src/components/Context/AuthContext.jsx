import { createContext } from "react";

// Create and export Auth Context
export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
  isAdmin: false,
  loading: true
});