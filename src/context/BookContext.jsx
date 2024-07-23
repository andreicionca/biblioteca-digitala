import { createContext, useContext } from "react";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  return (
    <div>
      <p>Context pentru cărți dezactivat temporar.</p>
      {children}
    </div>
  );
};

export const useBooks = () => {
  return useContext(BookContext);
};
