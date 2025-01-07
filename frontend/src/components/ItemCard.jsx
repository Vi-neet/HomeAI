/* eslint-disable react/prop-types */
import { marked } from "marked";
import { useAuthContext } from "../hooks/useAuthContext";
import ItemCardModal from "./ItemCardModal";
import { useState } from "react";
import { formatDistance } from "date-fns";

const ItemCard = ({ item }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // Add modal state here
  const renderedMarkdown = marked(item.content.substring(0, 200));
  const { user } = useAuthContext();
  const timeAgo = formatDistance(
    new Date(item.createdAt),
    new Date(),
    { addSuffix: true }
  );

  const handleDelete = async (e) => {
    e.stopPropagation(); // Prevent modal from opening when clicking delete
    if (!user) {
      console.log("You must be logged in to delete an item");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/items/${item._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.ok) {
        console.log(`Item with id: ${item._id} deleted successfully`);
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
    <>
      <div 
        className="item-details" 
        onClick={() => setModalOpen(true)}
        style={{ cursor: 'pointer' }} // Add cursor pointer to show it's clickable
      >
        <h4>{item.title}</h4>
        <div
          className="item-content"
          dangerouslySetInnerHTML={{
            __html: renderedMarkdown,
          }}
        />
        <p>{timeAgo}</p>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <ItemCardModal 
        item={item} 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
      />
    </>
  );
};

export default ItemCard;