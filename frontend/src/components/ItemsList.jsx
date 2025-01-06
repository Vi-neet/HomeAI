/* eslint-disable react/prop-types */
const ItemsList = (props) => {
  const listItems = props.items.map((item) => <li key={item}>{item}</li>);

  return (
    <section>
      <h2 className="item-title">{props.title}</h2>
      <ul className="items-list" aria-live="polite">
        <li>{listItems}</li>
      </ul>
      {props.items.length > 3 && (
        <div className="get-solution-container">
          <div ref={props.ref}>
            <div className="title-container">
              <span className="emoji">{props.emoji}</span>
              <h3>{props.readyTitle}</h3>
            </div>
            <p>{props.readyDescription}</p>
          </div>
          <button onClick={props.toggle}>{props.buttonText}</button>
        </div>
      )}
    </section>
  );
};

export default ItemsList;
