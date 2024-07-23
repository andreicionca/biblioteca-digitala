import { createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  return (
    <div>
      <p>Autentificare dezactivată temporar.</p>
      {children}
    </div>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
