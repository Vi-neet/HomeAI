// import Header from "./components/Header"
import Chef from "./Pages/Chef";
import Home from "./Pages/Home";
import Trainer from "./Pages/Trainer";
import Economist from "./Pages/Economist";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <nav>
          <h1>HomeAI</h1>
          <Link to="/">Home</Link>
          <Link to="/chef">Chef</Link>
          <Link to="/trainer">Trainer</Link>
          <Link to="/economist">Economist</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chef" element={<Chef />} />
          <Route path="/trainer" element={<Trainer />} />
          <Route path="/economist" element={<Economist />} />
        </Routes>
      </BrowserRouter>
      {/* <Header/> */}
      {/* <Form/> */}
    </div>
  );
};

export default App;
