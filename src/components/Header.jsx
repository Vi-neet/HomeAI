import icon from "../assets/icon.png";
const Header = () => {
  return (
    <header className="header">
      <img src={icon} className="logo" />
      <h1 className="title">Chef Claude</h1>
    </header>
  );
};

export default Header;
