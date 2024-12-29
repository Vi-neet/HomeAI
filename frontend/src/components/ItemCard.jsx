/* eslint-disable react/prop-types */
import { marked } from "marked";

const ItemCard = ({ item }) => {
  return (
    <div className="item-details">
      <h4>{item.title}</h4>
      <div dangerouslySetInnerHTML={{ __html: marked(item.content) }} />
      <p>{item.createdAt}</p>
    </div>
  );
};

export default ItemCard;


 