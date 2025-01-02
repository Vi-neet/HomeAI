import Header from "./components/Header";
import Chef from "./Pages/Chef";
import Home from "./Pages/Home";
import Trainer from "./Pages/Trainer";
import Economist from "./Pages/Economist";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
// import { useLogout } from "./hooks/useLogout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chef" element={<Chef />} />
          <Route path="/trainer" element={<Trainer />} />
          <Route path="/economist" element={<Economist />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
