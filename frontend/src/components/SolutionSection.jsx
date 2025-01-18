/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { marked } from "marked";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import Modal from "./Modal";
import { useAuthContext } from "../hooks/useAuthContext";

const SolutionSection = ({ item, solutionTitle }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultTitle, setDefaultTitle] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    const renderedMarkdown = marked(item);
    const parser = new DOMParser();
    const doc = parser.parseFromString(renderedMarkdown, 'text/html');
    const h1Element = doc.querySelector('h1');
    const title = h1Element ? h1Element.textContent : '';
    setDefaultTitle(title);
  }, [item]);

  const toggleSelection = () => {
    // Only open the modal, don't save here
    setIsModalOpen(true);
  };

  const handleSave = async (data) => {
    if (!user) {
      console.log("User not logged in");
      return;
    }

    // Prevent duplicate saves
    if (isSelected) {
      console.log("Item already saved");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Item saved successfully");
        setIsSelected(true); // Update selection state after successful save
        setIsModalOpen(false); // Close modal after successful save
      } else {
        console.error("Failed to save item");
        // Optionally handle error state here
      }
    } catch (error) {
      console.error("Error saving item:", error);
      // Optionally handle error state here
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="suggested-solution-container" aria-live="polite">
      <div className="solution-header">
        <h2>{solutionTitle}</h2>
        <button
          className="heart-button"
          aria-label={isSelected ? "Unlike" : "Like"}
          onClick={toggleSelection}
          style={{ color: isSelected ? "#c92a2a" : "#000" }}
        >
          <FontAwesomeIcon icon={isSelected ? faHeartSolid : faHeartRegular} />
        </button>
      </div>
      <div 
        className="prose lg:prose-l" 
        dangerouslySetInnerHTML={{ __html: marked(item) }} 
      />
      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSave={handleSave}
        defaultTitle={defaultTitle}
        defaultContent={item}
      />
    </section>
  );
};

export default SolutionSection;