/* eslint-disable react/prop-types */
import { marked } from "marked";

import ItemCardModal from "./ItemCardModal";
import { useState } from "react";

const ItemCard = ({ item }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const renderedMarkdown = marked(item.content.substring(0, 200));
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/items/${item._id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log(`Item with _id: ${item._id} deleted successfully`);
        setIsDeleted(true);

        if (typeof item.onDelete === "function") {
          item.onDelete(item._id);
        }
      } else {
        console.error("Failed to delete the item");
      }
    } catch (error) {
      console.error("Error deleting the item:", error);
    }
  };

  if (isDeleted) {
    return null;
  }

  return (
    <div className="item-details">
      <h4>{item.title}</h4>
      <div
        className="item-content"
        dangerouslySetInnerHTML={{
          __html: renderedMarkdown,
        }}
      />
      <ItemCardModal item={item} />
      <p>{item.createdAt}</p>
      {/* npm i date-fns to fix how created date is displayed */}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ItemCard;
