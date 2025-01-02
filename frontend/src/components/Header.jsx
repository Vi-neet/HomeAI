// import icon from "../assets/icon.png";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom";
const Header = () => {
  const {logout} = useLogout()
  const handleClick = () => {
    logout()
  };
  return (
    // <header className="header">
    <header>
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
    </header>
  );
};

export default Header;
