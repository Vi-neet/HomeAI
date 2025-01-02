import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom";

const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  
  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <nav>
        <h1>HomeAI</h1>
        
        {user && (
          <>
            <Link to="/">Home</Link>
            <Link to="/chef">Chef</Link>
            <Link to="/trainer">Trainer</Link>
            <Link to="/economist">Economist</Link>
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Logout</button>
            </div>
          </>
        )}

        {!user && (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">signup</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;