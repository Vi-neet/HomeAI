// import Header from "./components/Header"
import Chef from "./Pages/Chef";
import Home from "./Pages/Home";
import Trainer from "./Pages/Trainer";
import Economist from "./Pages/Economist";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import { useLogout } from "./hooks/useLogout";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

const App = () => {
  const {logout} = useLogout()
  const handleClick = () => {
    logout()
  };
  return (
    <div>
      <BrowserRouter>
        <nav>
          <h1>HomeAI</h1>
          <Link to="/">Home</Link>
          <Link to="/chef">Chef</Link>
          <Link to="/trainer">Trainer</Link>
          <Link to="/economist">Economist</Link>
          <div>
            <button onClick={handleClick}>Logout</button>
          </div>
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">signup</Link>

          </div>
        </nav>
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
