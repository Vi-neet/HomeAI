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
    setIsSelected(!isSelected);
    if (!isSelected) {
      // Save only if selecting
      handleSave({ title: defaultTitle, content: item });
    }
    setIsModalOpen(true);
  };
  const handleSave = async (data) => {
    if(!user) {
      console.log("User not logged in");
      return;
    }
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      console.log("Item saved");
      const savedItems = JSON.parse(localStorage.getItem("savedResponses")) || [];
      const updatedItems = [data,...savedItems];
      localStorage.setItem("savedResponses", JSON.stringify(updatedItems));
  
      console.log("Item saved in local storage");
    
    }
  };

  const handleClose = () => {
    setIsSelected(false);
    setIsModalOpen(false);
  };

  return (
    <section className="suggested-solution-container" aria-live="polite">
      <div className="solution-header">
        <h2>{solutionTitle}</h2>
        <button
          className="heart-button"
          aria-label="Like"
          onClick={toggleSelection}
          style={{ color: isSelected ? "#c92a2a" : "#000" }}
        >
          <FontAwesomeIcon icon={isSelected ? faHeartSolid : faHeartRegular} />
        </button>
      </div>
      <div className="prose lg:prose-l" dangerouslySetInnerHTML={{ __html: marked(item) }} />
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