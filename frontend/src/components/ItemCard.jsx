/* eslint-disable react/prop-types */
import { marked } from "marked";
import { useAuthContext } from "../hooks/useAuthContext";
import ItemCardModal from "./ItemCardModal";
import { useState } from "react";
import { formatDistance } from "date-fns";

const ItemCard = ({ item }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const renderedMarkdown = marked(item.content.substring(0, 200));
  const { user } = useAuthContext();
  const timeAgo = formatDistance(new Date(item.createdAt), new Date(), {
    addSuffix: true,
  });

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!user) {
      console.log("You must be logged in to delete an item");
      return;
    }
    try {
      // Delete from the database
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

        // Delete from local storage
        const savedItems =
          JSON.parse(localStorage.getItem("savedResponses")) || [];
        const updatedItems = savedItems.filter(
          (savedItem) => savedItem._id !== item._id
        );
        localStorage.setItem("savedResponses", JSON.stringify(updatedItems));
        console.log(`Item with id: ${item._id} deleted from local storage`);

        // Notify parent component (if applicable)
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
        className="item-details flex flex-col min-h-[200px] p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
        onClick={() => setModalOpen(true)}
        style={{ cursor: "pointer" }}
      >
        <h4 className="text-lg font-semibold text-slate-800">{item.title}</h4>
        <div
          className="item-content flex-grow mt-2 mb-4"
          dangerouslySetInnerHTML={{
            __html: renderedMarkdown,
          }}
        />
        <div className="flex justify-between items-center mt-auto pt-3 border-t">
          <button
            onClick={handleDelete}
            className="px-3 py-1 text-sm text-red-600 hover:text-red-700 border border-red-600 rounded hover:bg-red-50 transition-colors"
          >
            Delete
          </button>
          <p className="text-sm text-gray-600">{timeAgo}</p>
        </div>
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
