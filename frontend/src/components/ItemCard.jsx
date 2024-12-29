/* eslint-disable react/prop-types */
import { marked } from "marked";

const ItemCard = ({ item }) => {
  const renderedMarkdown=marked(item.content.substring(0, 200))
  return (
    <div className="item-details">
      <h4>{item.title}</h4>
      <div className="item-content"
        dangerouslySetInnerHTML={{
          __html: renderedMarkdown,
        }}
        /><button>Read more</button>
      <p>{item.createdAt}</p>
    </div>
  );
};

export default ItemCard;
