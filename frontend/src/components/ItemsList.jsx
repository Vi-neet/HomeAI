/* eslint-disable react/prop-types */
const ItemsList = (props) => {
  const listItems = props.items.map((item) => (
    <li key={item}>{item}</li>
  ));

  return (
    <section>
      <h2>{props.title}</h2>
      <ul className="items-list" aria-live="polite">
        {listItems}
      </ul>
      {props.items.length > 3 && (
        <div className="get-solution-container">
          <div ref={props.ref}>
            <h3>{props.readyTitle}</h3>
            <p>{props.readyDescription}</p>
          </div>
          <button onClick={props.toggle}>{props.buttonText}</button>
        </div>
      )}
    </section>
  );
};

export default ItemsList;
