import Header from "./components/Header";
import Chef from "./Pages/Chef";
import Home from "./Pages/Home";
import Trainer from "./Pages/Trainer";
import Economist from "./Pages/Economist";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
// import { useLogout } from "./hooks/useLogout";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const { user } = useAuthContext();
  return (
    <div className="mx-auto max-w-[2560px]">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/chef"
            element={user ? <Chef /> : <Navigate to="/login" />}
          />
          <Route
            path="/trainer"
            element={user ? <Trainer /> : <Navigate to="/login" />}
          />
          <Route
            path="/economist"
            element={user ? <Economist /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
