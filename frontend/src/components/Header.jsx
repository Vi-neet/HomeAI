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
    <header className="header">
      {user && (
        <nav className="nav-links">
          <Link className="nav-links-el" to="/">
            Home
          </Link>

          <Link className="nav-links-el" to="/chef">
            Chef
          </Link>

          <Link className="nav-links-el" to="/trainer">
            Trainer
          </Link>

          <Link className="nav-links-el" to="/economist">
            Economist
          </Link>
        </nav>
      )}

      <div className="logo-container">
        <img
          src="/HomeAI-transparent.png"
          alt="HomeAI Logo"
          className="logo h-16 w-16"
        />
        <h1 className="title">HomeAI</h1>
      </div>

      {user && (
        <div className="logout-container">
          <span className="loggedIN-email">{user.email}</span>
          <button className="logout-btn" onClick={handleClick}>
            Logout
          </button>
        </div>
      )}

      {!user && (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">signup</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
