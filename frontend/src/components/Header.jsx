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
    <header className="sticky top-0 z-[1] mx-auto  flex w-full max-w-7xl flex-wrap items-center justify-between border-b border-gray-100 bg-background p-[2em] font-sans font-bold uppercase text-text-primary backdrop-blur-[100px] dark:border-gray-800 dark:bg-d-background dark:text-d-text-primary">
      <div>
        <img
          src="/HomeAI-transparent.png"
          alt="HomeAI Logo"
          className="logo h-16 w-16"
        />
      </div>
      <h1>HomeAI</h1>

      {user && (
        <div className="w-1/3">
          <div className="flex justify-between">
            <Link to="/">Home</Link>
            <Link to="/chef">Chef</Link>
            <Link to="/trainer">Trainer</Link>
            <Link to="/economist">Economist</Link>
          </div>
          <div>
            <span>{user.email}</span>
            <button onClick={handleClick}>Logout</button>
          </div>
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
