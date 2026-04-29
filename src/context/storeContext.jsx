//storeContext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export const storeContext = createContext();

export const StoreProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [todos, setTodos] = useState([]);

  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  // 3. The "Auto-Logout" Logic
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    // console.log("Checking token on app load:", localToken);

    if (!localToken) {
      setIsAuth(false);
      return;
    }

    try {
      const decoded = jwtDecode(localToken);
      const currentTime = Date.now() / 1000; // Convert to seconds

      if (decoded.exp < currentTime) {
        // Token is ALREADY expired
        setIsAuth(false);
        localStorage.removeItem("token");
        // console.log("Token expired on app load. Logging out.");
      } else {
        // Token is Valid
        setIsAuth(true);
        // Handle Roles

        // If your token has a name, set it here: setFullName(decoded.name);

        return;
      }
    } catch (error) {
      console.log("Invalid Token:", error);
      // logOut(false);
    }
  }, []); // Runs once on mount

  async function getAlltodos() {
    //fetch all books from backend
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/todos/getalltodos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        // toast.error(data.message[0].msg);
        console.log(data);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      setTodos(data);
      console.log(data, token);
    } catch (error) {
      console.log(error);
    }
  }

  function createTodo(params) {}

  //exporting states/functions/data
  const contextObj = {
    isAuth,
    setIsAuth,
    isLoading,
    setIsLoading,
    apiUrl,
    password,
    setPassword,
    email,
    setEmail,
    token,
    todos,
    getAlltodos,
  };

  return (
    <storeContext.Provider value={contextObj}>{children}</storeContext.Provider>
  );
};

export const useStore = () => useContext(storeContext);
