// import "doodle.css/doodle.css";

const Instruction = () => {
  const style = {
    display: "flex",
    margin: "2rem",
    alignItems: "flex-start",
    flexDirection: "column",
    backgroundColor: "inherit",
    fontFamily: ["Short Stack", "cursive"],
  };
  const dialogueBoxStyle = {
    padding: "30px 28px",
    display: "flex",
    flexDirection: "row-reverse",
  };
  return (
    <span className="doodle" style={{ backgroundColor: "inherit" }}>
      <div className="doodle" style={style}>
        <p className="border">Enter atleast 4 Items</p>
        <p className="border">Like this</p>
        <p className="border">In order to generate</p>
        <p className="border">a response</p>
      </div>
      <div className="border" style={dialogueBoxStyle}>
        <button>Click me</button>
      </div>
    </span>
  );
};

export default Instruction;
