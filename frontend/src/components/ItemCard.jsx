/* eslint-disable react/prop-types */
import { marked } from "marked";

import ItemCardModal from "./ItemCardModal";


const ItemCard = ({ item }) => {
  const renderedMarkdown=marked(item.content.substring(0, 200))
  
  return (
    <div className="item-details">
      <h4>{item.title}</h4>
      <div className="item-content"
        dangerouslySetInnerHTML={{
          __html: renderedMarkdown,
        }}
        />
        <ItemCardModal
          item={item}

        />
      <p>{item.createdAt}</p>
    </div>
  );
};

export default ItemCard;
