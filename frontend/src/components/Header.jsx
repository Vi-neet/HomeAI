import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 900);
      if (window.innerWidth >= 900) {
        setIsOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleClick = () => {
    logout();
  };

  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/chef", text: "Chef" },
    { to: "/trainer", text: "Trainer" },
    { to: "/economist", text: "Economist" },
  ];

  return (
    <header className="bg-white px-4 py-2">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div>
          <img
            src="/HomeAI-transparent.png"
            alt="HomeAI Logo"
            className="h-10 w-10 ml-4"
          />
          <h1 className="text-xl font-bold">HomeAI</h1>
        </div>

        {user && (
          <>
            {/* Desktop Navigation */}
            {!isMobile && (
              <nav className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-gray-600 hover:text-gray-900 font-medium"
                  >
                    {link.text}
                  </Link>
                ))}
              </nav>
            )}

            {/* Desktop Logout */}
            {!isMobile && (
              <div className="flex items-center gap-4">
                <span className="text-gray-600">{user.email}</span>
                <button
                  onClick={handleClick}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {user && isMobile && isOpen && (
        <div className="px-4 py-2 mt-2 space-y-4">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-600 hover:text-gray-900 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.text}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-4 pt-4 border-t">
            <span className="text-gray-600">{user.email}</span>
            <button
              onClick={handleClick}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
