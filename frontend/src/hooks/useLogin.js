import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const {dispatch} = useAuthContext();
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }
    if (response.ok) {
      // Save the user to local storage
      localStorage.setItem("user", JSON.stringify(data));
      // update the auth context
      dispatch({ type: "LOGIN", payload: data});
      setIsLoading(false)
    }
  };
  return { error, isLoading, login };
};
// import { useState } from "react";
// import { useAuthContext } from "./useAuthContext";

// export const useLogin = () => {
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(null);
//   const {dispatch} = useAuthContext();
//   const login = async (email, password) => {
//     setIsLoading(true);
//     setError(null);

//     const response = await fetch("http://localhost:4000/api/user/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });
//     const data = await response.json();

//     if (!response.ok) {
//       setIsLoading(false);
//       setError(data.error);
//     }
//     if (response.ok) {
//       // Save the user to local storage
//       localStorage.setItem("user", JSON.stringify(data));

//       // update the auth context
//       dispatch({ type: "LOGIN", payload: data});
//       setIsLoading(false)
//     }
//   };
//   return { error, isLoading, login };
// };
